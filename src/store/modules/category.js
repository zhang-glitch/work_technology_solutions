/**
 * 处理navigationBar中的数据 categorys
 */

import { getCategoryList } from '@/api/category'
import { CATEGORY_NOMAR_DATA } from '@/constants'
export default {
  namespaced: true,
  state: () => {
    return {
      categorys: CATEGORY_NOMAR_DATA
    }
  },
  mutations: {
    // 获取categorys数据
    setCategorys(state, categorys) {
      state.categorys = [{ id: 'all', name: '全部' }, ...categorys]
    }
  },
  actions: {
    // 获取categorys数据
    async getCategoryList({ commit }, payload) {
      const res = await getCategoryList()
      commit('setCategorys', res.categorys)
    }
  }
}
