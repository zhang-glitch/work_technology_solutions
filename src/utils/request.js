import axios from 'axios'
import { getSecret } from './index'
import store from '../store'
import { createMessage } from '@/libs'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

service.interceptors.response.use(
  (response) => {
    const { success, data, message } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      createMessage({
        type: 'error',
        content: message
      })
      // TODO：业务错误
      return Promise.reject(new Error(message))
    }
  },
  // 状态码不是200
  (error) => {
    // 处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // TODO: token超时
      store.commit('user/postLogout')
    }
    createMessage({
      type: 'error',
      content: error.response.data.message
    })
    // TODO: 提示错误消息
    return Promise.reject(error)
  }
)

service.interceptors.request.use((config) => {
  config.headers = {
    ...getSecret()
  }
  // user
  if (config.url.includes('user') && store.getters.token) {
    // 如果token存在 注入token
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  // TODO 错误处理
  return config
})

export default service
