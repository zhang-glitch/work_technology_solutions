import { createMessage } from './libs'
import router from './router'
import store from './store'
export default function permission() {
  router.beforeEach((to, from) => {
    // 需要登录，才能访问
    if (to.meta.user) {
      if (store.getters.token) {
        return true
      } else {
        // 未登录，警告然后返回首页
        createMessage({
          type: 'error',
          content: '未登录，请登录后访问！'
        })
        return '/'
      }
    } else {
      // 不需要登录即可访问
      return
    }
  })
}
