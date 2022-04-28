<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width: 120px" @change="dateChange">
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item">{{ item }}</el-option>
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width: 120px;margin-left:10px" @change="dateChange">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item">{{ item }}</el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date, data }" class="content">
        <div class="date-content">
          
          <span class="text"> {{ data.day | getDay }}</span>
          <div class="rest" v-if="data.type == 'current-month' && scheduling.length > 0">
            <!-- 遍历数据，判断当前日期的日是否与数据中的（index+1）相等，也就是说判断是否为当天排班 -->
              <div v-for="(item, index) in scheduling" :key="'1' + index" class="zhi">
                {{data.day.split('-')[2] == index+1 ? '支： ' + item.outmoney : ''}}
              </div>
              <div v-for="(item, index) in scheduling" :key="'2' + index" class="shou" >
                {{data.day.split('-')[2] == index+1 ? '收： ' + item.inmoney : ''}}
              </div>
          </div>
        </div>
      </template>
    </el-calendar>
    <!-- <el-calendar v-model="currentDate">
      <template slot="dateCell" slot-scope="{ date, data }">
        <div class="date-cell" :class="data.isSelected ? 'is-selected' : ''">
          <div class="calendar-day">
            {{
            data.day
            .split('-')
            .slice(2)
            .join('-')
            }}
          </div>
          <div
            v-for="(item, index) in formatSchedule(data)"
            :key="index"
            class="subject_info"
          >{{item.subject}}</div>
        </div>
      </template>
    </el-calendar> -->
    <!-- range 是自定义时间范围 -->
    <!-- <el-calendar :range="[searchMonth, searchMonth]">
      <template slot="dateCell"  slot-scope="{data}">
       
        <p v-if="data.type == 'current-month'">
          {{ data.day.split('-').slice(1).join('-') }}
        </p>
        
        </div>
      </template>
    </el-calendar> -->

  </div>
</template>

<script>
import {getDateList} from '@/api/count'
export default {
  name: '',
  filters:{
    getDay(value) {
      const day = value.split('-')[2]
      return day.startsWith('0') ? day.substr(1) : day
    }
  },
  props:{
    startDate:{
      type:Date,
      default:()=>{
        return new Date()
      }
    }
  },
  data(){
    return{
      yearList:[],
      currentYear:null,
      currentMonth:null,
      currentDate: null,
      scheduling:[], //接收数据
    }
  },
  created(){
    this.currentYear = this.startDate.getFullYear() //得到当前的年份
    this.currentMonth = this.startDate.getMonth() + 1
    //  快速生成数组的方法
    this.yearList = Array.from(Array(11),(v,i) => this.currentYear + i - 5 )
    this.dateChange()
  },
  methods:{
    // 年月份改变之后
    dateChange(){
      const year = this.currentYear
      const month = this.currentMonth
      this.currentDate = new Date(`${year}-${month}-1`) // 以当前月的1号为起始
      this.getDateList()
      
    },
     // 是否是休息日
    isWeek(value) {
      return value.getDay() === 6 || value.getDay() === 0
    },
    async getDateList(){
      // console.log('首页',this.currentYear,this.currentMonth)
      this.$message.warning(`${this.currentYear},${this.currentMonth}`)
      let MonthData = `${this.currentYear}-${this.currentMonth}`
      // console.log(typeof MonthData.toString())
      let data = {
        date: MonthData.toString()
      }
      const {rows} = await getDateList(data)
      
      let count = this.getDays(this.currentYear,this.currentMonth)
      console.log(rows,count)
      // let arr1 =  new Array(count).fill(0)
      // let arr2 =  new Array(count).fill(0)
      // let show = [
      //   {arrangeStatus:arr1},
      //   {arrangeStatus:arr2}
      // ]
      // this.scheduling = show

      let arr = Array.from(new Array(count),()=>({date:'',inmoney:0,outmoney:0}))
      let arrs = arr.map((item,index) =>{
        rows.forEach(i => {
          // console.log(i.date.substr(8,10) === (index+1).toString())
          if(parseInt(i.date.substr(8,10)) == (index+1)){
            console.log(index,item,i)
            item = i
          }
        });
        return item

      })

      this.scheduling = arrs

      // 将 后端传过来的数据替换掉 原数据



      // const arr = rows.map()
    //   this.scheduling = [{
    //     arrangeStatus: ["111","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班"]
    //     }, {
    //     arrangeStatus: ["8888","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班","班"]
    //     }]
    },
    getDays(year, month) {
      let days = [31,28,31,30,31,30,31,31,30,31,30,31] 
      if ( (year % 4 ===0) && (year % 100 !==0 || year % 400 ===0) ) {
            days[1] = 29
      }　　return days[month+1]  
    }

  }
}
</script>

<style  >
  .el-backtop, .el-calendar-table td.is-today {
    color: #409EFF;
    background-color: rgb(255, 204, 93);
  }
  .el-calendar-day {
    height:  auto;
  }
  .el-calendar-table__row td, .el-calendar-table tr td:first-child,   .el-calendar-table__row td.prev{
    border:none;
  }
  .el-calendar-table td.is-selected .text{
    background: #409eff;
    color: #fff;
    border-radius: 50%;
  }
  .el-calendar__header {
    display: none
  }
</style>
<style lang="scss"  scoped>

.date-content {
  height: 60px;
  text-align: center;
 
  line-height: 40px;
  font-size: 14px;

}
.date-content .rest {
  /* color: #fff;
  background: rgb(250, 124, 77); */
  max-width: 100px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  margin: -16px auto 0;

  
  

}
.rest .zhi{
  color: red;
}
.rest .shou{
  color: green;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
  vertical-align:top;
 display: inline-block;

}

</style>
