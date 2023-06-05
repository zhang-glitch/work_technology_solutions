import axios from "axios"
import {getSecret} from "./index"

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
})

service.interceptors.response.use((response) => {
  const {success, data, message} = response.data
  if(success) {
    return data
  }
  // TODO 错误处理
  return Promise.reject(new Error(message))
})

service.interceptors.request.use((config) => {
  config.headers = {
    ...getSecret()
  }
  // TODO 错误处理
  return config
})

export default service