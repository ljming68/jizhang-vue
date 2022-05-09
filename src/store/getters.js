const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  rolename: state =>state.user.userInfo.rolename, // 建立用户身份的映射
  // avatar: state =>state.user.userInfo.avatar,
  nickname: state =>state.user.userInfo.nickname,
  routes:state => state.permission.routes // 导出当前的路由

}
export default getters
