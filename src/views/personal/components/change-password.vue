<template>
  <div class="password">
    <el-card>
      <el-form :model="formData" :rules="rules" label-width="200px" ref="form">
        <el-row>
            <el-form-item label="新密码" style="width:80%" prop="password">
              <el-input style="width:70%" v-model="formData.password"></el-input>
            </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="再次输入" style="width:80%" prop="password2">
            <el-input style="width:70%" v-model="formData.password2"></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex" justify="center" >
          <el-col :span="12">  
          <el-button type="primary" @click="handleUpdate">更新</el-button>

          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {updatePassword} from '@/api/user'
export default {
  name: '',
  data(){
    const validatePass = (rule, value, callback) => {
      if(this.formData.password === this.formData.password2){
          callback()
      }else{
        callback(new Error('两次输入密码不一致'))
      }
    }
    return{
      formData:{
        password:'',
        password2:''
      },
      rules:{
        password:[{required:true,message:'密码不能为空',trigger:'blur'},
        {min: 6, max: 16, message: '密码的长度在6-16位之间 ', trigger: 'blur'},
        ],
        password2:[{required:true,message:'密码不能为空',trigger:'blur'},
        {min: 6, max: 16, message: '密码的长度在6-16位之间 ', trigger: 'blur'},
        {required:true,trigger:'blur',validator: validatePass}
        ],

      }
    }
  },
  methods:{
    async handleUpdate(){
      await this.$refs.form.validate
      let {password} = this.formData
      let data = {
        password
      }
      await updatePassword(data)
      this.$message.success('密码修改成功')
      this.formData = {
        password:'',
        password2:''
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.password{
  padding: 0 200px;
  
}
</style>
