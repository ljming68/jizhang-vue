import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
const service = axios.create({
  baseURL:process.env.VUE_APP_BASE_API,
  timeout:5000,
})
// 
service.interceptors.request.use(config=>{
  if(store.getters.token){
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须要返回的
},error=>{
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response =>{
  //  axios默认加了一层data
  // console.log(response)
  const {success,message,data} = response.data
  if(success){
    return data
  }else{
    // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message))
  }
},error =>{
  Message.error(message)
  // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
  return Promise.reject(error)
})

export default service