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
  
}
