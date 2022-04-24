import request from '@/utils/request'

/**
 * 获取权限列表
 */
export function getPermissionList() {
  return request({
    url:'/permissionlist',
    method:'get',
  })
}

/**
* 添加权限
*/
export function addPermission(data) {
  return request({
    url:'/permission',
    method:'post',
    data
  })
 }

 /**
* 更新权限
*/
export function updatePermission(data){
  return request({
    url: `/permission/${data.pid}`,
    method: 'put',
    data,

  })
}

/**
* 根据pid 查找权限
*/
export function getPermissionById(id){
  return request({
    url: `/permission/${id}`,
    method: 'get'
  })
}

/**
* 删除权限
*/
export function delPermission(id){
  return request({
    url: `/permission/${id}`,
    method: 'delete',

  })
}

/**
 * 
 * 给角色分配权限
 */
export function assignPerm(data) {
  return request({
    url: '/roleperm',
    method: 'put',
    data
  })
}