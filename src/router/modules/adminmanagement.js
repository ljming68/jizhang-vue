import Layout from '@/layout'

export default{
  path:'/adminmanagement',
  name:'adminmanagement',
  component:Layout,
  // 配置二级路由
  children:[{
    path:'',
    component:()=>import('@/views/adminmanagement'),
    meta:{
      title:'管理员管理',
      icon:'adminm'
    }
  }]

}