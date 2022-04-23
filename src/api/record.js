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



/**
 * 根据recordid 查找对应记录
 */
export function getRecordById(id){
  return request({
    url: `/record/${id}`,
    method: 'get'
  })
}

/**
* 更新记录
*/
export function updateRecord(data){
  return request({
    url: `/record/${data.recordid}`,
    method: 'put',
    data,

  })
}

/**
* 删除记录
*/
export function delRecord(id){
  return request({
    url: `/record/${id}`,
    method: 'delete',

  })
}