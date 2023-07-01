<template>
  <div>
    <slot>
      <p class="text-sm">
        {{ showTime }}
      </p>
    </slot>
  </div>
</template>

<script setup>
import { computed, watch, ref, onUnmounted, onMounted } from 'vue'
import dayjs from './utils'

const emits = defineEmits(['finish', 'change'])

const props = defineProps({
  // 毫秒
  time: {
    type: Number,
    required: true
  },
  // 遵循 dayjs format 标准：https://day.js.org/docs/zh-CN/parse/string-format
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})

/**
 * 时间开始
 */
let timer = null
const start = () => {
  timer = setInterval(() => {
    durationFn()
  }, 1000)
}

onMounted(() => {
  start()
})

/**
 * 倒计时行为
 */
const duration = ref(props.time)
const durationFn = () => {
  duration.value -= 1000
  emits('change')
  // 监听结束行为
  if (duration.value <= 0) {
    duration.value = 0
    emits('finish')
    close()
  }
}

/**
 * 清理倒计时
 */
const close = () => {
  if (timer) {
    clearInterval(timer)
  }
}

// 组件卸载移除定时器
onUnmounted(() => {
  close()
})

const showTime = computed(() => dayjs(duration.value).format(props.format))
</script>

<style scoped></style>
