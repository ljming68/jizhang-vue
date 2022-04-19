<template>
  <div class="login-container">
    <el-card class="login-card">
      <div class="title">
      记账管理系统
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="rules">
        <el-form-item prop="userName">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input ref="password" v-model="loginForm.passWord" placeholder="请输入密码" :type="passwordType"></el-input>
          <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item prop="imgCode">
          <span class="svg-container">
            <i class="el-icon-picture"></i>
          </span>
          <el-input v-model="loginForm.imgCode" placeholder="请输入验证码" style="width:60%" @keyup.enter.native="handleLogin"></el-input>
          <img class="code_img" src="http://localhost:5000/vcode">
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-button :loading="loading" size="medium" type="primary" @click="handleLogin" >登录</el-button>
        </el-row>
      </el-form>
      <div class="login-footer">
        <el-row >
          <el-col :span="8">
            <el-checkbox v-model="checked">记住我</el-checkbox>
          </el-col>
          <el-col :span="16">
            <el-link type="danger" style="float:right">忘记密码?</el-link>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" align="middle" style="margin-top:40px;color:red">
          <el-col :span="12">还没有账号
            <router-link to="/register">
              <el-link type="primary" >点击注册</el-link>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import {validEmail} from '@/utils/validate'
import {mapActions} from 'vuex'
import axios from 'axios'
export default {
  name: 'login',
  data(){
    // 自定义校验函数
    const validateEmail = function(rule,value,callback){
      validEmail(value) ? callback() :callback(new Error('邮箱格式不正确'))
    }
    return{
      loginForm:{
        userName:'1195107585@qq.com',
        passWord:'123456',
        imgCode:'0000',
      },
      rules:{
        userName:[{required:true,message:'用户名不能为空',trigger:'blur'},
        {required:true,trigger:'blur',validator: validateEmail}
        ],
        passWord:[{required:true,message:'密码不能为空',trigger:'blur'},
        {min: 6, max: 16, message: '密码的长度在6-16位之间 ', trigger: 'blur'}
        ],
        imgCode:[{required:true,message:'验证码不能为空',trigger:'blur'}
        ],
      },
      checked: true,
      passwordType:'password',
      loading:false,

    }
  },
  computed:{
    
  },
  methods:{
    ...mapActions(['user/login']),
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin(){
      this.$refs.loginForm.validate( async isOK =>{
        
        if(isOK){
          try{
            this.loading = true
            // 执行user/login 的方法
            await this['user/login'](this.loginForm)
            

            // const dataForm = {
            //   mobile:'13800000002',
            //   password:'123456',
            // }
            // console.log(dataForm)
            // console.log(this['user/login'])
            // await this['user/login'](dataForm)

            this.$message.success('登录成功')
            this.$router.push('/')
          }catch(error){
            console.log('login',error)
          }finally{
            this.loading = false
          }
         
        }
      })
    }
  }
}
</script>

<style lang="scss" >
$bg:rgba(0, 0, 0, 0.1);
$light_gray:#fff;
$dark_gray:#889aa4;
$cursor: #fff;
.login-container{
  // 重置element-ui css
  .el-input{
    display: inline-block;
    width: 85%;
    height: 48px;

    input{
      background: transparent ;
      border: 0px;
      color: $light_gray;
      border-radius: 0px;
      padding: 12px 5px;
      caret-color: $cursor;
    }

  }
  .el-button{
    width: 100%;
    height: 40px;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: $bg;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:rgba(0, 0, 0, 0.1);
$light_gray:#fff;
$dark_gray:#889aa4;
$cursor: #fff;
.login-container{
  height: 100%;
  width: 100%;
  background-color:pink;
  // overflow: hidden;
  background-image: url('~@/assets/common/login.jpg'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕

 
  .login-card{
    width: 500px;
    // height: 300px;
    padding: 100px 35px 0;
    max-width: 100%;
    background-color: rgb(123, 128, 128);
    position: absolute; // 不设置参考position 就相对于根元素定位
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;

    .title{
    font-size: 26px;
    font-weight: bold;
    color:$light_gray;
    text-align: center;
    margin: auto auto 40px;
    }

    .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
    width: 30px;
    }
    .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
    }
    .code_img {
      position: absolute;
      right: 10px;
      bottom: 15%;
      width: 25%;
      height: 40px;
    }

    .login-footer{
  
      margin-top: 20px;
    } 
  }


}
</style>
