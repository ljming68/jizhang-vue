import request from '@/utils/request'

/**
* 获取时间列表
*/
export function getDateList(data) {
  return request({
    url:'/datelist',
    method:'post',
    data,
  })
 }

 /**
* 获取分类列表
*/
export function getCategoryList(data) {
  return request({
    url:'/categorylist',
    method:'post',
    data,
  })
 }

  /**
* 获取折线图列表
*/
export function getLineList(data) {
  return request({
    url:'/linelist',
    method:'post',
    data,
  })
 }

 

/**
* 获取详情排行列表
*/
export function getDetailList(data) {
  return request({
    url:'/detaillist',
    method:'post',
    data,
  })
 }

/**
* 获取账单列表
*/
export function getBillList(data) {
  return request({
    url:'/billlist',
    method:'post',
    data,
  })
 }