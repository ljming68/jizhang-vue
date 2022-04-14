import Layout from '@/layout'

export default{
  path:'/personal',
  name:'personal',
  component:Layout,
  // 配置二级路由
  children:[{
    path:'',
    component:()=>import('@/views/personal'),
    meta:{
      title:'个人中心',
      icon:'personal'
    }
  }]

}