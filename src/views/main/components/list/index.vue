<template>
  <div>
    <hm-infinite-list
      v-model:isLoading="isLoading"
      :isFinished="isFinished"
      @load="getListData"
    >
      <hm-waterfall
        class="w-full px-1"
        :data="listData"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <item-vue :data="item" :columnWidth="width"></item-vue>
        </template>
      </hm-waterfall>
    </hm-infinite-list>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import getList from '@/api/list.js'
import { isMobileTerminal } from '@/utils/flexible'
import ItemVue from './item.vue'
import { useStore } from 'vuex'
import { createMessage } from '@/libs'

let query = {
  // 如果将请求数据数量该小，将不能撑满首屏,将不能再次获取数据
  size: 20,
  page: 1
}
const listData = ref([])

// loading
const isLoading = ref(false)
// isFinished
const isFinished = ref(false)

const getListData = async () => {
  // 数据加载完成，直接阻止请求
  if (isFinished.value) return

  // 第一次请求不需要增加page
  if (listData.value.length) {
    query.page += 1
  }
  const res = await getList(query)

  listData.value = [...listData.value, ...res.list]
  // 修改加载状态
  isLoading.value = false
  // 请求数据为0时，改变加载完成状态
  // if (!res.list.length) {
  //   isFinished.value = true
  // }
  if (listData.value.length === res.total) {
    isFinished.value = true
  }
}

// 因为我们有了长列表，就不需要手动触发请求。
// getListData()

// 监听currentCategory变化，触发请求
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  // 初始化数据
  isFinished.value = false
  // 当数据为空，那么将自动触发请求
  listData.value = []
}

const store = useStore()

watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    })
    createMessage({
      type: 'success',
      content: '切换'
    })
  }
)

/**
 * 监听searchValue变化，请求列表数据
 */
watch(
  () => store.getters.searchValue,
  (val) => {
    resetQuery({
      page: 1,
      searchText: val
    })
  }
)
</script>

<style scoped></style>
