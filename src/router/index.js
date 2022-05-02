import Vue from 'vue'
import Router from 'vue-router'

import accounts from './modules/accounts'
import permission from './modules/permission'
import bookkeeping from './modules/bookkeeping'
import count from './modules/count'
import personal from './modules/personal'
import rolemanagement from './modules/rolemanagement'
import usermanagement from './modules/usermanagement'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  // 因为是公共路由，所以放到静态路由中
  {
    path: '/import',
    component:Layout,
    hidden:true, // 隐藏在左侧菜单中
    children:[{
      path:'', // 二级路由path什么都不写 表示二级默认路由
      component: ()=> import('@/views/import')
    }]
  },


  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },

  

  

  
  

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 动态路由
export const asyncRoutes = [
  bookkeeping,
  accounts,
  count,
  personal,
  permission,
  rolemanagement,
  usermanagement,

]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // routes: constantRoutes
  routes: [...constantRoutes, ...asyncRoutes] // 临时合并所有的路由
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
