<template>
  <el-form class="form-container">
  <el-form-item label="金额">
    <el-input style="width:80%" placeholder="请输入金额"></el-input>
  </el-form-item>
  <el-form-item label="类型">
    <el-input style="width:80%" placeholder="请输入类型"></el-input>
  </el-form-item>
  <el-form-item label="账户">
    <el-row>
      <el-select style="width:67%;display:inline-block" placeholder="请选择账户"/>
      <el-button size="medium" type="primary" class="btn_add">添加账户</el-button>
    </el-row>
    
  </el-form-item>
  <el-form-item label="时间">
    <el-col :span="10">
      <el-date-picker type="date" placeholder="选择日期" style="width: 90%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2" style="text-align:center;"></el-col>
    <el-col :span="10" >
      <el-time-picker placeholder="选择时间" style="width: 90%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="备注">
    <el-input style="width:80%" type="textarea" :rows="3" ></el-input>
  </el-form-item>
  <el-button class="btn_handle" type="primary" icon="el-icon-check" circle></el-button>
</el-form>
</template>

<script>
export default {
  name: '',
}
</script>

<style lang="scss" scoped>
  .form-container{
    // border:1px solid red;
    padding:10px 15%;
    .icons{
      font-size: 20px;
      padding: 0 6px;
      color:rgb(233, 53, 53);
      vertical-align: middle;
      display: inline-block;
    }
    .btn_add{
      position: relative;
      top: 0;
      right: 0;
    }
    .btn_handle{
      font-size: 30px;
      float: right;
    }
  }
</style>
