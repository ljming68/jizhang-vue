// 该文件负责所有的公共的组件的全局注册   Vue.use
import PageTools from './PageTools'
import AccountsTitle from './AccountsTitle'
import AddAccount from './AddAccount'
import TimeTitle from './TimeTitle'

export default{
  install(Vue){
    // 注册全局的通用栏组件对象
    Vue.component('PageTools',PageTools)
    Vue.component('AccountsTitle',AccountsTitle)
    Vue.component('AddAccount',AddAccount)
    Vue.component('TimeTitle',TimeTitle)
  }
}