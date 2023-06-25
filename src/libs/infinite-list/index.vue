<template>
  <div>
    <!-- 内容 -->
    <slot />
    <!-- 当露出这个部分时，就发送请求 -->
    <div class="h-6 py-4" ref="loadingRef">
      <!-- 加载 -->
      <hm-svg-icon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      ></hm-svg-icon>
      <!-- 全部加载完成 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        亲，已经没有更多数据啦！
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'infinite-list'
}
</script>
<script setup>
import { useVModel, useIntersectionObserver } from '@vueuse/core'
import { onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  isFinished: {
    type: Boolean,
    default: false
  }
})

// 定义loading绑定事件，加载更多事件
const emits = defineEmits(['update:isLoading', 'load'])

const loading = useVModel(props, 'isLoading', emits)
// 加载更多
const loadingRef = ref(null)
// 第一次加载，可见区域就是true，数据加载完成可见区域变成false
// 如果可见区域不是交替可见，那么回调不会执行

// 记录当前是否在底部（是否交叉）
const targetIsIntersecting = ref(false)
useIntersectionObserver(loadingRef, ([{ isIntersecting }]) => {
  // console.log(isIntersecting, props.isFinished, loading.value)
  targetIsIntersecting.value = isIntersecting
  emitLoad()
})

const emitLoad = () => {
  // 出现底部区域，数据未加载完成，loading为false时，请求数据
  if (targetIsIntersecting.value && !props.isFinished && !loading.value) {
    loading.value = true
    emits('load')
  }
}

/**
 * 处理首次数据加载为盛满全屏时，可见区域判断回调只执行一次的bug
 *
 * 监听loading变化，重新触发执行
 */
let timer = null
watch(loading, () => {
  // false => true（延迟请求数据，等上一次请求完毕后，在执行）=> false
  // 触发 load，延迟处理，等待 渲染（虽然数据请求回来，但是ui为渲染，所以targetIsIntersecting依旧为true）和 useIntersectionObserver 的再次触发
  // 当一次加载数据可以盛满容器，那么当loading发生变化时，不让其加载数据。因为targetIsIntersecting为false。这个延时的时间要大于targetIsIntersecting改变后的时间

  // 但是对于一次加载数据不可以盛满容器的情况。targetIsIntersecting始终未true，就可以在首屏加载两次了。等下一次watch执行，刚好延迟让targetIsIntersecting改变为false后，在触发emitLoad。这时刚好阻止请求了
  timer = setTimeout(() => {
    emitLoad()
  }, 500)
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<style scoped></style>
