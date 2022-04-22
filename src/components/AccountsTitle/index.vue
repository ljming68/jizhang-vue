<template>
  <el-card class="accounts-title">
    
      <el-row type="flex" justify="space-between" align="middle">
        <el-col>
          <i class="el-icon-info" />
          <slot name="left">
          <!-- <span>净资产</span>
          <span>$1475.00</span> -->
        </slot>
        </el-col>
        <el-col>
          <i class="el-icon-info" />
          <slot name="center">
          <!-- <span>净资产</span>
          <span>$1475.00</span> -->
        </slot>
        </el-col>
        <el-col>
          <i class="el-icon-info" />
          <slot name="right">
          <!-- <span>净资产</span>
          <span>$1475.00</span> -->
        </slot>
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
  .accounts-title{
    margin:  10px 0;
    .before{
      line-height: 34px;
      i{
      margin-right: 5px;
      color: #409eff;
      }
      display: inline-block;
      padding: 0 10px;
      border-radius: 3px;
      border: 1px solid rgba(145, 213, 255, 1);
      background: rgba(230, 247, 255, 1);

    }
    
    
  }
</style>
