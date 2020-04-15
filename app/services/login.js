import request from '@/utils/request'

// 登录
export function login(params) {
  return request({
    url: '/api/Account/Login',
    method: 'post',
    data: params
  })
}

// 登出
export function logout(params) {
  return request({
    url: '/u/logout',
    method: 'GET',
    params: params
  })
}

// 请求窗口
export function getAllWindows(params) {
  return request({
    url: 'api/Window/GetAllWindowModels',
    method: 'GET',
    params: params
  })
}