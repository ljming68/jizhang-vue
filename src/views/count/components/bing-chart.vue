<template>
<div>
  <el-select class="select" v-model="selectid">
    <el-option label="支出" value="1"></el-option>
    <el-option label="收入" value="2"></el-option>
  </el-select>
  <div ref="bing" class="bing-chart" />
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
      bingData:[],
      selectid:'1',
    }
  },
  created(){
  },
  watch:{
    selectid(newVal,oldVal){
      if(newVal==='1'){

        this.CurrentData = this.bingData
        this.updateChart()
        
      }else{

        this.CurrentData = this.bingData2
        this.updateChart()
      }
    }
  },
  methods:{
    // 初始化echartInstance 对象
    initChart(){
      this.chartInstance = echarts.init(this.$refs.bing);
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
        legend:{
            data:this.CurrentData.name
        },
        series:[
          {
            data: this.CurrentData,
            type:'pie',
            radius:['50%','75%'],
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
        //   console.log(rows1,rows2)

      this.bingData = rows1.map(item =>{
          item.value = Math.abs(item.value)
          return item
      })
      this.bingData2 = rows2.map(item =>{
          return item
      })

      this.CurrentData = this.bingData
      console.log('zzzzzzzzzzzz',this.CurrentData)

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
.bing-chart {
    width: 580px;
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
