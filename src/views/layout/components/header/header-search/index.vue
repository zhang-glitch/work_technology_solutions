<template>
  <div class="w-full guide-search">
    <hm-search
      v-model:searchValue="searchValue"
      @handleSearchClick="handleSearchClick"
    >
      <template #dropdown>
        <!-- 展示搜索关键词列表 -->
        <hint-vue
          v-show="searchValue"
          :searchText="searchValue"
          @itemClick="handleSearchClick"
        ></hint-vue>
        <!-- 展示搜索历史 -->
        <history-vue
          v-show="!searchValue"
          @itemClick="handleSearchClick"
        ></history-vue>
        <!-- 热门精选 -->
        <hot-vue v-show="!searchValue"></hot-vue>
      </template>
    </hm-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import HintVue from './hint.vue'
import HistoryVue from './history.vue'
import HotVue from './hot.vue'

const searchValue = ref('')
const store = useStore()
const isHistory = ref(false)

// 点击搜索
const handleSearchClick = (keyword) => {
  isHistory.value = true
  searchValue.value = keyword
  // 保存在localStorage中
  store.commit('search/addHistoryWords', keyword)
  // 保存searchValue到vuex中，让list可以请求数据
  store.commit('app/setSearchValue', keyword)
}
</script>

<style scoped></style>
