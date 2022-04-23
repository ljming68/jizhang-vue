<template>
  <el-dialog title="编辑权限"  :visible="showEditDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="editPermission" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="名称" prop="name" style="width:80%">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="标识" prop="code" style="width:80%">
        <el-input v-model="formData.code"></el-input>
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
export default {
  props:{
    showEditDialog:{
      type: Boolean,
      default: false
    }
  },
  name: '',
  data(){
    return{
      formData:{
        name:'',
        code:'',
        description:'',
      },
      rules:{
        name:[{required: true, message: '名称不能为空', trigger: 'blur'}],
        code:[{required: true, message: '标识不能为空', trigger: 'blur'}],
        description:[{required: true, message: '描述不能为空', trigger: 'blur'}],
      }
    }
  },
  methods:{
    async btnOK(){
      try{
        await this.$refs.editPermission.validate()
        // await updatePermission(this.formData)
        this.$message.success('用户成功')
        this.$parent.getPermissionList()
        this.$parent.showEditDialog = false

      }catch(error){
        console.log(error)
      }
    },
    btnCancel(){
      // 重置表单
      this.formData = {
        name:'',
        code:'',
        description:'',
      }
      // 重置校验结果
      this.$refs.editPermission.resetFields()
      this.$emit('update:showEditDialog',false)

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
