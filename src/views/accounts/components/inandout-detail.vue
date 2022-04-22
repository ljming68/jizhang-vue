<template>
  <div>
    <accounts-title>
      <!-- <span slot="before">总资产</span> -->
       <template slot="left">
        <span>本月结余</span>
        <span v-html="'\u2002'"></span>
        <span>￥1000.00</span>
      </template>
      <template slot="center">
        <span>本月支出</span>
        <span v-html="'\u2002'"></span>
        <span>￥100.00</span>
      </template>
      <template slot="right">
        <span>本月收入</span>
        <span v-html="'\u2002'"></span>
        <span>￥1100.00</span>
      </template>
    </accounts-title>
    <el-card>
      <el-row style="height:60px">
         <el-button icon="el-icon-search" circle></el-button>
      </el-row>
      <el-table :data="list" border>
        <el-table-column label="序号" type="index" />
        <el-table-column label="记录类型" prop='category' />
        <el-table-column label="金额" prop="amount" />
        <el-table-column :formatter="formatType" label="收支类型" prop="type" />
        <el-table-column label="记录时间" prop="recordtime">
          <!-- 使用过滤器 -->
          <template slot-scope="obj">
              
            {{obj.row.recordtime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="note"/>
        <el-table-column   label="使用账户" prop="payid" />
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
import {getRecordList} from '@/api/record'
import {formatDate} from '@/utils/time'
import RecordEnum from '@/api/constant/record'
import {getAccountById} from '@/api/account'
export default {
  name: "",
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 5,
        total: 0
      },

    }
  },
  filters:{
    formatDate,
  },
  created() {
    this.getRecordList();
    console.log(this.list)
  },
  methods: {
    async getRecordList() {
      try{
        const {rows,total} = await getRecordList(this.page)
        console.log(rows,total)
        this.list = rows

        // this.list = rows.map(item=>{
        //   return formatDate(item.recordtime)
        // })
        this.page.total = total
        


      }catch(error){
        console.log('reocrd',error)
      }
      
    },
    changePage(newPage) {
      this.page.page = newPage;
      this.getRecordList()
    },
    // 格式化收支类型
    formatType(row, column, cellValue, index){
      // 找 0 1 对应的值
      const obj = RecordEnum.inandoutType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 格式化账户类型
    async formatPayid(cellValue){
      // 找 0 1 对应的值
      console.log(cellValue)
      // const result = await getAccountById(payid)
      // console.log(result)
      // return obj ? obj.id : '未知'
      return '11'
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
