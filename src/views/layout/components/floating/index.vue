<template>
  <div class="fixed bottom-10 right-2">
    <!-- 引导页 -->
    <div
      class="guide-start w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
      @click="handleGuideClick"
    >
      <hm-svg-icon
        name="guide"
        class="w-2 h-2"
        fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
      ></hm-svg-icon>
    </div>
    <!-- 反馈 -->
    <hm-popover class="flex items-center guide-feedback" placement="top-left">
      <template #reference>
        <div
          class="w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
        >
          <hm-svg-icon
            name="feedback"
            class="w-2 h-2"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
          ></hm-svg-icon>
        </div>
      </template>

      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          @click="handleToFeedback"
        >
          <hm-svg-icon
            name="feedback"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></hm-svg-icon>
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">立即吐槽</span>
        </div>
      </div>
    </hm-popover>
  </div>
</template>

<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps'
import { onMounted } from 'vue'
/**
 * 引导页处理
 */
let driver = null
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: '关闭',
    nextBtnText: '下一个',
    prevBtnText: '上一个'
  })
})

/**
 * 开始引导
 */
const handleGuideClick = () => {
  driver.defineSteps(steps)
  driver.start()
}

const handleToFeedback = () => {
  window.open('https://support.qq.com/product/597775', '__blank')
}
</script>

<style scoped>
.driver-fix-stacking {
  position: fixed;
  z-index: 100004 !important;
}
</style>
