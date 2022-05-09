import router from '@/router'
import store from '@/store'

const whiteList = ['/login','/404']
router.beforeEach( async(to,from,next)=>{
  if(store.getters.token){
    // 有token 去登录 跳转到 首页
    if(to.path === '/login'){
      next('/')
    }else{
      if(!store.state.user.userInfo.userid){

        const { menus } =  await store.dispatch('user/getSimpleInfo')
        console.log(menus)
        // addRoutes  必须 用 next(地址) 不能用next()
        const routes = await store.dispatch('permission/filterRoutes',menus)
        // console.log('99999999999999',routes)
        router.addRoutes([...routes,{ path: '*', redirect: '/404', hidden: true }])
        next(to.path)
      }else{
        next()
      }
      // next()
    }
  }else{
    // 无 token
    if(whiteList.indexOf(to.path) >-1){
      next()
    }else{
      next('/login')
    }
  }
})