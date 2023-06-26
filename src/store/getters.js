/**
 * 便捷访问每个模块下的数据
 */
export default {
  categorys: (state) => state.category.categorys,
  themeType: (state) => state.theme.themeType,
  // 当前分类
  currentCategory: (state) => state.app.currentCategory,
  // 当前分类下标
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex((item) => {
      return item.id === getters.currentCategory.id
    })
  },
  // 历史数据
  historyWords: (state) => state.search.historyWords,
  // 搜索文本
  searchValue: (state) => state.app.searchValue
}
