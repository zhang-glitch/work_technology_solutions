/**
 * 用于存放联动数据。 不需要缓存
 */

import { ALL_CATEGORY } from '@/constants'

export default {
  namespaced: true,
  state: () => {
    return {
      // 初始值为全部
      currentCategory: ALL_CATEGORY
    }
  },
  mutations: {
    setCurrentCategory(state, category) {
      state.currentCategory = category
    }
  },
  actions: {}
}
