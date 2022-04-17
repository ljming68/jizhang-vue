import Layout from '@/layout'

export default{
  path:'/permission',
  name:'permission',
  component:Layout,
  // 配置二级路由
  children:[{
    path:'',
    component:()=>import('@/views/permission'),
    meta:{
      title:'权限管理',
      icon:'permission'
    }
  }]

}