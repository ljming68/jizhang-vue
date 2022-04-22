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

/**
 * 获取账户类型列表
 */
export function getAccountTypeList() {
  return request({
    url:'/accounttypelist',
    method:'get',
  })
}

/**
* 添加账户
*/
export function addAccount(data) {
  return request({
    url:'/account',
    method:'post',
    data
  })
 }

/**
* 根据payid 查找对应账户
*/
export function getAccountById(id){
  return request({
    url: `/account/${id}`,
    method: 'get'
  })
}

/**
* 更新账户
*/
export function updateAccount(data){
  return request({
    url: `/account/${data.payid}`,
    method: 'put',
    data,

  })
}

/**
* 删除账户
*/
export function delAccount(id){
  return request({
    url: `/account/${id}`,
    method: 'delete',

  })
}

/**
* 转账
*/
export function transAccount(data) {
  return request({
    url:'/transaccount',
    method:'post',
    data
  })
 }