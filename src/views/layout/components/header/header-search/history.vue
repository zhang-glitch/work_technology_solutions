<template>
  <div class="">
    <div class="flex items-center text-xs mb-1 text-zinc-400">
      <span>最近搜索</span>
      <hm-svg-icon
        name="delete"
        class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
        fillClass="fill-zinc-400"
        @click="handleRemoveAll"
      ></hm-svg-icon>
    </div>

    <div class="flex flex-wrap">
      <div
        v-for="(item, index) in $store.getters.historyWords"
        :key="item"
        class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5 text-zinc-900 text-sm font-bold rounded-sm duration-300 hover:bg-zinc-200"
        @click="handleItemClick(item)"
      >
        <span>{{ item }}</span>
        <hm-svg-icon
          name="input-delete"
          class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100"
          @click.stop="handleDelete(index)"
        ></hm-svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { createConfirm } from '@/libs'

const emits = defineEmits(['itemClick'])
const store = useStore()
// 点击移除全部
const handleRemoveAll = () => {
  // 触发确认，来决定是否删除
  createConfirm({
    title: '',
    content: '你确定要删除全部历史记录吗？'
  }).then(() => {
    // 点击了确定
    store.commit('search/removeHistoryWords')
  })
}
// 点击发出事件，进行搜索
const handleItemClick = (item) => {
  emits('itemClick', item)
}
// 删除单个记录
const handleDelete = (index) => {
  store.commit('search/deleteHistoryWords', index)
}
</script>

<style scoped></style>
