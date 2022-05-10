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



/**
 * 获取收支明细列表
 */
export function searchRecordList(data,params) {
  return request({
    url:'/recordlist',
    method:'post',
    data,
    params
  })
}

/** *
 *  封装一个导入账单的接口
 *
 * ***/

export function importRecord(data) {
  return request({
    url: '/records',
    method: 'post',
    data,
  })
}


/** *
 *  封装一个导出账单的接口
 *
 * ***/

export function getExportData(data) {
  return request({
    url: '/exportrecords',
    method: 'post',
    data,
  })
}

/**
 * 根据账户和时间 查询记录列表
 */
export function getDetailList(data,params) {
  return request({
    url:'/recorddetail',
    method:'post',
    data,
    params
  })
}