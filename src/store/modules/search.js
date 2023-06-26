/**
 * 搜索相关数据
 */

export default {
  namespaced: true,
  state: () => {
    return {
      // 历史搜索记录
      historyWords: []
    }
  },
  mutations: {
    /**
     * 添加： 相同的删除后面的，将该值加入最前面
     */
    addHistoryWords(state, word) {
      const index = state.historyWords.findIndex((item) => item === word)
      if (index !== -1) {
        state.historyWords.splice(index, 1)
      }
      state.historyWords.unshift(word)
    },

    /**
     * 删除单个
     */
    deleteHistoryWords(state, index) {
      state.historyWords.splice(index, 1)
    },

    /**
     * 删除全部
     */
    removeHistoryWords(state) {
      state.historyWords = []
    }
  },
  actions: {}
}
