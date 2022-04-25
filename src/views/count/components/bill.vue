<template>
  <div>
    <accounts-title>
      <!-- <span slot="before">总资产</span> -->
      <template slot="left">
        <span>净资产</span>
        <span v-html="'\u2002'"></span>
        <span>￥1475.00</span>
      </template>
      <template slot="center">
        <span>总资产</span>
        <span v-html="'\u2002'"></span>
        <span>￥1475.00</span>
      </template>
      <template slot="right">
        <span>负债</span>
        <span v-html="'\u2002'"></span>
        <span>￥1475.00</span>
      </template>
    </accounts-title>
    <el-card>
      <div class="title">
        <span>账单列表</span>
      </div>
      <el-table border="" :data="list">
        <el-table-column align="center" type="index" label="月份" width="120" />
        <el-table-column align="center" prop="identity" label="支出"  />
        <el-table-column align="center" prop="description" label="收入" />
        <el-table-column align="center" prop="description" label="结余" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <el-button size="small" type="text" @click="look(row.monthid)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
}
</script>

<style lang="scss" scoped>
.title{
  // background-color: bisque;
  width: 100px;
  height: 40px;
  padding: 10px 0;
  text-align: left;
}
</style>
