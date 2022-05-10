<template>
   <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共{{page.total}}个用户</span>
        <template slot="after">
          <!-- <el-button size="small" type="success">excel导入</el-button> -->
          <!-- <el-button size="small" type="danger">excel导出</el-button> -->
          <el-button icon="el-icon-plus" size="small" type="primary" @click="showDialog=true">新增用户</el-button>
        </template>
      </page-tools>
      <el-card>
        <el-table border :data="list" v-loading="loading">
          <el-table-column label="序号" type="index"/>
          <el-table-column label="用户名" prop="username"/>
          <el-table-column label="头像" prop="avatar"/>
          <el-table-column label="昵称" prop="nickname"/>
          <el-table-column label="操作" fixed="right" width="200">
            <template slot-scope="{row}">
              <el-button type="text" size="small" @click="updatePwd(row.userid)">改密</el-button>
              <el-button type="text" size="small" @click="assignRole(row.userid)">角色</el-button>
              <el-button type="text" size="small" @click="deleteUser(row.userid)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="center" align="middle" style="height:60px">
          <el-pagination 
            layout="prev, pager, next"
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 新增用户 -->
    <add-user :showDialog.sync="showDialog" />
    <!-- 分配角色 -->
    <assign-role ref="role" :showRoleDialog.sync="showRoleDialog" />
    <!-- 改密 -->
    <update-pwd ref="pwd" :showPwdDialog.sync="showPwdDialog"/>

    </el-dialog>
  </div>
</template>

<script>
import addUser from './components/add-user'
import AssignRole from './components/assign-role'
import UpdatePwd from './components/update-pwd'
import {getUserList,delUser} from '@/api/user'
export default {
  name: '',
  components:{
    addUser,
    AssignRole,
    UpdatePwd
    
  },
  data(){
    return{
      list:[], //接收用户数据
      page:{
        page:1,
        size:5,
        total:0
      },
      loading:false,
      showDialog:false,
      showRoleDialog:false,
      showPwdDialog:false,

    }
  },
  created(){
    this.getUserList()
  },
  methods:{
    // 换页
    changePage(newPage){
      this.page.page = newPage
      this.getUserList()
    },
    // 获取用户列表
    async getUserList(){
      this.loading = true
      const {rows,total} = await getUserList(this.page)
      this.list = rows
      this.page.total = total
      this.loading = false
    },
    // 删除用户
    async deleteUser(userid){
      try{
        await this.$confirm('该用户的所有信息将被清除，您确定删除该用户吗','提示')
        await delUser(userid)
        this.getUserList()
        this.$message.success('删除用户成功')
        }catch(error){
          console.log(error)
      }
    },
    // 分配角色
    async assignRole(userid){
      await this.$refs.role.assignRole(userid)
      this.showRoleDialog = true
    },
    // 改密
    async updatePwd(userid){
      await this.$refs.pwd.getUserId(userid)
      this.showPwdDialog = true

    }

  }
}
</script>

<style lang="scss" scoped>

</style>
