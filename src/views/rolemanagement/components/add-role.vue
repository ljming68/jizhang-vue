<template>
  <el-dialog title="添加角色"  :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="addRole" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="名称" prop="identity" style="width:80%">
        <el-input v-model="formData.identity"></el-input>
      </el-form-item>
      <el-form-item label="描述" style="width:80%" prop="description">
        <el-input v-model="formData.description" type="textarea" :rows="2" ></el-input>
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
import {addRole} from '@/api/role'
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
        identity:'',
        description:'',
      },
      rules:{
        identity:[{required: true, message: '名称不能为空', trigger: 'blur'}],
        description:[{required: true, message: '描述不能为空', trigger: 'blur'}],
      }
    }
  },
  methods:{
    async btnOK(){
      try{
        await this.$refs.addRole.validate()
        await addRole(this.formData)
        this.$message.success('添加角色成功')
        this.$parent.getRoleList()
        this.$parent.showDialog = false

      }catch(error){
        console.log(error)
      }
    },
    btnCancel(){
      // 重置表单
      this.formData = {
        identity:'',
        description:'',
      }
      // 重置校验结果
      this.$refs.addRole.resetFields()
      this.$emit('update:showDialog',false)

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
