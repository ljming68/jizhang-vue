<template>
  <el-card class="time-title">
      <!-- <el-row type="flex" justify="space-between" align="middle" >
        <el-col>
          <i class="el-icon-info" />          
          <slot name="left" >
          <span>时间</span>
          <span>$1475.00</span>
        </slot>
        </el-col>
        <el-col>
          <i class="el-icon-info" />
          <slot name="center">
          <span>净资产</span>
          <span>$1475.00</span>
        </slot>
        </el-col>
        <el-col>
          <i class="el-icon-info" />
          <slot name="right">
          <span>选择日期</span>
          <span>$1475.00</span>
        </slot>
        </el-col>
        
      </el-row> -->
      <el-row type="flex" justify="space-between" align="middle" class="two">
        <el-col :span="10">
          <slot name="one">
          <!-- <span>时间</span> -->
          <!-- <span>$1475.00</span> -->
        </slot>
        </el-col>
        <el-col :span="6">
          <slot name="two">
        </slot>
        </el-col>
        <el-col :span="8">
          <slot name="check">
          </slot>
          <!-- <span>选择日期</span> -->
          <!-- <span>$1475.00</span> -->
        </el-col>
        
        
        <!-- <span>净资产</span>
        <span>$1475.00</span>
        <span>眼睛</span> -->
      </el-row>

    <!-- </slot> -->
    <!-- <el-row type="flex" justify="space-between" align="middle">
      <slot name="middle" />
    </el-row>
    <el-row type="flex" justify="space-between" align="middle">
      <slot name="bottom" />
    </el-row> -->
  </el-card>
</template>

<script>
export default {
  name: '',
}
</script>

<style lang="scss" scoped>
  .time-title{
    margin:  10px 0;
  }
  // .two{
  //   margin-top: 20px;
  // }
</style>
