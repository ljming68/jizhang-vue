import request from '@/utils/request'

/**
 * 获取权限列表
 */
export function getRoleList() {
  return request({
    url:'/rolelist',
    method:'get',
  })
}

/**
* 添加权限
*/
export function addRole(data) {
  return request({
    url:'/role',
    method:'post',
    data
  })
 }

 /**
* 更新权限
*/
export function updateRole(data){
  return request({
    url: `/role/${data.roleid}`,
    method: 'put',
    data,

  })
}

/**
* 根据pid 查找权限
*/
export function getRoleById(id){
  return request({
    url: `/role/${id}`,
    method: 'get'
  })
}

/**
* 删除角色
*/
export function delRole(id){
  return request({
    url: `/role/${id}`,
    method: 'delete',

  })
}

/**
 * 查询角色权限
 */
export function getRolePerm(id){
  return request({
    url: `/roleperm/${id}`,
    method: 'get'
  })
}