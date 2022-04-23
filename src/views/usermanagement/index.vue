<template>
   <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共100条记录</span>
        <template slot="after">
          <!-- <el-button size="small" type="success">excel导入</el-button> -->
          <!-- <el-button size="small" type="danger">excel导出</el-button> -->
          <el-button icon="el-icon-plus" size="small" type="primary" @click="showDialog=true">新增用户</el-button>
        </template>
      </page-tools>
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" type="index"/>
          <el-table-column label="用户名" prop="username"/>
          <el-table-column label="头像" prop="avatar"/>
          <el-table-column label="昵称" prop="nickname"/>
          <el-table-column label="操作" fixed="right" width="200">
            <template slot-scope="{row}">
              <el-button type="text" size="small" @click="$router.push(`/user/detail/${row.userid}`)">查看</el-button>
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
  </div>
</template>

<script>
import user from '../../store/modules/user'
import addUser from './components/add-user'
export default {
  name: '',
  components:{
    addUser
  },
  data(){
    return{
      list:[], //接收用户数据
      page:{
        page:1,
        size:1,
        total:0
      },
      loading:false,
      showDialog:false,

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
    async getUserList(){
      this.loading = true
      // const { total, rows } = await getUserList(this.page)
      this.list = [
        {userid:'1',username:'111@qq.com',avatar:'1.png',nickname:'111'},
        {userid:'2',username:'111@qq.com',avatar:'1.png',nickname:'111'},
        {userid:'3',username:'111@qq.com',avatar:'1.png',nickname:'111'},

        
      ]
      this.page.total = this.list.length
      // this.list = rows
      this.loading = false
    },
    // 删除用户
    async deleteUser(userid){
      try{
        await this.$confirm('您确定删除该用户吗')
        // await delUser(userid)
        this.getUserList()
        this.$message.success('删除用户成功')
        }catch(error){
          console.log(error)
      }
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
