import Layout from '@/layout'

export default{
  path:'/usermanagement',
  name:'usermanagement',
  component:Layout,
  // 配置二级路由
  children:[
    {
      path:'',
      component:()=>import('@/views/usermanagement'),
      meta:{
        title:'用户管理',
        icon:'userm'
      }
    },

]

}