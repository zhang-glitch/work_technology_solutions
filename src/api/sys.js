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
