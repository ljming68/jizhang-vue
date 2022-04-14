import Layout from '@/layout'

// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default{
  path:'/accounts',
  name:'accounts',
  component:Layout,
  // 配置二级路由
  children:[{
    path:'',
    component:()=>import('@/views/accounts'),
    meta:{
      title:'账户管理',
      icon:'accounts'
    }
  }]

}