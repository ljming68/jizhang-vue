import Layout from '@/layout'

export default{
  path:'/count',
  name:'count',
  component:Layout,
  // 配置二级路由
  children:[{
    path:'',
    component:()=>import('@/views/count'),
    meta:{
      title:'统计',
      icon:'count'
    }
  }]

}