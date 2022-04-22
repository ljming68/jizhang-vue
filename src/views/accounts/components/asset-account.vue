<template>
  <div>
    <accounts-title>
      <!-- <span slot="before">总资产</span> -->
      <template slot="left">
        <span>净资产</span>
        <span v-html="'\u2002'"></span>
        <span>￥1475.00</span>
      </template>
      <template slot="center">
        <span>总资产</span>
        <span v-html="'\u2002'"></span>
        <span>￥1475.00</span>
      </template>
      <template slot="right">
        <span>负债</span>
        <span v-html="'\u2002'"></span>
        <span>￥1475.00</span>
      </template>
    </accounts-title>
    <el-card>
      <el-row style="height:60px">
        <el-button icon="el-icon-plus" size="small" type="primary" @click="showDialog = true">新增账户</el-button>
      </el-row>
      <!-- 表格 -->
      <el-table :data="list" border>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="账户名称" prop="payname"></el-table-column>
        <el-table-column :formatter="formatType" label="账户类型" prop="paytypeid"></el-table-column>
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
    <add-account :showDialog.sync="showDialog"/>
  </div>
</template>

<script>
import {getAccountList} from '@/api/account'
import RecordEnum from '@/api/constant/record'
export default {
  name: "",
  data(){
    return{
      list:[],
      page:{
        page:1,
        size:5,
        total:0
      },
      showDialog:false,
    }
  },
  created(){
    this.getaccountsList()
  },
  methods:{
    async getaccountsList(){
      const {rows,total} = await getAccountList(this.page)
      console.log(rows,total)
      this.list = rows
      this.page.total = total
    },
    changePage(newPage){
      this.page.page = newPage
      this.getaccountsList()
    },
    // 格式化账户类型
    formatType(row, column, cellValue, index){
      // 找对应的值
      const obj = RecordEnum.accountType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    
  }

};
</script>

<style lang="scss" scoped>
</style>
