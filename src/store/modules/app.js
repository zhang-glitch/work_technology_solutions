/**
 * 用于存放联动数据。 不需要缓存
 */

import { ALL_CATEGORY } from '@/constants'

export default {
  namespaced: true,
  state: () => {
    return {
      // 初始值为全部
      currentCategory: ALL_CATEGORY,
      // 搜索文本
      searchValue: '',
      // 路由跳转类型
      routerType: 'none'
    }
  },
  mutations: {
    setCurrentCategory(state, category) {
      state.currentCategory = category
    },
    setSearchValue(state, value) {
      state.searchValue = value
    },
    setRouterType(state, value) {
      state.routerType = value
    }
  },
  actions: {}
}
