<template>
  <div>
    <accounts-title>
      <!-- <span slot="before">总资产</span> -->
      <template slot="top">
        <span>净资产</span>
        <span>$1475.00</span>
        <span>眼睛</span>
      </template>
      <template slot="middle">
        <span>总资产</span>
        <span></span>
        <span>$1475.00</span>
      </template>
      <template slot="bottom">
        <span>负债</span>
        <span></span>
        <span>$1475.00</span>
      </template>
    </accounts-title>
    <el-card>
      <el-row style="height:60px">
        <el-button icon="el-icon-plus" size="small" type="primary">新增角色</el-button>
      </el-row>
      <!-- 表格 -->
      <el-table :data="list" border>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="账户名称" prop="payname"></el-table-column>
        <el-table-column label="账户类型" prop="paytypeid"></el-table-column>
        <el-table-column label="账户余额" prop="balance"></el-table-column>
        <el-table-column label="操作" fixed="right" width="220">
          <template slot-scope="{row}">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">转账</el-button>
            <el-button type="text" size="small">记一笔</el-button>
            <el-button type="text" size="small">删除</el-button>
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
</template>

<script>
export default {
  name: "",
  data(){
    return{
      list:[],
      page:{
        page:1,
        size:1,
        total:0
      },
    }
  },
  created(){
    this.getaccountsList()
  },
  methods:{
    getaccountsList(){
      this.list = [
        {payid:'1',paytypeid:'10',payname:'微信',balance:'1000'},
        {payid:'2',paytypeid:'10',payname:'微信2',balance:'10500'},
        {payid:'3',paytypeid:'10',payname:'微信23',balance:'11000'},





        
      ]
      this.page.total = this.list.length
    },
    changePage(newPage){
      this.page.page = newPage
      this.getUserList()
    }
  }

};
</script>

<style lang="scss" scoped>
</style>
