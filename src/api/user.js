import request from '@/utils/request'
import qs from "qs" 
/**
 * 登录
 */
export function login(data) {
  return request({
    url:'/login',
    method:'post',
    data
  })
}
/**
 * 
 * 用户注册
 */
export function register(data) {
  return request({
    url:'/register',
    method:'post',
    data
  })
}
/**
 * 
 * 获取邮箱验证码
 */
export function getEcode(data) {
  return request({
    url:'/ecode',
    method:'post',
    data
  })
}

export function logout() {
  return request({
    url:'/logout',
    method:'get'
  })
}


// 管理员使用
/**
 * 获取用户列表
 */
export function getUserList(params) {
  return request({
    url:'/userlist',
    method:'get',
    params,
  })
}


/**
* 添加用户
*/
export function addUser(data) {
  return request({
    url:'/user',
    method:'post',
    data
  })
 }

/**
* 获取用户信息  userid
*/
export function getUserById(id){
  return request({
    url: `/user/${id}`,
    method: 'get'
  })
}


 /**
* 更新用户角色
*/
export function updateUserRole(data){
  return request({
    url: `/user/${data.userid}`,
    method: 'put',
    data,

  })
}

/**
* 删除用户
*/
export function delUser(id){
  return request({
    url: `/user/${id}`,
    method: 'delete',

  })
}

/**
* 上传用户头像
*/
export function imgUpload(file){
  return request({
    url: `/imgupload`,
    method: 'post',
    data:file,
  })
}


/**
* 获取简单用户信息  vuex
*/
export function getSimpleInfo(){
  return request({
    url: `/usersimple`,
    method: 'get'
  })
}



/**
* 获取用户信息  个人中心
*/
export function getUserInfo(){
  return request({
    url: `/userinfo`,
    method: 'get'
  })
}

/**
* 更新用户信息  个人中心
*/
export function updateUserInfo(data){
  return request({
    url: `/userinfo`,
    method: 'put',
    data
  })
}



/**
* 更新密码
*/
export function updatePassword(data){
  return request({
    url: `/userpwd`,
    method: 'put',
    data
  })
}

