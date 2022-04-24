<template>
   <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共{{total}}个权限</span>
        <template slot="after">
          <!-- <el-button size="small" type="success">excel导入</el-button> -->
          <!-- <el-button size="small" type="danger">excel导出</el-button> -->
          <el-button icon="el-icon-plus" size="small" type="primary" @click="showDialog=true">添加权限</el-button>
        </template>
      </page-tools>
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" type="index"/>
          <el-table-column label="名称" prop="name"/>
          <el-table-column label="标识" prop="code"/>
          <el-table-column label="描述" prop="description"/>
         
          <el-table-column label="操作" fixed="right" width="200">
            <template slot-scope="{row}">
              <el-button type="text" size="small" @click="editPermission(row.pid)">编辑</el-button>
              <el-button type="text" size="small" @click="delPermission(row.pid)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 新增权限 -->
    <add-permission :showDialog.sync="showDialog" />
    <!-- 编辑权限 -->
    <edit-permission ref="edit" :showEditDialog.sync="showEditDialog" />

  </div>
</template>

<script>
import AddPermission from './components/add-permission'
import EditPermission from './components/edit-permission'
import {getPermissionList,delPermission} from '@/api/permission'
export default {
  name: '',
  components:{
    AddPermission,
    EditPermission,
  },
  data(){
    return{
      list:[], //接收权限数据
      total:0,
      loading:false,
      showDialog:false,
      showEditDialog:false

    }
  },
  created(){
    this.getPermissionList()
  },
  methods:{
    // 获取权限列表
    async getPermissionList(){

      const {rows,total} = await getPermissionList()
      this.list = rows
      this.total = total
    },
    // 删除权限
    async delPermission(pid){
      try{
        await this.$confirm('您确定删除该权限吗？',"提示")
        await delPermission(pid)
        this.getPermissionList()
        this.$message.success('删除权限成功')
        }catch(error){
          console.log(error)
      }
    },
    // 编辑权限
    async editPermission(pid){

      await this.$refs.edit.getPermissionById(pid)
      this.showEditDialog = true

    }


  }
}
</script>

<style lang="scss" scoped>

</style>

