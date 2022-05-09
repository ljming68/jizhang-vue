//  vuex的权限模块
import {constantRoutes, asyncRoutes} from '@/router'
// vuex中的permission模块用来存放当前的 静态路由 + 当前用户的 权限路由
const state = {
  routes:constantRoutes // 所有人默认拥有静态路由
}

const mutations = {
  setRoutes(state,newRoutes){
    // 下面这么写不对 不是语法不对 是业务不对
    // state.routes = [...state.routes, ...newRoutes]
    // 有一种情况  张三 登录 获取了动态路由 追加到路由上  李四登录 4个动态路由
    // 应该是每次更新 都应该在静态路由的基础上进行追加
    // 用户退出了 vuex 里面的数据 不删除吗？
    state.routes = [...constantRoutes, ...newRoutes]
  }
}

const actions = {
  filterRoutes(context,menus){
    const routes = []
    menus.forEach(key =>{
      routes.push(...asyncRoutes.filter(item =>item.name === key))
    })
    context.commit('setRoutes',routes)
    return routes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}