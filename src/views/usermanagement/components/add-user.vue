<template>
  <el-dialog title="新增用户"  :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="addUser" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
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
export default {
  props:{
    showDialog:{
      type: Boolean,
      default: false
    }
  },
  name: '',
  data(){
    return{
      formData:{
        username:'',
        password:'',
      },
      rules:{
        username:[{}],
        password:[{}],
      }
    }
  },
  methods:{
    btnOK(){
      try{
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
