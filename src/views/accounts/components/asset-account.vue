<template>
  <div>
    <accounts-title>
      <!-- <span slot="before">总资产</span> -->
      <template slot="left">
        <span>总资产</span>
        <span v-html="'\u2002'"></span>
        <span>￥{{totalBalance}}</span>
      </template>
      <template slot="center">
        <span>负债</span>
        <span v-html="'\u2002'"></span>
        <span>￥{{oweBalance}}</span>
      </template>
      <template slot="right">
        <span>净资产</span>
        <span v-html="'\u2002'"></span>
        <span>￥{{ActualBalance}}</span>
      </template>
    </accounts-title>
    <el-card>
      <el-row style="height:60px">
        <el-button icon="el-icon-plus" size="small" type="primary" @click="showDialog = true">新增账户</el-button>
      </el-row>
      <!-- 表格 -->
      <el-table :data="list" border>
        <el-table-column label="序号" type="index" ></el-table-column>
        <el-table-column label="账户名称" prop="payname"></el-table-column>
        <el-table-column :formatter="formatType" label="账户类型" prop="paytypeid"></el-table-column>
        <el-table-column label="账户余额" prop="balance"></el-table-column>
        <el-table-column label="操作" fixed="right" width="220">
          <template slot-scope="{row}">
            <!-- path: '/mtindex/detail', query:{shopid: item.id} `/recordDetail/${row.payid}`-->
            <el-button type="text" size="small" @click="$router.push({path:'/recordDetail',query:{payid: row.payid}})">查看</el-button>
            <el-button type="text" size="small" @click="editAccount(row.payid)">编辑</el-button>
            <el-button type="text" size="small" @click="transferAccount(row.payid)">转账</el-button>
            <!-- <el-button type="text" size="small">记一笔</el-button> -->
            <el-button type="text" size="small" @click="delAccount(row.payid)">删除</el-button>
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
    <edit-account ref="edit" :showEditDialog.sync="showEditDialog" :pay-id="payId"/>
    <transfer-account ref="trans" :showtransDialog.sync="showtransDialog" :pay-id="payId"/>
  </div>
</template>

<script>
import {getAccountList,delAccount} from '@/api/account'
import RecordEnum from '@/api/constant/record'
import EditAccount from './edit-account'
import TransferAccount from './transfer-account'
export default {
  name: "",
  components:{
    EditAccount,
    TransferAccount

  },
  data(){
    return{
      list:[],
      page:{
        page:1,
        size:5,
        total:0
      },
      showDialog:false,
      showEditDialog:false,
      showtransDialog:false,
      payId:null,
      // title
      blist:[],
      blist2:[],

    }
  },
  computed:{
    totalBalance(){
      let sum = 0
      this.blist.map(item=>{
        sum += item
      })
      return sum
    },
    oweBalance(){
      let sum = 0
      this.blist2.map(item=>{
        sum += item
      })
      return sum
    },
    ActualBalance(){
      let sum = 0
      this.list.map(item=>{
        sum += item.balance
      })
      return sum
    }
  },
  created(){
    this.getaccountsList()
  },
  methods:{
    async getaccountsList(){
      const {rows,total} = await getAccountList(this.page)
      // console.log(rows,total)
      this.list = rows
      this.page.total = total
      this.blist = rows.map(item=>{
        return item.balance
      }).filter(item => item>0)
      this.blist2 = rows.map(item=>{
        return item.balance
      }).filter(item => item<0)
      // console.log(this.blist)
      this.$emit('update:loading',false)
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
    // 编辑账户
    async editAccount(payid){
      this.payId = payid
      // console.log(payid)
      await this.$refs.edit.getAccountById(payid)
      this.showEditDialog = true
    },
    // 删除账户
    async delAccount(payid){
      try{
        await this.$confirm(`账户下所有账单数据会被清除！您确认删除吗？`,"提示")
        await delAccount(payid)
        this.$message.success('删除成功')
        this.getaccountsList()
        this.$parent.refreshRecord()
      }catch(error){

      }
    },
    // 转账
    async transferAccount(payid){
      this.payId = payid
      // console.log(payid)
      await this.$refs.trans.getFirstAccountById(payid)
      this.showtransDialog = true
    }    
  }

};
</script>

<style lang="scss">
.el-message-box{
  .el-message-box__header{
  background-color: #409EFF;
  border:0;
  }
  .el-message-box__close,.el-icon-close,.el-message-box__title{
    color: #fff;
  }
}

</style>
