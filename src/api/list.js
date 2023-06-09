import request from '@/utils/request'

/**
 * 请求列表数据
 */

export default function getList(data) {
  return request({
    method: 'get',
    url: '/pexels/list',
    params: data
  })
}

/**
 * 获取搜索关键词列表数据
 */

export const getHint = (q) => {
  return request({
    url: '/pexels/hint',
    params: {
      q
    }
  })
}

/**
 * 获取推荐主题
 */
export const getHotThemes = () => {
  return request({
    url: '/pexels/themes'
  })
}
