<template>
  <div
    class="fixed top-[20%] left-[50%] translate-x-[-50%] w-[340px] h-[270px] text-sm bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-900 shadow-3xl"
  >
    <div class="flex items-center h-5 text-left px-1 mb-1">
      <span class="flex-grow dark:text-zinc-200">请完成安全验证</span>
      <hm-svg-icon
        name="refresh"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="handleReset"
      ></hm-svg-icon>
      <hm-svg-icon
        name="close"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="ml-2 w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="handleClose"
      ></hm-svg-icon>
    </div>
    <div id="captcha"></div>
  </div>
</template>

<script setup>
import '@/vendor/SliderCaptcha/slidercaptcha.min.css'
import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js'
import { onMounted } from 'vue'
import { getCaptcha } from '@/api/sys'

const emits = defineEmits(['verifySuccess'])

let captcha = null

onMounted(() => {
  captcha = sliderCaptcha({
    id: 'captcha',
    // 验证成功的回调 arr滑块移动轨迹
    async onSuccess(arr) {
      const res = await getCaptcha({
        behavior: arr
      })
      // 发出事件
      if (res) emits('verifySuccess')
    },
    // 验证失败回调
    onFail() {
      console.error('人类行为验证失败')
    },
    // 默认的验证方法，咱们不在此处进行验证，而是选择在用户拼图成功之后进行验证，所以此处永远返回为 true
    verify() {
      return true
    }
  })
})

/**
 * 重置
 */
const handleReset = () => {
  captcha.reset()
}

/**
 * 关闭
 */
const handleClose = () => {
  emits('handleClose')
}
</script>

<style scoped></style>
