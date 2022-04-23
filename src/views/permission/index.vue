<template>
   <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共100个权限</span>
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
    <!-- 新增权限 -->
    <add-permission :showDialog.sync="showDialog" />
    <!-- 编辑权限 -->
    <edit-permission :showEditDialog.sync="showEditDialog" />

  </div>
</template>

<script>
import AddPermission from './components/add-permission'
import EditPermission from './components/edit-permission'

export default {
  name: '',
  components:{
    AddPermission,
    EditPermission,
  },
  data(){
    return{
      list:[], //接收权限数据
      page:{
        page:1,
        size:1,
        total:0
      },
      loading:false,
      showDialog:false,
      showEditDialog:false

    }
  },
  created(){
    this.getPermissionList()
  },
  methods:{
    // 换页
    changePage(newPage){
      this.page.page = newPage
      this.getUserList()
    },
    async getPermissionList(){

      this.list = [
        {userid:'1',username:'111@qq.com',avatar:'1.png',nickname:'111'},
        {userid:'2',username:'111@qq.com',avatar:'1.png',nickname:'111'},
        {userid:'3',username:'111@qq.com',avatar:'1.png',nickname:'111'},

      ]
      this.page.total = this.list.length
    },
    // 删除权限
    async delPermission(pid){
      try{
        await this.$confirm('您确定删除该权限吗？',"提示")
        // await delUser(userid)
        this.getPermissionList()
        this.$message.success('删除用户成功')
        }catch(error){
          console.log(error)
      }
    },
    // 编辑权限
    async editPermission(pid){
      // const result = await getPermissionById(pid)
      this.showEditDialog = true

    }


  }
}
</script>

<style lang="scss" scoped>

</style>

