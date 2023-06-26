<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      { 'active:scale-105': isActiveAnim }
    ]"
    @click.stop="onBtnClick"
  >
    <!-- 展示 loading -->
    <hm-svg-icon
      v-if="loading"
      name="loading"
      class="w-2 h-2 animate-spin mr-1"
    ></hm-svg-icon>
    <!-- icon 按钮 -->
    <hm-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></hm-svg-icon>
    <!-- 文字按钮 -->
    <slot v-else />
  </button>
</template>

<script>
// type 可选项：表示按钮风格
const typeEnum = {
  primary:
    'text-white  bg-zinc-800 dark:bg-zinc-900  hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
  main: 'text-white  bg-main dark:bg-zinc-900  hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700',
  info: 'text-zinc-800 dark:text-zinc-300  bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700 '
}
// size 可选项：表示按钮大小。区分文字按钮和icon按钮
const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}

const EMITS_CLICK = 'click'
</script>
<script setup>
import { computed } from 'vue'
import HmSvgIcon from '../svg-icon/index.vue'

const props = defineProps({
  // icon 图标名字
  icon: {
    type: String
  },
  // icon 图标颜色
  iconColor: {
    type: String
  },
  // icon 图标类名（匹配 tailwind）
  iconClass: {
    type: String
  },
  // 按钮风格
  type: {
    type: String,
    default: 'main',
    // 验证风格是否被定义
    validator(val) {
      // 获取所有的可选的按钮风格
      const keys = Object.keys(typeEnum)
      // 开发者指定风格是否在可选风格中
      const result = keys.includes(val)
      // 如果不在则给开发者提示
      if (!result) {
        throw new Error(`你的 type 必须是 ${keys.join('、')} 中的一个`)
      }
      // 返回校验结果
      return result
    }
  },
  // 大小风格
  size: {
    type: String,
    default: 'default',
    validator(val) {
      // 获取所有的可选的大小（注意剔除 icon 开头的元素，因为我们期望开发者输入 size="default"，但不期望开发者输入 size="icon-default"）
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon'))
      // 开发者指定大小是否在可选大小中
      const result = keys.includes(val)
      // 如果不在则给开发者提示
      if (!result) {
        throw new Error(`你的 size 必须是 ${keys.join('、')} 中的一个`)
      }
      // 返回校验结果
      return result
    }
  },
  // 按钮在点击时是否需要动画
  isActiveAnim: {
    type: Boolean,
    default: true
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits([EMITS_CLICK])

// 处理大小的 key 值
const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})

/**
 * 按钮点击事件处理
 */
const onBtnClick = () => {
  if (props.loading) {
    return
  }
  emits(EMITS_CLICK)
}
</script>

<style lang="scss" scoped></style>
