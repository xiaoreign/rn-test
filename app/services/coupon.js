import request from '@/utils/request'

// 登录
export function buyList(params) {
  return request({
    url: '/point/purchase/list',
    method: 'post',
    data: params
  })
}

// 登出
export function expenseList(params) {
  return request({
    url: '/point/consume/list',
    method: 'post',
    data: params
  })
}