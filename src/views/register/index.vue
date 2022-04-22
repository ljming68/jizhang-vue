<template>
  <div class="register-container">
    <el-card class="register-card">
      <div class="title">
        <el-row class="title-container" style="font-size:30px">
          <el-col :span="16">欢迎注册</el-col>
          <el-col :span="8" style="text-align:right">
            <router-link to="/login">
              <span class="iconfont icon-fanhui"></span>
            </router-link>
          </el-col>
        </el-row>
        <hr class="hr" />
      </div>
      <el-form ref="registerForm" :model="registerForm" :rules="rules" class="form-container">
        <el-form-item prop="userName">
          <span class="iconfont icon-dianziyouxiang icons"></span>
          <el-input v-model="registerForm.userName" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
         <el-form-item prop="ecode">
          <el-row>
            <el-col style="width:32px">
              <span class="iconfont icon-emiyanzhengma icons"></span>
            </el-col>
            <el-col :span="14">
              <el-input v-model="registerForm.ecode" placeholder="请输入邮箱验证码"></el-input>
            </el-col>
            <el-col :span="4">
               <el-button type="primary" round class="btn_send" @click="sendEmail($event)">发送</el-button>
            </el-col>
          </el-row>
          
         
        </el-form-item>
        <el-form-item prop="passWord">
          <span class="iconfont icon-mima icons"></span>
          <el-input v-model="registerForm.passWord" placeholder="请输入密码" :type="passwordType"></el-input>
          <span class="show-pwd" @click="showPwd('pwd')">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item prop="passWord2">
          <span class="iconfont icon-mima icons"></span>
          <el-input v-model="registerForm.passWord2" placeholder="请再次输入密码" :type="password2Type"></el-input>
          <span class="show-pwd" @click="showPwd('pwd2')">
            <svg-icon :icon-class="password2Type==='password'? 'eye' : 'eye-open'"></svg-icon>
          </span>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-button :loading="loading" size="medium" type="primary" @click="handleRegister" style="width:100%;height:40px" >注册</el-button>
        </el-row>
        <el-row class="tips-footer" type="flex" justify="center">
          <el-col :span="12" style="font-size:14px">
            已有账号,
            <router-link to="/login" style="color:blue">去登录</router-link>
          </el-col >
        </el-row>
      </el-form>

    </el-card>
  </div>
</template>

<script>
import {validEmail} from '@/utils/validate'
import {register,getEcode} from '@/api/user'
export default {
  name: 'register',
  data(){
    const validateEmail = function(rule,value,callback){
      validEmail(value) ? callback() :callback(new Error('邮箱格式不正确'))
    }
    const validateEcode = function(rule,value,callback){
      value.length === 6 ? callback() :callback(new Error('邮箱验证码为6位'))
    }
    // const validatePwd = function(rule,value,callback){
    //   console.log(this.registerForm.passWord)
    // }
    var validatePass = (rule, value, callback) => {
      // console.log(this.registerForm.passWord)
      if(this.registerForm.passWord === this.registerForm.passWord2){
          callback()
      }else{
        callback(new Error('两次输入密码不一致'))
      }
    }

    return{
      registerForm:{
        userName:'1195107585@qq.com',
        passWord:'123456',
        passWord2:'123456',
        ecode:'AAAAAA',
      },
      rules:{
        userName:[{required:true,message:'邮箱地址不能为空',trigger:'blur'},
        {required:true,trigger:'blur',validator: validateEmail}
        ],
        passWord:[{required:true,message:'密码不能为空',trigger:'blur'},
        {min: 6, max: 16, message: '密码的长度在6-16位之间 ', trigger: 'blur'},
        ],
        passWord2:[{required:true,message:'密码不能为空',trigger:'blur'},
        {min: 6, max: 16, message: '密码的长度在6-16位之间 ', trigger: 'blur'},
        {required:true,trigger:'blur',validator: validatePass}
        ],
        ecode:[{required:true,message:'邮箱验证码不能为空',trigger:'blur'},
        {required:true,trigger:'blur',validator: validateEcode}
        ],
      },
      passwordType:'password',
      password2Type:'password',
      loading:false,

    }
  },
  methods:{
    showPwd(pwd){
      // if (this.passwordType === 'password') {
      //   this.passwordType = ''
      // } else {
      //   this.passwordType = 'password'
      // }
      if(pwd === 'pwd'){
      this.passwordType === "password"? this.passwordType = '' : this.passwordType = "password"
      }else{
        this.password2Type === "password"? this.password2Type = '' : this.password2Type = "password"
      }
    },
    async sendEmail(event){
      this.$refs.registerForm.validateField('userName',async error=>{
        if(error){
          return false
        }else{
          try{
            const data = {
              email:this.registerForm.userName
            }
            await getEcode(data)
            this.$message.success('发送成功')

          }catch(error){
            console.log('getecode',error)
          }
        }
      })

      

    },
    async handleRegister(){
      this.$refs.registerForm.validate(async isOK =>{
        if(isOK){
          try{
            this.loading = true
            const {userName,passWord2,ecode} = {...this.registerForm}
            const data = {
              username:userName,
              password:passWord2,
              ecode,
            }
            
            console.log(data)
            await register(data)
            this.$message.success('注册成功')
            this.$router.push('/login')

          }catch(error){
            console.log('register',error)
          }finally{
            this.loading = false
          }
        }
      })
    },
  }
}
</script>
<style lang="scss">
$bg:rgba(0, 0, 0, 0.1);
$light_gray:#fff;
$dark_gray:#889aa4;
$cursor: #fff;
.register-container{
  // 重置element-ui css
  .el-input{
    display: inline-block;
    width: 85%;
    height: 48px;

    input{
      background: transparent ;
      border: 0px;
      // border:1px solid red;
      color: $light_gray;
      border-radius: 0px;
      // padding: 12px 0 12px;
      caret-color: $cursor;
      
    }

  }
  .el-button{
    // width: 100%;
    // height: 40px;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: $bg;
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__content{
    line-height: 48px;
  }
}
</style>
<style lang="scss" scoped>
$bg:rgba(0, 0, 0, 0.1);
$light_gray:#fff;
$dark_gray:#889aa4;
  .register-container{
    height: 100%;
    width: 100%;
    background-color:rgb(68, 157, 230);

    .register-card{
      width: 500px;
      // height: 300px;
      padding: 100px 35px 0;
      max-width: 100%;
      background-color: rgb(68, 157, 230);
      border:0;
      position: absolute; // 不设置参考position 就相对于根元素定位
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;

      .title{
        .hr{
          width:100%;
          margin:0 auto;
          border: 0;
          height: 4px;
          background: #333;
          background-image: linear-gradient(to right, red, #333, rgb(9, 206, 91));
        }
        .icon-fanhui{
          font-size: 30px;
        }
      }
      .form-container{
        padding: 40px 35px 0;
        .btn_send{
          position: absolute;
          top: 4px;
          right: 0;
        }
      }
      .icons{
        font-size: 20px;
        padding: 0 6px;
        color: $dark_gray;
        vertical-align: middle;
        display: inline-block;
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
      .tips-footer{
        margin-top: 20px;
      }
    }


  }
</style>
