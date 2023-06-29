<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isDialogVisible"
        @click="handleClose"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
        v-if="isDialogVisible"
        class="max-w-[80%] max-h-[80%] overflow-auto fixed top-[10%] left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:min-w-[35%]"
      >
        <!-- 标题 -->
        <div
          class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2"
          v-if="title"
        >
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          <slot />
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end" v-if="handleCancel || handleConfirm">
          <hm-button type="info" class="mr-2" @click="handleCancelClick">{{
            cancelText
          }}</hm-button>
          <hm-button type="primary" @click="handleConfirmClick">{{
            confirmText
          }}</hm-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String
  },
  // 取消按钮文本
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确定按钮文本
  confirmText: {
    type: String,
    default: '确定'
  },
  // 关闭后触发的事件
  close: {
    type: Function
  },
  // 点击取消出发的事件
  handleCancel: {
    type: Function
  },
  // 点击确认触发事件
  handleConfirm: {
    type: Function
  }
})

const emits = defineEmits(['update:isVisible'])

const isDialogVisible = useVModel(props, 'isVisible', emits)

/**
 * 点击蒙版关闭
 */
const handleClose = () => {
  isDialogVisible.value = false
  // 触发关闭事件
  props.close && props.close()
}

/**
 * 点击取消按钮
 */
const handleCancelClick = () => {
  props?.handleCancel()
  handleClose()
}
/**
 * 点击确认按钮
 */
const handleConfirmClick = () => {
  props?.handleConfirm()
  handleClose()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all 0.5s;
}

.up-leave-to,
.up-enter-from {
  transform: translate(-50%, 100px);
  opacity: 0;
}
</style>
