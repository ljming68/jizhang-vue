import request from '@/utils/request'

/**
 * 获取账户列表
 */
export function getAccountList(params) {
  return request({
    url:'/accountlist',
    method:'get',
    params
  })
}

