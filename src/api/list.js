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
