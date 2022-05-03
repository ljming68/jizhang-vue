<template>
   <div class="dashboard-container">
    <div class="app-container">
      <el-tabs  @tab-click="handleClick">
        <el-tab-pane label="个人信息">
          <userinfo />
        </el-tab-pane>
        <el-tab-pane label="修改密码">
          <change-password />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Userinfo from './components/userinfo'
import ChangePassword from './components/change-password'

export default {
  name: '',
  components:{
    Userinfo,
    ChangePassword
  },
  methods:{
    handleClick(tab,event){
       if(tab.index == '0'){
        this.$message.warning('1')
      }else{
        this.$message.warning('2')
      }
    }
  }
}  
</script>

<style lang="scss" scoped>

</style>
