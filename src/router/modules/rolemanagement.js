import Layout from '@/layout'

export default{
  path:'/rolemanagement',
  name:'rolemanagement',
  component:Layout,
  // 配置二级路由
  children:[{
    path:'',
    component:()=>import('@/views/rolemanagement'),
    meta:{
      title:'角色管理',
      icon:'roles'
    }
  }]

}