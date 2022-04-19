import request from '@/utils/request'

/**
* 添加记录
*/
export function addRecord(data) {
 return request({
   url:'/record',
   method:'post',
   data
 })
}