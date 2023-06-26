<template>
  <div id="confirm">
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisible"
        @click="handleClose"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
        v-if="isVisible"
        class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{ content }}
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end">
          <hm-button type="info" class="mr-2" @click="handleCancel">{{
            cancelText
          }}</hm-button>
          <hm-button type="primary" @click="handleConfirm">{{
            confirmText
          }}</hm-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// 通过方法调用的组件，需要主动导入组件（内部子组件都需要导入）
import HmButton from '../button/index.vue'

const props = defineProps({
  title: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  // 按钮文字
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  // 控制显隐
  // isVisible: {
  //   type: Boolean,
  //   required: true
  // }
  // 取消和确认时触发事件, 例如移除dom
  closeAfter: {
    type: Function
  },
  /**
   * 主要是区分点击了取消还是确定
   */
  // 点击确定触发事件
  handleConfirmClick: {
    type: Function
  },
  // 点击取消触发事件
  handleCancelClick: {
    type: Function
  }
})

// 动画时间 状态驱动的动态css
const actionDuration = '0.5s'

// 控制confirm显隐
const isVisible = ref(false)

// 组件挂载就让弹框显示，通过函数组件控制组件挂载卸载
// 通过mounted， 让其挂载时有动画效果
onMounted(() => {
  isVisible.value = true
})

/**
 * 关闭弹窗
 * 通过定时器，让动画完成后在移除dom
 */
const handleClose = () => {
  // 当隐藏时才会出现动画
  isVisible.value = false
  setTimeout(() => {
    // 卸载confirm组件
    props.closeAfter()
  }, actionDuration.replace('0.', '').replace('s', '') * 100)
}

/**
 * 点击取消
 */
const handleCancel = () => {
  handleClose()
  props.handleCancelClick()
}

/**
 * 点击确定
 */
const handleConfirm = () => {
  handleClose()
  props.handleConfirmClick()
}
</script>

<style scoped lang="scss">
/* 出现后的过程 */
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(actionDuration);
}

/* 出现和离开时 */
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all v-bind(actionDuration);
}

.up-leave-to,
.up-enter-from {
  opacity: 0;
  /* 水平居中 */
  /* 即使元素中指定了translateX = -50%，但是在动画开始和结束，也需要指定他的位置 */
  /* transform: translateY(100px); */
  transform: translate(-50%, 100px);
}
</style>
