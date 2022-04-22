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

/**
 * 获取收支明细列表
 */
export function getRecordList(params) {
  return request({
    url:'/recordlist',
    method:'get',
    params
  })
}