<!-- 时间控件完整代码 -->
<template>
  <!-- 日 周 月 季 年 时间选择控件 -->
  <div class="datetimepicker">
    <el-select
      v-model="selectt"
      @change="dateTypeSelectChange"
      placeholder="请选择"
      style="width:65px;"
    >
      <el-option label="日" value="1"></el-option>
      <el-option label="周" value="2"></el-option>
      <el-option label="月" value="3"></el-option>
      <!-- <el-option label="季" value="4"></el-option> -->
      <el-option label="年" value="4"></el-option>
    </el-select>
 
    <el-date-picker
      v-if="selectt === '1'"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      :picker-options="dayDateOption"
      v-model="listQuery.day"
      @change="dayChange"
      type="date"
      placeholder="选择日"
    ></el-date-picker>
 
    <el-date-picker
      v-if="selectt === '2'"
      v-model="listQuery.week"
      type="week"
      format="yyyy 第 WW 周"
      :picker-options="weekDateOption"
      :editable="false"
      @change="weekdayChange"
      placeholder="选择周"
    ></el-date-picker>
 
    <el-date-picker
      v-if="selectt === '3'"
      v-model="listQuery.month"
      type="month"
      format="yyyy-MM"
      value-format="yyyy-MM"
      :picker-options="monthDateOption"
      :editable="false"
      @change="monthChange"
      placeholder="选择月"
    ></el-date-picker>
 
    <!-- <span v-if="selectt === '4'">
      <jidu-date-picker
        ref="jidupicker"
        @chooseSeason="seasonChange"
      ></jidu-date-picker>
    </span> -->
 
    <el-date-picker
      v-if="selectt === '4'"
      v-model="listQuery.year"
      type="year"
      format="yyyy"
      value-format="yyyy"
      :picker-options="yearDateOptions"
      :editable="false"
      @change="yearChange"
      placeholder="选择年"
    ></el-date-picker>
  </div>
</template>
 
<script>
// import jiduDatePicker from "@/components/datetimepicker/jiduDatePicker";
export default {
  name: "datetimepicker",
  data() {
    return {
      selectt: "3",
      listQuery: {
        day: "",
        week: "",
        month: "",
        // season: "",
        year: ""
      },
      dayDateOption: {
        firstDayOfWeek: 1,
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      weekDateOption: {
        firstDayOfWeek: 1,
        disabledDate(time) {
          const week = new Date().getDay();
          return time.getTime() > Date.now();
        }
      },
      monthDateOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      yearDateOptions: {
        disabledDate: time => {
          return time.getTime() > Date.now();
        }
      }
    }
  },
  props: {},
  methods: {
    dateTypeSelectChange(val) {
      // 选择时间类型下拉
      const data = {};
      if (val === "1") {
        data.num = "1";
        data.time = this.getDate(new Date().getTime());
      } else if (val === "2") {
        data.num = "2";
        data.time = this.getWeek();
      } else if (val === "3") {
        data.num = "3";
        data.time = this.getMonth();
      }  else if (val === "4") {
        data.num = "4";
        data.time = this.getYear();
      }
      this.timereset();
      // console.log('selectTime',data)
      this.$emit("dateTypeSelectChange", data);
    },
 
    dayChange(val) {
      if (val) {
        this.$emit("datetimeChange", val);
      } else {
        this.$emit("datetimeChange", this.getDate(new Date().getTime()));
      }
    },
    weekdayChange(val) {
      if (val) {
        // console.log('selectTime-week',this.listQuery.week)
        const week = this.getDate(val - 24 * 3600 * 1000);
        this.$emit("datetimeChange", week);
        // console.log('selectTime-week',week)
      } else {
        this.$emit("datetimeChange", this.getDate(new Date().getTime()));
      }
      // console.log("周 子组件");
      // console.log("v-modal绑定值" + this.listQuery.week);
      // console.log("转换后的" + week);
    },
    monthChange(val) {
      if (val) {
        const month = val + "-01";
        this.$emit("datetimeChange", month);
      } else {
        this.$emit("datetimeChange", this.getDate(new Date().getTime()));
      }
      // console.log("月");
      // console.log("v-model" + val);
      // console.log(this.listQuery.month);
    },

    yearChange(val) {
      // console.log("年");
      // console.log(val);
      if (val) {
        const year = val + "-01-01";
        this.$emit("datetimeChange", year);
      } else {
        this.$emit("datetimeChange", this.getDate(new Date().getTime()));
      }
    },
    // 时间初始化
    timereset() {
      // 时间重置
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const week = date.getDay();
      this.listQuery.day = this.getDate(
        new Date().getTime()
      );
      this.listQuery.week = new Date(date.getTime() - 24 * 3600 * 1000);
      this.listQuery.month = new Date(date.getTime());
      this.listQuery.year = new Date(date.getTime());

      // this.listQuery.day = this.getDate(
      //   new Date().getTime() - 24 * 3600 * 1000
      // );
      // this.listQuery.week = new Date(date.getTime() - 24 * 3600 * 1000 * 7);
      // this.listQuery.month = this.getBeforeMonth();
      // this.listQuery.year = new Date(date.getTime() - 24 * 3600 * 1000 * 365);
    },
    // 重置时间
    reset() {
      this.selectt = "3";
      this.timereset();
      this.monthChange()
    },
    // 转化时间格式
    getDate(time) {
      // 时间格式转化 年-月-日
      var date = new Date(time);
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    //  获取年
    getYear() {
      const year = new Date().getFullYear();
      return `${year}`;
    },
    // 获取月
    getMonth() {
      // 获取上个月时间  年-月-日
      let seperator1 = "-";
      let day = "01";
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      
      let currentdate = year + seperator1 + month;
      return currentdate;
    },
    // 获取周
    getWeek() {
      let time= new Date()
      let timesStamp = time.getTime();
      let currenDay = time.getDay();
      let weekDates = [];
 
      for (let i = 0; i < 7; i++) {
        weekDates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString()
            .replace(/\//g, '-'));
        }
 
      return `${weekDates[0]}--${weekDates[6]}`
 
      //自己按需求截取
      //  this.weekFirst1 = weekDates[0].split('-')[1]
      //  this.weekFirst2 = weekDates[0].split('-')[2]
      //  this.weekEnd1 = weekDates[6].split('-')[1]
      //  this.weekEnd2 = weekDates[6].split('-')[2]
 
    },
    getTime(){
      this.monthChange()
    },




    // 季度 不用
    getBeforeSeason() {
      // 获取上一季度
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      if (month <= 3) {
        year -= 1;
        return `${year}-10-01`;
      } else if (month > 3 && month <= 6) {
        return `${year}-01-01`;
      } else if (month > 6 && month <= 9) {
        return `${year}-04-01`;
      } else if (month > 9 && month <= 12) {
        return `${year}-07-01`;
      }
    },

    // 季度 不考虑
    seasonChange(val) {
      console.log("季");
      console.log(val);
      this.$emit("datetimeChange", val);
    },
  },
  created() {},
  mounted() {
    this.timereset();
  },
  computed: {},
  watch: {}
};
 
</script>
 
<style lang="scss" scoped>
.datetimepicker {
  display: inline-block;
}
</style>
<style lang="scss" scoped>
.datetimepicker {
  display: flex !important;
  flex-wrap: nowrap;
  .el-select {
    width: 80px !important;
    // min-width: 80px;
    .el-input {
      width: 100px !important;
      // min-width: 80px;
    }
  }
  .el-date-editor {
    width: 160px !important;
    // height: 0.36rem;
    // line-height: 0.36rem;
  }
}
</style>