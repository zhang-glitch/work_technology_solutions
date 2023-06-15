import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
const store = createStore({
  state: {},
  getters,
  modules: {
    category
  }
})

export default store
