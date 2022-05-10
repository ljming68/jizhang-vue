<template>
<div>
  <el-select class="select" v-model="selectid">
    <el-option label="支出" value="1"></el-option>
    <el-option label="收入" value="2"></el-option>
  </el-select>
  <div ref="categoryrank" class="category-rank" />
</div>
</template>

<script>
var echarts = require("echarts");
import {getCategoryList} from '@/api/count'
export default {
  name: '',
  data(){
    return{
      chartInstance:null,
      date:'',
      selectid:'1',
      xDataArr1:[],
      yDataArr1:[],
      xDataArr2:[],
      yDataArr2:[],
      yCurrentData:[],
      yCurrentData:[],
      title:'',
    }
  },
  created(){
  },
  watch:{
    selectid(newVal,oldVal){
      if(newVal==='1'){
        this.title = '支出'
        this. xCurrentData = this.xDataArr1
        this. yCurrentData = this.yDataArr1
        this.updateChart()
        
      }else{
        this.title = '收入'
        this. xCurrentData = this.xDataArr2
        this. yCurrentData = this.yDataArr2
        this.updateChart()
      }
    }
  },
  methods:{
    // 初始化echartInstance 对象
    initChart(){
      this.chartInstance = echarts.init(this.$refs.categoryrank);
    },
    // 获取服务器数据
    async getData(){
      await this.getDateList()
      // console.log('qqqqqq',this.bingData)
      this.updateChart()
    },
    // 更新图表
    updateChart(){
      this.chartInstance.showLoading();
      const option = {
        // 标题
        title: {
          text:this.title + "排行榜top10",
        },
        //图表位置
        grid: {
          left: "3%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis:{
          type:'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          //不显示X轴刻度线和数字
          splitLine: { show: false },
          axisLabel: { show: false },
        },
        yAxis:{
          type:'category',
          data:this.xCurrentData,
          //升序
          inverse: true,
          splitLine: { show: false },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          //key和图间距
          offset: 1,
           //动画部分
          animationDuration: 300,
          animationDurationUpdate: 300,
          //key文字大小
          nameTextStyle: {
            fontSize: 5,
          },
        },
        series:[
          {
            type:'bar',
            data:this.yCurrentData,
            //柱状图自动排序，排序自动让Y轴名字跟着数据动
            realtimeSort: true,

          },
        ],
        tooltip:{
          trigger:'item'
        }
      }
    //   console.log(option)
      this.chartInstance.hideLoading();
      this.chartInstance.setOption(option)
    },
    // 判断 月份有多少天
    getDays(year, month) {
      let days = [31,28,31,30,31,30,31,31,30,31,30,31] 
      if ( (year % 4 ===0) && (year % 100 !==0 || year % 400 ===0) ) {
            days[1] = 29
      }　　return days[month+1]  
    },
    async getDateList(){
    
      // 按月份
      let dateData = {
        date:this.date
      }
      const {rows1,rows2} = await getCategoryList(dateData)
          console.log(rows1,rows2)
      // 支出
      this.xDataArr1 = rows1.map(item =>{
          // item.value = Math.abs(item.value)
          return item.name
      })
      let yDataArr = rows1.map(item =>{
          item.value = Math.abs(item.value)
          return item.value
      })
      // this.yDataArr1 = yDataArr.sort(f)
      this.yDataArr1 = yDataArr

      this.xDataArr2 = rows2.map(item =>{
          // item.value = Math.abs(item.value)
          return item.name
      })
      this.yDataArr2 = rows2.map(item =>{
          item.value = Math.abs(item.value)
          return item.value
      })

      this. xCurrentData = this.xDataArr1
      this. yCurrentData = this.yDataArr1
      this.title = '支出'

    },
    
    async getDate(date){
      console.log('88888888888888888',date)
      this.date = date
      this.initChart()
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.category-rank {
    width: 500px;
    height: 400px;
    // background-color: pink;
}
.select{
  position: absolute;
  top:3%;
  right: 2%;
  width: 100px;
}
</style>
