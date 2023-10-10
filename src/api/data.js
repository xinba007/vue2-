import request from '@/utils/Request'

export function initData(url, params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}
