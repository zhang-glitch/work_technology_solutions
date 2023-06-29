<template>
  <teleport to="body">
    <div class="hm-popup" v-bind="$attrs">
      <!-- 遮罩层 -->
      <transition name="fade">
        <!-- 显示隐藏不能绑定到最外层，不然动画失效 -->
        <div
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          @click="isOpen = false"
          v-if="isOpen"
        ></div>
      </transition>
      <!-- 下方content  -->
      <transition name="popup-down-up">
        <div
          v-bind="$attrs"
          class="w-screen bg-white z-50 fixed bottom-0"
          v-if="isOpen"
        >
          <slot></slot>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script setup>
import { useVModel, useScrollLock } from '@vueuse/core'
import { watch } from 'vue'
const props = defineProps({
  isOpenPopup: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:isOpenPopup'])
// 如果props不是默认值modelValue，需要指定
// 当isOpen发生变化，自动触发emit去修改isOpenPopup
const isOpen = useVModel(props, 'isOpenPopup', emit)
// 锁定页面禁止滚动
const isLocked = useScrollLock(document.body)

watch(
  isOpen,
  (val) => {
    if (val) {
      isLocked.value = true
    } else {
      isLocked.value = false
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
/* 动画过渡状态 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
/* 准备进入和离开 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 内容动画过渡状态 */
.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}
/* 内容准备进入和离开 */
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translate(0, 100%);
}
/* .hm-popup {
  width: 100%;
  height: 100%;
  .hm-popup-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 9;
    background: rgba($color: #000000, $alpha: 0.3);
  }
} */
</style>
