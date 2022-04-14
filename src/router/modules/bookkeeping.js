import Layout from '@/layout'

export default{
  path:'/bookkeeping',
  name:'bookkeeping',
  component:Layout,
  // 配置二级路由
  children:[{
    path:'',
    component:()=>import('@/views/bookkeeping'),
    meta:{
      title:'记一笔',
      icon:'jz'
    }
  }]

}