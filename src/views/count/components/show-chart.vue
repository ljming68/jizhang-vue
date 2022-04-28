<template>
  <div>
    <time-title>
      <template slot="left">
        <span>本周结余</span>
        <span v-html="'\u2002'"></span>
        <span>￥1475.00</span>
      </template>
      <template slot="center">
        <span>本周支出</span>
        <span v-html="'\u2002'"></span>
        <span>￥1475.00</span>
      </template>
      <template slot="right">
        <span>本周收入</span>
        <span v-html="'\u2002'"></span>
        <span>￥1475.00</span>
      </template>
      <template slot="one">
        <span>当前时间</span>
        <span v-html="'\u2002'"></span>
        <span>{{new Date() | formatDate}}</span>
      </template>
      <template slot="two">
        <DateTimePicker ref="dateTimePicker" @dateTypeSelectChange="dateTypeSelectChange" @datetimeChange="datetimeChange"/>
      </template>
      <template slot="check">
        <el-row class="rightbtn">
          <el-button type="primary" @click="handleSelect"> 查询</el-button>
          <el-button type="primary" @click="handleReset"> 重置</el-button>
        </el-row>
        
      </template>

    </time-title>
    <el-row type="flex" justify="space-between">
      <!-- 左侧内容 -->
      <el-col :span="13" style="padding-right:26px">
        <!--  -->
        <el-card class="box-card">
          <div slot="header" class="header">
            <span>收支趋势概况</span>
          </div>
          <!-- 放置折线图组件 -->
          <line-chart ref="line" />
        </el-card>
        <!--  -->
        <el-card class="box-card">
          <div slot="header" class="header">
            <span>收支占比概况</span>
          </div>
          <bing-chart ref="bing" />
        </el-card>
      </el-col>
      <!-- 右侧内容 -->
      <el-col :span="11">
        <el-card class="box-card">
          <div slot="header" class="header">
            <span>收支类目排行</span>
          </div>
        </el-card>
        <!-- 绩效指数 -->
        <el-card class="box-card">
          <div slot="header" class="header">
            <span>收支明细排行</span>
          </div>
        <!-- 放置雷达图 -->
        
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DateTimePicker from './datetimepicker'
import LineChart from './line-chart'
import BingChart from './bing-chart'
import {formatDate} from '@/utils/time'
export default {
  name: '',
  data(){
    return{
      typeDate:'',
      currentDate:'',

      date:'',
      resetdate:''

    }
  },
  filters:{
    formatDate,
  },
  components:{
    DateTimePicker,
    LineChart,
    BingChart,
  },
  mounted(){
    this.getCurrentMonth()
  },
  methods:{
    dateTypeSelectChange(data){
      console.log('father',data)
      this.typeDate = data
    },
    datetimeChange(data){
      console.log('father2',data)
      this.currentDate = data

    },
    async getCurrentMonth(){

      await this.$refs.dateTimePicker.getTime()
      // console.log(this.currentDate)
      let date = this.currentDate.split('-')
      date = `${date[0]}-${date[1]}`
      this.resetdate = date
      this.refreshChart(date)
      this.typeDate = {num: '3', time: this.currentDate}
      

    },
    async refreshChart(date){
      console.log('refreshChart',date)
      await this.$refs.line.getDate(date)
      await this.$refs.bing.getDate(date)
    },
    async handleSelect(){
      // await xx?
      console.log('sssss',this.typeDate,this.currentDate,this.date)
  
      if (this.typeDate.num === "1") {
        console.log('1111',this.date)
        let selectDate = this.date
        // this.refreshChart(selectDate)

        
      } else if (this.typeDate.num === "2") {
        console.log('2222',this.date)
        
      } else if (this.typeDate.num == "3") {
        console.log('3333',this.date)
        let arr = this.date.split('-')
        this.date = `${arr[0]}-${arr[1]}`
      }  else if (this.typeDate.num === "4") {
        console.log('4444',this.date)
        let arr = this.date.split('-')
        this.date = `${arr[0]}`
      }
      console.log(this.date)
      this.refreshChart(this.date)
      
      
    },
    handleReset(){
      this.$refs.dateTimePicker.reset()
      // console.log('reset',this.resetdate)
      this.refreshChart(this.resetdate)
    },
  },
  watch:{
    typeDate(newVal,oldVal){
      console.log(newVal)
      return this.date = `${newVal.time}`
    },
    currentDate(newVal,oldVal){
      console.log(newVal)
      return this.date = `${newVal}`
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  padding: 5px 10px;
  margin-top: 20px;
  .header {
    span {
      color: #2c3e50;
      font-size: 24px;
    }
    .item {
      color: #97a8be;
      float: right;
      padding: 3px 0;
    }
  }
  .headTit {
    span {
      border-bottom: 4px solid #8a97f8;
      padding-bottom: 10px;
    }
  }
}
.rightbtn{
  margin-left: -40px;
}
</style>
