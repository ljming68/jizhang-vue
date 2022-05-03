<template>
  <div>
    <el-card class="detail-header">
      <el-row type="flex" justify="space-between">
        <el-col>
          <el-button size="small" type="success" @click="$router.push('/import')">excel导入</el-button>
          <el-button size="small" type="danger" @click="showExportDialog = true">excel导出</el-button>
        </el-col>
        <el-col>
          <!-- 搜索 -->
          <el-row>
            <el-select v-model="selectt" size="small" style="width:130px" placeholder="选择搜索类型">
              <!-- <el-option label="默认显示全部" value="0"></el-option> -->
              <el-option label="记录类型" value="1"></el-option>
              <el-option label="收支类型" value="2"></el-option>
              <el-option label="时间" value="3"></el-option>
              <el-option label="金额" value="4"></el-option>
              <el-option label="备注" value="5"></el-option>
            </el-select>
            <el-input size="small" v-if="selectt === '1'" v-model="searchContent" class="serach" placeholder="搜索 根据记录类型"></el-input>
            <el-input size="small" v-if="selectt === '2'" v-model="searchContent" class="serach" placeholder="请输入 支出或收入"></el-input>
            <el-input size="small" v-if="selectt === '3'" v-model="searchContent" class="serach" placeholder="例如输入 2022-01-14 -- 2022-01-18"></el-input>
            <el-input size="small" v-if="selectt === '4'" v-model="searchContent" class="serach" placeholder="请输入 金额"></el-input>
            <el-input size="small" v-if="selectt === '5'" v-model="searchContent" class="serach" placeholder="搜索 根据备注"></el-input>
            <el-button size="small" icon="el-icon-search" circle @click="handleSearch"></el-button>
            <el-button size="small" icon="el-icon-refresh" circle @click="handleRefresh"></el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table :data="list" border v-loading="loading">
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
        <!-- <el-table-column   label="使用账户" prop="payid" /> -->
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="{row}">
            <!-- <el-button type="text" size="small">查看</el-button> -->
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
    <el-dialog title="导出账单明细" :visible="showExportDialog" @close="btnCancel">
      <!-- 表单 -->
      <el-form :model="formData"  label-width="160px">
        <el-form-item label="开始时间" style="width:100%">
          <el-date-picker style="width:60%" v-model="formData.startDate" type="date" :picker-options="pickerStartDate" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" style="width:100%">
          <el-date-picker style="width:60%" v-model="formData.endDate" type="date" :picker-options="pickerEndDate" placeholder="选择日期" size="medium">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <!-- footer 插槽 -->
      <template v-slot:footer>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button type="primary" size="small" @click="btnOK">确定</el-button>
          </el-col>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {getRecordList,delRecord,searchRecordList,getExportData} from '@/api/record'
import {formatDate} from '@/utils/time'
import RecordEnum from '@/api/constant/record'
import {getAccountById} from '@/api/account'
import EditRecord from './edit-record'
export default {
  name: "",
  components:{
    EditRecord,
  },
  data() {
    return {
      list: [], //纪录列表
      page: {
        page: 1,
        size: 5,
        total: 0
      },
      showDialog:false,
      searchContent:'', //搜索内容
      selectt:'',
      loading:false,
      getType:0,
      showExportDialog:false,
      formData:{
        startDate:null,
        endDate:null,
      },
      pickerStartDate:{
         disabledDate: time => {
          if (this.formData.endDate) {
            return time.getTime() > this.formData.endDate
          }
        }
      },
      pickerEndDate: {
        disabledDate: time => {
          return time.getTime() < this.formData.startDate
        }
      },

    }
  },
  filters:{
    formatDate,
  },
  created() {
    this.getRecordList();
    
    
    // console.log(this.list)
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
        this.$emit('update:loading',false)
        


      }catch(error){
        console.log('reocrd',error)
      }
      
    },
    changePage(newPage) {
      if(this.getType = 0){
        this.page.page = newPage;
        this.getRecordList()
      }else{
         this.page.page = newPage;
        this.handleSearch()
      }

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
        this.getRecordList()
      }catch(error){

      }
    },
    // 搜索相关
    handleRefresh(){
      this.searchContent = ''
      this.page.page = 1
      this.loading = true
      this.getRecordList();
      this.loading = false
      this.selectt = ''
    },
    async handleSearch(){
      console.log(this.selectt,this.searchContent)
      this.loading = true
      var data = {}
      if (this.selectt === "1") {
        let mark = 'category'
        let content = this.searchContent
        data = {
          mark,
          content
        }
      } else if (this.selectt === "2") {
        let mark = 'type'
        var content
        if(this.searchContent == '支出'){
          content = 0
        }else if(this.searchContent == '收入'){
          content = 1
        }else{
          this.$message.warning('搜索内容 请输入 支出或收入')
        }
        
        data = {
          mark,
          content
        }
      } else if (this.selectt == "3") {
        let mark = 'recordtime'
        var content
        let left = this.searchContent.split('--')[0]
        let right = this.searchContent.split('--')[1]
        console.log(left,right)
        if(left.length != right.length){
          this.$message.warning('搜索内容格式 如2022-01-14 -- 2022-01-18')
        }else{
          content = this.searchContent
        }
        
        data = {
          mark,
          content
        }
      }  else if (this.selectt === "4") {
          let mark = 'amount'
          var content 
          if(typeof parseInt(this.searchContent) != 'number'){
          this.$message.warning('请输入 数字')

          }else{
            content = this.searchContent
          }
          data = {
            mark,
            content
          }
      }else{
        let mark = 'note'
          let content = this.searchContent
          data = {
            mark,
            content
          }
      }
      console.log(data)
      
      const {rows,total} = await searchRecordList(data,this.page)
      this.getType = 1
      console.log(rows,total)
      this.list = rows
      this.page.total = total

      this.loading = false


    },
    // 导出
    async btnOK(){
      // 表头对应关系
      const headers = {
        '记录类型': 'category',
        '金额': 'amount',
        '收支类型': 'type',
        '记录时间': 'recordtime',
        '备注': 'note',
        '使用账户名称':'payid'
      }
      // 懒加载
      import('@/vendor/Export2Excel').then(async excel =>{
        let dateData = {
          startDate:formatDate(this.formData.startDate),
          endDate:formatDate(this.formData.endDate)
        }
        const {rows} = await getExportData(dateData)
        // console.log(rows)
        const data = this.formatJson(headers, rows)
        // console.log(rows,data)
        // debugger
        await excel.export_json_to_excel({
          header:Object.keys(headers),
          data,
          filename:`账单明细`,
          autoWidth:true,
          bookType:'xlsx'
        })
        this.$message.success('账单下载任务已提交')
        this.showExportDialog = false
      })
    },
    formatJson(headers, rows){
       // 首先遍历数组
      // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
     
      return rows.map(item => {
        return Object.keys(headers).map(key =>{

          return item[headers[key]]
        })
      })


      // 上面代码可以简写
      // return rows.map(item => Object.keys(headers).map(key => item[headers[key]]))
    },
    btnCancel(){
      this.formData = {
        startDate:null,
        endDate:null,
      }
      this.showExportDialog = false
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-header{
  margin-bottom: 10px;
}
.serach{
  width: 300px;
  margin-right: 10px;
 
}
</style>
