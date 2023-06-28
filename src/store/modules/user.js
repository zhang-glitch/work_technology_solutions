/**
 * 用户相关数据
 */
import { postLogin, getProfile } from '@/api/sys'
import md5 from 'md5'
import { createMessage } from '../../libs'

export default {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {}
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserInfo(state, userinfo) {
      state.userInfo = userinfo
    },
    // 退出登录
    postLogout(state) {
      // 清空一些数据
      state.token = ''
      state.userInfo = {}
      // 刷新页面
      location.reload()
    }
  },
  actions: {
    async changToken({ commit, dispatch }, payload) {
      // 加密密码
      const password = md5(payload.password)
      const { token } = await postLogin({
        ...payload,
        password: password ? password : ''
      })
      commit('setToken', token)

      // 获取用户信息
      dispatch('changeUserInfo')
    },
    async changeUserInfo({ commit }) {
      const res = await getProfile()
      commit('setUserInfo', res)
      createMessage({
        type: 'success',
        content: `欢迎${
          res.vipLevel ? `vip用户${res.username}` : `用户${res.username}`
        }登录`
      })
    }
  }
}
