<template>
   <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template slot="after">
          <el-button icon="el-icon-plus" size="small" type="primary" @click="showDialog=true">添加角色</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table border="" :data="list">
        <el-table-column align="center" type="index" label="序号" width="120" />
        <el-table-column align="center" prop="identity" label="角色名称" width="240" />
        <el-table-column align="center" prop="description" label="描述" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <el-button size="small" type="success" @click="assignPerm(row.roleid)">分配权限</el-button>
            <el-button size="small" type="primary" @click="editRole(row.roleid)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteRole(row.roleid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加 -->
    <add-role :showDialog.sync="showDialog"/>
    <edit-role ref="edit" :showEditDialog.sync="showEditDialog"/>
    <assign-role ref="perm" :showPermDialog.sync="showPermDialog" />
  </div>
</template>

<script>
import {getRoleList,delRole} from '@/api/role'
import AddRole from './components/add-role'
import EditRole from './components/edit-role'
import AssignRole from './components/assign-role'

export default {
  name: '',
  components:{
    AddRole,
    EditRole,
    AssignRole,
  },
  data(){
    return{
      list:[], // 接收角色列表
      showDialog:false,
      showEditDialog:false,
      showPermDialog:false,
    }
  },
  created(){
    this.getRoleList()
  },
  methods:{
    async getRoleList(){
      const {rows} = await getRoleList()
      this.list = rows
    },
    // 编辑角色
    async editRole(roleid){
      if(roleid<3){
        this.$message.error('系统默认角色不可编辑')
      }else{
        await this.$refs.edit.getRoleById(roleid)
        this.showEditDialog = true
      }


    },
    // 删除角色
    async deleteRole(roleid){
       if(roleid<3){
        this.$message.error('系统默认角色不可删除')
      }else{
        try{
          await this.$confirm('您确定删除该角色吗？',"提示")
          await delRole(roleid)
          this.getRoleList()
          this.$message.success('删除角色成功')
          }catch(error){
            console.log(error)
        }
      }

    },
    // 分配权限
    async assignPerm(roleid){
      await this.$refs.perm.assignPerm(roleid)
      this.showPermDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
