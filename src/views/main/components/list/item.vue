<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <!-- 图片部分 -->
    <div
      class="relative w-full rounded cursor-zoom-in group"
      :style="{ background: randomRGB() }"
    >
      <!-- 如果已有高度，我们可以通过计算出来的宽度和已有宽度计算出缩放比，然后在等比调整图片高度-->
      <img
        v-lazy
        ref="imgRef"
        class="w-full rounded bg-transparent"
        :src="data.photo"
        :style="{
          height: (columnWidth / data.photoWidth) * data.photoHeight + 'px'
        }"
      />
      <!-- 遮罩层  移动端不显示遮罩-->
      <div
        class="hidden xl:block opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100"
      >
        <!-- 分享 -->
        <hm-button class="absolute top-1.5 left-1.5">分享</hm-button>
        <!-- 点赞 -->
        <hm-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        />
        <!-- 下载 -->
        <hm-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="download"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="handleDownLoad"
        />
        <!-- 全屏 -->
        <hm-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="handleFullScreen"
        />
      </div>
    </div>
    <!-- 标题 -->
    <p
      class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 line-clamp-2 px-1"
      alt
    >
      {{ data.title }}
    </p>
    <!-- 作者 -->
    <div class="flex items-center mt-1 px-1">
      <img v-lazy class="h-2 w-2 rounded-full" :src="data.avatar" alt="" />
      <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
    </div>
  </div>
</template>

<script setup>
import { saveAs } from 'file-saver'
import randomRGB from '@/utils/color'
import { createMessage } from '@/libs'
import { useFullscreen } from '@vueuse/core'
import { ref } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  columnWidth: {
    type: [Number, String]
  }
})

/**
 * 下载图片
 * */
const handleDownLoad = () => {
  createMessage({
    type: 'success',
    content: '下载成功'
  })

  // 延迟下载，有更好的提示效果
  setTimeout(() => {
    saveAs(props.data.photoDownLink)
  }, 100)
}

/**
 * 开启全屏
 */
const imgRef = ref(null)
const { enter } = useFullscreen(imgRef)

const handleFullScreen = () => {
  imgRef.value.style.backgroundColor = 'transparent'
  enter()
}
</script>

<style scoped></style>
