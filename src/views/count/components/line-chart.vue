<template>
  <div ref="line" class="line-chart" />
</template>

<script>
import { getLineList } from '@/api/count';
var echarts = require("echarts");
export default {
  name: '',
  data(){
    return{
      chartInstance:null,
      date:'',
      xDataArr:[],
      yDataArr:[],
      yDataArr2:[],
    }
  },
  created(){
    
  },
  mounted(){
    // this.initChart()
    // this.getData()
  },
  methods:{
    // 初始化echartInstance 对象
    initChart(){
      this.chartInstance = echarts.init(this.$refs.line);
    },
    // 获取服务器数据
    async getData(){
      await this.getDateList()
      this.updateChart()
    },
    // 更新图表
    updateChart(){
      this.chartInstance.showLoading();
      const option = {
        xAxis:{
          type:'category',
          data: this.xDataArr,
          boundaryGap:false,
        },
        yAxis:{
          type:'value',
          scale:true,
        },
        series:[
          {
            name:'支出趋势概况',
            data: this.yDataArr,
            type:'line',
            // 最大值和最小值
            markPoint:{
              data:[
                {
                  type:'max'
                },
                {
                  type:'min'
                }
              ]
            },
            // 平均值
            markLine:{
              data:[
                {
                  type:'average'
                }
              ]
            },
            smooth:true,
            lineStyle:{
              color:'blue',
              type:'solid' //dashed dotted solid
            },
            areaStyle:{
              color:'pink'
            }
          },
          {
            name:'收入趋势概况',
            data: this.yDataArr2,
            type:'line',
          }
        ]
      }
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
      const {rows} = await getLineList(dateData)

      let days = this.getDays(2022,4)
      let arr = Array.from(Array(days)).map((item, index)=>`${index+1}`)
      this.xDataArr = arr

      let arr2 = Array.from(new Array(days),()=>({date:'',inmoney:0,outmoney:0}))
      this.yDataArr = arr2.map((item,index) =>{
          rows.forEach(i => {
            // console.log(i.date.substr(8,10) === (index+1).toString())
            if(parseInt(i.date.substr(8,10)) == (index+1)){
              // console.log(index,item,i)
              item = i
            }
          });
          return item.inmoney

      })
      // console.log(this.xDataArr,this.yDataArr)
      this.yDataArr2 = arr2.map((item,index) =>{
          rows.forEach(i => {
            // console.log(i.date.substr(8,10) === (index+1).toString())
            if(parseInt(i.date.substr(8,10)) == (index+1)){
              // console.log(index,item,i)
              i.outmoney = Math.abs(i.outmoney)
              item = i
            }
          });
          return item.outmoney

      })

    

    },

    async getDate(date){
      console.log('ddddddddddddddddddd',date)
      this.date = date
      // this.getDateList(date)
      this.initChart()
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.line-chart {
    width: 580px;
    height: 400px;
    // background-color: pink;
}
</style>
