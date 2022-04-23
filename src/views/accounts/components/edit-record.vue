<template>
  <el-dialog title="编辑记录" :visible="showDialog" @close="btnCancel">
    <el-form ref="editRecord" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="记录类型" style="width:80%" prop="category">
        <el-input v-model="formData.category"></el-input>
      </el-form-item>
      <el-form-item label="记录金额" style="width:80%" prop="amount">
        <el-input v-model="formData.amount" ></el-input>
      </el-form-item>
      <el-form-item label="收支类型" style="width:80%" >
        <el-select  v-model="formData.inandouttype" style="width:100%;display:inline-block" placeholder="请选择" >
        <!-- 遍历只能遍历组件的数据 -->
          <el-option v-for="item in typeList" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="使用账户" style="width:80%" >
        <el-select v-model="formData.payid" style="width:100%;display:inline-block" placeholder="请选择账户">
          <!-- 遍历账户信息 -->
          <el-option v-for="item in accountList" :key="item.payid" :label="item.value" :value="item.payid" />
        </el-select>
      </el-form-item>
      <el-form-item label="记录时间" style="width:80%" prop="recordtime">
          <el-date-picker v-model="formData.recordtime" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注" style="width:80%" prop="note">
        <el-input v-model="formData.note" type="textarea" :rows="2" ></el-input>
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
</template>

<script>
import {getRecordById,updateRecord} from '@/api/record'
import {getAccountList} from '@/api/account'
import {tranListToTreeData} from "@/utils/index"
import RecordEnum from '@/api/constant/record'
import {validAmount} from '@/utils/validate'
import {formatDate} from '@/utils/time'
export default {
  props:{
    showDialog:{
      type:Boolean,
      default:false
    },
  },
  name: '',
  data(){
    
    const validateAmount = function(rule,value,callback){
      validAmount(value) ? callback() : callback(new Error('只能为数字且数字最多带2位小数'))
    }
    return{
      formData:{
        category:'',
        amount:'',
        recordtime:'',
        note:'',
        inandouttype:null,
        payid:null,
        
      },
      rules:{
        category:[{required: true, message: '类型不能为空', trigger: 'blur'},
        {}
        ],
        amount:[{required: true, message: '金额不能为空', trigger: 'blur'},
        {required:true,trigger:'blur',validator: validateAmount}
        ],
        recordtime:[{required: true, message: '日期不能为空', trigger: 'blur'}],
        note:[{}], 
        payid:[{}], 
      },
      page:{
        page:1,
        size:1000,
        total:0
      },
      accountList:[],// 账户列表
      typeList:[], //收支类型
    }
  },
  created(){
    this.getAccountList()
  },
  methods:{
    async btnOK(){
      try{
        await this.$refs.editRecord.validate()
        let {category,amount,recordtime,note,payid,inandouttype,recordid} = {...this.formData}
        recordtime = formatDate(recordtime)
        const updateData = {
          category,
          amount,
          recordtime,
          note,
          payid,
          inandouttype,
          recordid,
        }
        await updateRecord(updateData)
        this.$message.success('更新记录成功')
        this.$parent.getRecordList();
        this.$parent.showDialog = false

      }catch(error){
        console.log(error)
      }
    },
    btnCancel(){
      // 重置表单
      this.formData = {
        category:'',
        amount:'',
        recordtime:'',
        note:'',
        inandouttype:null,
        payid:null,
      }
      // 重置校验结果
      this.$refs.editRecord.resetFields()
      this.$emit('update:showDialog',false)

    },
    // 获取账户列表
    async getAccountList(){
      const {rows} = await getAccountList(this.page)
      // console.log('++++',this.formData.payid)
      let accountList = rows.map((item, index)=>{

        const value = `${item.payname}---${this.formatType(item.paytypeid)}---${item.balance}`
        return {'payid':item.payid,'value':value}
      })
      accountList.unshift({'payid':null,'value':'不计入账户'})
      this.accountList = accountList
      this.typeList = RecordEnum.inandoutType 
      // console.log(this.accountList)
      
    },
    // 格式化账户类型 名字找id
    formatType(cellValue){
      // 找 0 1 对应的值
      // console.log(cellValue)
      if(typeof cellValue === 'string'){
        const obj = RecordEnum.accountType.find(item => item.value === cellValue)
        return obj ? obj.id : '未知'
      }else{
        const obj = RecordEnum.accountType.find(item => item.id === cellValue)
        return obj ? obj.value : '未知'
      }
        
    },
    // 
    // 根据账户id获取账户信息
    async getRecordById(recordid){
      // console.log(recordid)
      const result =  await getRecordById(recordid)
      let {category,amount,recordtime,note,type,payid} = result[0]
      amount = Math.abs(amount)
      this.formData = {
        category,
        amount,
        recordtime,
        note,
        inandouttype:type,
        payid:payid,
        recordid,
      }
      this.getAccountList()
    
    }

  }
}
</script>

<style lang="scss" scoped>
.down-tree{
  max-height: 150px;
  display: block;
  overflow-y: scroll;
}
</style>
