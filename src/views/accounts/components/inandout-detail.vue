<template>
  <div>
    <accounts-title>
      <!-- <span slot="before">总资产</span> -->
      <template slot="top">
        <span>本月结余</span>
        <span>$1475.00</span>
      </template>
      <template slot="middle">
        <span>本月支出</span>
        <span></span>
        <span>$1475.00</span>
      </template>
      <template slot="bottom">
        <span>本月收入</span>
        <span></span>
        <span>$2000.00</span>
      </template>
    </accounts-title>
    <el-card>
      <el-row style="height:60px">
         <el-button icon="el-icon-search" circle></el-button>
      </el-row>
      <el-table :data="list" border>
        <el-table-column label="序号" type="index" />
        <el-table-column label="记录名称" prop='recordname' />
        <el-table-column label="金额" prop="amount" />
        <el-table-column label="收支类型" prop="type" />
        <el-table-column label="记录时间" prop="recordtime" />
        <el-table-column label="备注" prop="note"/>
        <el-table-column label="使用账户" prop="payid" />
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="{row}">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="center" align="middle" style="height:60px">
        <el-pagination
          layout="prev, pager, next"
          :page-size="page.size"
          :current-page="page.page"
          :total="page.total"
          @current-change="changePage"
        />
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 1,
        total: 0
      }
    };
  },
  created() {
    this.getaccountsList();
  },
  methods: {
    getaccountsList() {
      this.list = [
        { recordname: "1", amount: "100", type: "支出", recordtime:'2022-03-15 17:04:32', note: "ok" ,payid:'1'},
        { recordname: "sd", amount: "1000", type: "支出", recordtime:'2022-03-15 17:04:32', note: "ok",payid:'1' },
        { recordname: "1sd", amount: "4100", type: "收入", recordtime:'2022-03-15 17:04:32', note: "ok",payid:'1' },
      ];
      this.page.total = this.list.length;
    },
    changePage(newPage) {
      this.page.page = newPage;
      this.getUserList();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
