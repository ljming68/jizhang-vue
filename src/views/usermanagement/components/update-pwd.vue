<template>
  <el-dialog title="修改密码" :visible="showPwdDialog" @close="btnCancel">
    <el-form ref="pwd" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="新密码" style="width:80%" prop="password">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
       <el-form-item label="再次输入" style="width:80%" prop="password2">
        <el-input v-model="formData.password2"></el-input>
      </el-form-item>
    </el-form>
    <!-- footer 插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import {changePassword} from '@/api/user'
import user from '../../../store/modules/user'
export default {
  name: '',
  props:{
    showPwdDialog:{
      type:Boolean,
      default:false
    },
  },
  data(){
    const validatePass = (rule, value, callback) => {
      if(this.formData.password === this.formData.password2){
          callback()
      }else{
        callback(new Error('两次输入密码不一致'))
      }
    }
    return{
      userid:null,
      formData:{
        password:'',
        password2:'',
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
    async btnOK(){
      try{
        await this.$refs.pwd.validate()
        let {password} = this.formData
        let data = {
          userid:this.userid,
          password
        }
        console.log('sssssssssss',data)
        await changePassword(data)
        this.$message.success('修改密码成功')
        this.$parent.getUserList()
        this.$parent.showPwdDialog = false

      }catch(error){
        console.log(error)
      }
    },
    btnCancel(){
      // 重置表单
      this.formData = {
        password:'',
        password2:'',
      }
      // 重置校验结果
      this.$refs.pwd.resetFields()
      this.$emit('update:showPwdDialog',false)

    },
    getUserId(userid){
      this.userid = userid
      // console.log('111111111111111',userid)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
