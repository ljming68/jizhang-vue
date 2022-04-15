import {getToken,setToken,removeToken} from '@/utils/auth'
import {login} from '@/api/user'
const state = { 
  token:getToken()
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
  }
}

const actions = {
  // 登录
  async login({commit},data){
    // const result = await login(data)
    // axios默认给数据加了一层data,在request 中处理了

    // const result = await login(data)
    const result = await login(data)
    // console.log('loginStore',result)
    // if(data.success){
    //   let token = data
    //   commit('setToken',token)
    // }
    commit('setToken',result)
    
  },
  // 退出登录
  logout({commit}){
    commit('removeToken')
  }
}



export default{
  namespaced:true,
  state,
  mutations,
  actions
}