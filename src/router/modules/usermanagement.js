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
    {
      path:'detail/:id?',// ? 的含义是表示该参数可传可不穿   动态路由参数
      component:() =>import('@/views/usermanagement/detail'),
      hidden:true,
      meta:{
        title:'用户详情'
      }

    },
]

}