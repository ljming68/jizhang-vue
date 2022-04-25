<template>
  <el-dialog title="新增用户"  :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="addUser" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="用户名" prop="username" style="width:80%">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" style="width:80%">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
    </el-form>
    <!-- footer-->
    <template slot="footer">
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import {validEmail} from '@/utils/validate'
import {addUser} from '@/api/user'
export default {
  props:{
    showDialog:{
      type: Boolean,
      default: false
    }
  },
  name: '',
  data(){
    const validateEmail = function(rule,value,callback){
      validEmail(value) ? callback() :callback(new Error('邮箱格式不正确'))
    }
    return{
      formData:{
        username:'',
        password:'',
      },
      rules:{
        username:[{required:true,message:'邮箱地址不能为空',trigger:'blur'},
        {required:true,trigger:'blur',validator: validateEmail}
        ],
        password:[{required:true,message:'密码不能为空',trigger:'blur'},
        {min: 6, max: 16, message: '密码的长度在6-16位之间 ', trigger: 'blur'},
        ],
      }
    }
  },
  methods:{
    async btnOK(){
      try{
        await this.$refs.addUser.validate()
        await addUser(this.formData)
        this.$message.success('添加用户成功')
        this.$parent.getUserList()
        this.$parent.showDialog = false

      }catch(error){
        console.log(error)
      }
    },
    btnCancel(){
      // 重置表单
      this.formData = {
        username:'',
        password:'',
      }
      // 重置校验结果
      this.$refs.addUser.resetFields()
      this.$emit('update:showDialog',false)

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
