import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'
import search from './modules/search'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  state: {},
  getters,
  modules: {
    category,
    theme,
    app,
    search,
    user
  },
  // 缓存数据
  plugins: [
    createPersistedState({
      // 指定保存到localStorage中的key值
      key: 'categoryList',
      // 需要保存的模块
      paths: ['category', 'theme', 'search', 'user']
    })
  ]
})

export default store
