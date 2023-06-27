<template>
  <transition name="down" @afterLeave="closeAfter">
    <div
      v-show="isVisible"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <hm-svg-icon
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
        class="h-1.5 w-1.5 mr-1.5"
      ></hm-svg-icon>
      <span class="text-sm" :class="styles[type].textClass">
        {{ content }}
      </span>
    </div>
  </transition>
</template>

<script>
const types = ['success', 'warn', 'error']
</script>

<script setup>
import { onMounted, ref } from 'vue'
import HmSvgIcon from '@/libs/svg-icon/index.vue'

// 样式表数据
const styles = {
  // 警告
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200  hover:shadow-lg hover:shadow-warn-100'
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200  hover:shadow-lg hover:shadow-error-100'
  },
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200  hover:shadow-lg hover:shadow-success-100'
  }
}
const props = defineProps({
  // message 类型
  type: {
    type: String,
    required: true,
    validate(val) {
      if (types.includes(val)) {
        return true
      } else {
        throw new Error('请传入正确的类型值(error, warn, success)')
      }
    }
  },
  // message 内容
  content: {
    type: String,
    required: true
  },
  // 消息回调，在动画完成后，卸载message
  closeAfter: {
    type: Function
  },
  // 延时多久删除
  delay: {
    type: Number,
    default: 3000
  }
})

const isVisible = ref(false)

/**
 * 为了保证出现时动画展示，我们需要在组件挂载后在显示对应的内容
 */
onMounted(() => {
  isVisible.value = true

  setTimeout(() => {
    isVisible.value = false
  }, props.delay)
})
</script>

<style scoped lang="scss">
.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
