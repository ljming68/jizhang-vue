<template>
<div>
  <el-select class="select" v-model="selectid">
    <el-option label="支出" value="1"></el-option>
    <el-option label="收入" value="2"></el-option>
  </el-select>
  <div ref="line" class="line-chart" />
</div>
    
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
      yCurrentData:[],
      selectid:'1',
    }
  },
  created(){
    
  },
  mounted(){
    // this.initChart()
    // this.getData()
  },
  watch:{
    selectid(newVal,oldVal){
      if(newVal==='1'){

        this. yCurrentData = this.yDataArr
        this.updateChart()
        
      }else{
        this. yCurrentData = this.yDataArr2
        this.updateChart()
      }
    }
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
            data: this.yCurrentData,
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

      console.log('days----------------',this.date)
      if(this.date.length==7 | this.date.length==6){
        // console.log('月份')
        let res = this.date.split('-')
        // console.log(res[0],res[1])
        let year = parseInt(res[0])
        let month = parseInt(res[1])
        let days = this.getDays(year,month)
        // console.log(days)
        let arr = Array.from(Array(days)).map((item, index)=>`${index+1}`)
        this.xDataArr = arr

        let arr2 = Array.from(new Array(days),()=>({date:'',inmoney:0,outmoney:0}))

        // console.log(this.xDataArr,this.yDataArr)
        this.yDataArr = arr2.map((item,index) =>{
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
        this.yDataArr2 = arr2.map((item,index) =>{
          rows.forEach(i => {
            // console.log(i.date.substr(8,10) === (index+1).toString())
            if(parseInt(i.date.substr(8,10)) == (index+1)){
              // console.log(index,item,i)
              item = i
            }
          });
          return item.inmoney

        })
      }else if(this.date.length==10){
        // console.log('日')
        let arr = [this.date]
        this.xDataArr = arr
        // console.log(rows[0])
        if(rows[0] != undefined){
          this.yDataArr = [Math.abs(rows[0].outmoney)]
          this.yDataArr2 = [rows[0].inmoney]
        }else{
          this.yDataArr = [0]
          this.yDataArr2 = [0]
        }

        
      }else if(this.date.length==4){
        console.log('年')
        let arr = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
        this.xDataArr = arr
        let arr2 = Array.from(new Array(12),()=>({date:'',inmoney:0,outmoney:0}))
        console.log(arr2)
        this.yDataArr = arr2.map((item,index) =>{
            rows.forEach(i => {
              // console.log(i.date.substr(8,10) === (index+1).toString())
              if(parseInt(i.month) == (index+1)){
                // console.log(index,item,i)
                i.outmoney = Math.abs(i.outmoney)
                item = i
              }
            });
            return item.outmoney

        })

          this.yDataArr2 = arr2.map((item,index) =>{
            rows.forEach(i => {
              // console.log(i.date.substr(8,10) === (index+1).toString())
              if(parseInt(i.month) == (index+1)){
                // console.log(index,item,i)
                item = i
              }
            });
            return item.inmoney

        })
        
        console.log(this.yDataArr)

      }else{
        console.log('周')
        let start_day = this.date.split("--")[0]
        let end_day = this.date.split("--")[1]
        // console.log(start_day,end_day)
        let week_satrt_day = start_day.split('-')[2]
        let week_end_day = end_day.split('-')[2]
        console.log(week_satrt_day,week_end_day)
        let week_satrt_day_month = start_day.split('-')[1]
        let week_end_day_month = end_day.split('-')[1]
        // 判断是不是同一个月
        if(parseInt(week_satrt_day_month)  == parseInt(week_end_day_month) ){
          // console.log('同一个月')
          let current_day = parseInt(week_satrt_day) 
          console.log(current_day)
          let arr = Array.from(new Array(7),()=>(current_day))
          let arrs = arr.map((item,index)=>{
            item = `${week_satrt_day_month}-${item + index}`
            return item
          })
          console.log(arrs)
          this.xDataArr = arrs
        }else{
          // console.log('bu同一个月')
          let year = parseInt(start_day.substring(0,4))
          let month = parseInt(week_satrt_day_month)
          let days = this.getDays(year,month)
          let current_day = parseInt(week_satrt_day) 

          console.log(current_day)
          let arr = Array.from(new Array(7),()=>(current_day))
          console.log(arr)
          let arrs = arr.map((item,index)=>{
            let count = 0
            if(item + index > days){
              count += 1
              item = `${month + 1}-${count}`
                
              }else{
              item = `${month}-${item + index}`
            }
            return item
          })
          console.log(arrs)
          this.xDataArr = arrs

          
        }

        let arr2 = this.xDataArr
        console.log(arr2)
        // let arr2 = Array.from(new Array(7),()=>({date:'',inmoney:0,outmoney:0}))
        var outDateList = [0,0,0,0,0,0,0]
        var inDateList = [0,0,0,0,0,0,0]
        arr2 = arr2.map((item,index) =>{
          
          rows.forEach(i => {
            
            // console.log(parseInt(item.split('-')[0]) )
            // console.log(parseInt(i.date.split('-')[1]))
            if(parseInt(item.split('-')[0]) == parseInt(i.date.split('-')[1]) && parseInt(item.split('-')[1]) == parseInt(i.date.split('-')[2])){
              console.log(item,i,index)

              outDateList[index] = (Math.abs(i.outmoney))
              inDateList[index] = (Math.abs(i.inmoney))
              // item = Math.abs(i.outmoney)
              // console.log(item)
              // i.outmoney = Math.abs(i.outmoney)
              // item = i
            }
          });
          
          return item
          
        })
        this.yDataArr = outDateList
        console.log('qqqqqqqqwwww',this.yDataArr)
        this.yDataArr2 = inDateList
      }

      this.yCurrentData = this.yDataArr

    

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
.select{
  position: absolute;
  top:3%;
  right: 2%;
  width: 100px;
}
</style>
