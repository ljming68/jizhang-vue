<template>
  <div>
    <el-card>
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
        <el-table-column v-if="isShow" label="使用账户" prop="payid"/>
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="editRecord(row.recordid)">编辑</el-button>
            <el-button type="text" size="small" @click="delRecord(row.recordid)">删除</el-button>
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
    <edit-record ref="edit" :showDialog.sync="showDialog" />
  </div>
</template>

<script>
import {getDetailList,delRecord} from '@/api/record'
import RecordEnum from '@/api/constant/record'
import {formatDate} from '@/utils/time'
import EditRecord from '@/views/accounts/components/edit-record'
export default {
  name: '',
  components:{
    EditRecord
  },
  data(){
    return{
      list: [], //纪录列表
      page: {
        page: 1,
        size: 5,
        total: 0
      },
      isShow:false,
      showDialog:false,
    }
  },
  filters:{
    formatDate,
  },
  // computed:{
  //   isShow(){
  //     if(this.$route.query.payid){
  //       return false
  //     }else{
  //       return true
  //     }
  //   }
  // },
  created(){
    this.getDetailList()
  },
  methods:{
    changePage(newPage) {
      this.page.page = newPage
      this.getDetailList()

    },
    // 格式化收支类型
    formatType(row, column, cellValue, index){
      // 找 0 1 对应的值
      const obj = RecordEnum.inandoutType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async getDetailList(){
      if(this.$route.query.payid){
        let data = {
          keyword:this.$route.query.payid
        }
        const {rows,total} = await getDetailList(data,this.page)
        this.list = rows
        this.page.total = total

      }else if(this.$route.query.month){
        this.isShow = true
        let data = {
          keyword:this.$route.query.month
        }
        const {rows,total} = await getDetailList(data,this.page)
        this.list = rows
        this.page.total = total

      }
      
    },
    // 编辑记录
    async editRecord(recordid){
      await this.$refs.edit.getRecordById(recordid)
      this.showDialog = true
    },
    // 删除记录
    async delRecord(recordid){
      try{
        await this.$confirm(`账单数据会被清除！您确认删除吗？`,"提示")
        await delRecord(recordid)
        this.$message.success('删除成功')
        this.getDetailList()
      }catch(error){

      }
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
