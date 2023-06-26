<template>
  <div>
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="handleItemClick(item)"
      v-html="highlightText(item)"
    ></div>
  </div>
</template>

<script setup>
import { getHint } from '@/api/list'
import { ref, watch } from 'vue'

const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})

const hintData = ref([])

const getHintList = async () => {
  if (!props.searchText) return
  const { result } = await getHint(props.searchText)
  hintData.value = result
}

/**
 * 监听文本输入改变，触发关键字列表数据请求
 * 我们也可以使用usevue的watchDebounce来做防抖
 */
watch(
  () => props.searchText,
  // () => {
  //   getHintList()
  // }
  debounce(getHintList, 500)
)
// 需要做防抖
function debounce(fn, delay) {
  let timer = null
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(this)
    }, delay)
  }
}

/**
 * 点击列表item时，发出事件
 */
const emits = defineEmits(['itemClick'])
const handleItemClick = (item) => {
  emits('itemClick', item)
}

/**
 * 高亮列表关键字
 */
const highlightText = (item) => {
  // 构建正则表达式，从《显示文本中》找出与《用户输入文本相同的内容》，使用《高亮标签》进行替换
  const reg = new RegExp(props.searchText, 'gi')
  return item.replace(
    reg,
    `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  )
}
</script>

<style scoped></style>
