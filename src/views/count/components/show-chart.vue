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
        <span>时间</span>
        <span v-html="'\u2002'"></span>
        <span>2022年第18周</span>
      </template>
      <template slot="two">
        <DateTimePicker />
      </template>
      <template slot="check">
        <el-row class="rightbtn">
          <el-button type="primary"> 查询</el-button>
          <el-button type="primary"> 重置</el-button>
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
          <!-- <WorkCalendar />
          <component :is="'WorkCalendar'" /> -->
        </el-card>
        <!--  -->
        <el-card class="box-card">
          <div slot="header" class="header">
            <span>收支占比概况</span>
          </div>
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
        <radar />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DateTimePicker from './datetimepicker'
export default {
  name: '',
  components:{
    DateTimePicker,
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
