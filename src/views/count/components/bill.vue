<template>
  <div>
    <accounts-title>
      <!-- <span slot="before">总资产</span> -->
      <template slot="left">
        <span>年度总支出</span>
        <span v-html="'\u2002'"></span>
        <span>￥{{totalOutMoney}}</span>
      </template>
      <template slot="center">
        <span>年度总收入</span>
        <span v-html="'\u2002'"></span>
        <span>￥{{totalInMoney}}</span>
      </template>
      <template slot="right">
        <span>年度净收入</span>
        <span v-html="'\u2002'"></span>
        <span>￥{{totalActualmoney}}</span>
      </template>
    </accounts-title>
    <el-card >
      <div class="top">
        <div class="title">
          <span>账单列表</span>
        </div>
        <el-select class="select" v-model="currentYear" size="small" style="width: 120px" @change="dateChange">
          <el-option v-for="item in yearList" :key="item" :label="item" :value="item">{{ item }}</el-option>
        </el-select>
      </div>
      
      <el-table border="" :data="list">
        <el-table-column align="center" prop="month" label="月份" width="120" />
        <el-table-column align="center" prop="outmoney" label="支出"  />
        <el-table-column align="center" prop="inmoney" label="收入" />
        <el-table-column align="center" prop="actualmoney" label="结余" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <el-button size="small" type="text" @click="look(row.month)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {getBillList} from '@/api/count'
export default {
  name: '',
  data(){
    return{
      list:[],
      yearList:[],
      currentYear:null,
      selectYear:null,
    }
  },
  created(){
    this.currentYear = new Date().getFullYear();
    this.yearList = Array.from(Array(11),(v,i) => this.currentYear + i - 5 )
    this.dateChange()
   
  },
  computed:{
    totalOutMoney(){
      let sum = 0
      this.list.map(item=>{
        sum += item.outmoney
      })
      return Math.abs(sum)
    },
    totalInMoney(){
      let sum = 0
      this.list.map(item=>{
        sum += item.inmoney
      })
      return Math.abs(sum)
    },
    totalActualmoney(){
      let sum = 0
      this.list.map(item=>{
        sum += item.actualmoney
      })
      return sum
    }
  },

  methods:{
    // 年份改变
     dateChange(){
      this.getBillList()
    },
    async getBillList(){
      let data = {
        date:`${this.currentYear}`
      }
      const {rows} = await getBillList(data)
      this.list = rows
    },
    // 查询详情
    look(month){
      // console.log(month)
      this.$router.push({path:'/recordDetail',query:{month: `${this.currentYear}-${month}`}})
    }
  }
}
</script>

<style lang="scss" scoped>
.top{
  position: relative;
}
.title{
  // background-color: bisque;
  width: 100px;
  height: 40px;
  padding: 10px 0;
  text-align: left;
}
.select{
  position: absolute;
  top:3%;
  right: 1%;
  width: 120px;
}
</style>
