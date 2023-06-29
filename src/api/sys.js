import request from '@/utils/request'

/**
 * 人类行为验证接口
 */
export function getCaptcha(data) {
  return request({
    url: '/sys/captcha',
    method: 'POST',
    data
  })
}

/**
 * 登录接口
 */

export function postLogin(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 */
export const getProfile = (data) => {
  return request({
    url: '/user/profile',
    data
  })
}

/**
 * 注册
 */
export const postRegister = (data) => {
  return request({
    url: '/sys/register',
    method: 'POST',
    data
  })
}

/**
 * 修改用户信息
 */
export const putProfile = (data) => {
  return request({
    url: '/user/profile',
    method: 'PUT',
    data
  })
}

/**
 * 获取 OSS 上传凭证
 *
 * 获取oss一些秘钥参数
 */
export const getSts = () => {
  return request({
    url: '/user/sts'
  })
}
