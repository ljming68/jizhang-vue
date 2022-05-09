import {getToken,setToken,removeToken,removeSession} from '@/utils/auth'
import {login,getSimpleInfo,logout} from '@/api/user'
import {resetRouter} from '@/router'
const state = { 
  token:getToken(),
  userInfo:{},
}

const mutations = {
  setToken(state,token){
    // vuex和 缓存数据的同步
    state.token = token
    setToken(token)
  },
  removeToken(state){
    // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
    state.token = null
    removeToken()
  },
   // 设置用户信息
  setUserInfo(state,result){
    state.userInfo = result // 是响应式
    // state.userInfo = {...result} // 是响应式 属于浅拷贝
    // state.userInfo['username'] = result  这种不是响应式的
  },
  // 删除用户信息
  reomveUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  // 登录
  async login({commit},data){
    // const result = await login(data)
    // axios默认给数据加了一层data,在request 中处理了

    // const result = await login(data)
    const {token} = await login(data)
    console.log('loginStore',token)
    if(token){
      commit('setToken',token)
    }

    
  },
  // 获取用户信息
  async getSimpleInfo({commit}){
    const result = await getSimpleInfo()
    // console.log('usersimpleinfo',result.rows)
    commit('setUserInfo',result.rows[0])

    return result
  },
  // 退出登录
  logout({commit}){
    // await logout()
    commit('removeToken')
    commit('reomveUserInfo')
    // // 重置路由
    resetRouter()
    commit('permission/setRoutes',[], { root: true })
    
  }
}



export default{
  namespaced:true,
  state,
  mutations,
  actions
}