/**
 * 便捷访问每个模块下的数据
 */
import { isMobileTerminal } from '@/utils/flexible'

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
  searchValue: (state) => state.app.searchValue,
  token(state) {
    return state.user.token
  },
  // 用户信息
  userInfo(state) {
    return state.user.userInfo
  },
  // 路由跳转类型
  routerType(state) {
    // 移动端
    if (isMobileTerminal.value) {
      return state.app.routerType
    }
    // pc端直接返回none
    return 'none'
  }
}
