<template>
  <el-dialog title="转账" :visible="showtransDialog" @close="btnCancel">
    <el-form ref="transAccount" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="账户1" prop="payid">
        <el-row>
          <el-col :span="16" >
          <el-select disabled=""  v-model="formData.payid" style="width:100%;display:inline-block" placeholder="请选择账户">
            <!-- 遍历账户信息 -->
            <el-option v-for="item in accountList" :key="item.payid" :label="item.value" :value="item.payid" />
          </el-select>
          </el-col>
        </el-row>
        
      </el-form-item>
      <el-form-item>
        <div class="svg-container">
          <svg-icon icon-class="transfer" />
        </div>
      </el-form-item>
      <el-form-item label="账户2" prop="payid2">
        <el-row>
          <el-col :span="16" >
          <el-select v-model="formData.payid2" style="width:100%;display:inline-block" placeholder="请选择账户">
            <!-- 遍历账户信息 -->
            <el-option v-for="item in accountList2" :key="item.payid" :label="item.value" :value="item.payid" />
          </el-select>
          </el-col>
        </el-row>
        
      </el-form-item>
      <el-form-item label="金额" style="width:73%" prop="balance">
        <el-input v-model="formData.balance" placeholder="请输入账户1转给账户2的金额"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="note" style="width:73%">
      <el-input v-model="formData.note"  type="textarea" :rows="3" ></el-input>
    </el-form-item>

    </el-form>
    <!-- footer 插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import {getAccountById,getAccountList,transAccount} from '@/api/account'
import {tranListToTreeData} from "@/utils/index"
import RecordEnum from '@/api/constant/record'
import {validAmount} from '@/utils/validate'
export default {
  props:{
    showtransDialog:{
      type:Boolean,
      default:false
    },
    payId:{
      type:Number,
      default:null
    }
  },
  name: '',
  data(){
    const validateAmount = function(rule,value,callback){
      validAmount(value) ? callback() : callback(new Error('只能为数字且数字最多带2位小数'))
    }
    var validatePayid = (rule, value, callback) => {

      if(this.formData.payid === this.formData.payid2){
          callback(new Error('不可以同账户转账'))
      }else{
        callback()
      }
    }
    return{
      formData:{
        payid:null,
        payid2:null,
        balance:'',
        note:'',
      },
      rules:{
        balance:[{required: true, message: '账户余额不能为空', trigger: 'blur'},
        {required:true,trigger:'blur',validator: validateAmount}
        ],
        payid:[{required: true, message: '账户1不能为空', trigger: 'blur'}],
        payid2:[{required: true, message: '账户2不能为空', trigger: 'blur'},
        {required:true,trigger:'blur',validator: validatePayid}
        ],
      },
      page:{
        page:1,
        size:1000,
        total:0
      },
      accountList:[], // 账户1列表
      accountList2:[], // 账户2列表


    }
  },
  mounted(){
    this.getAccountList()
  },
  methods:{
    async btnOK(){
      try{
        await this.$refs.transAccount.validate()
        
       
        await transAccount(this.formData)
        this.$message.success('账户转账成功')
        this.$parent.getaccountsList()
        this.$parent.showtransDialog = false

      }catch(error){
        console.log(error)
      }
    },
    btnCancel(){
      // 重置表单
      this.formData = {
        payid:null,
        payid2:null,
        balance:'',
        note:'',
      }
      // 重置校验结果
      this.$refs.transAccount.resetFields()
      this.$emit('update:showtransDialog',false)

    },
    // 获取账户列表
    async getAccountList(){
      const {rows} = await getAccountList(this.page)
      // console.log('++++',this.formData.payid)
      this.accountList2 = rows.map((item, index)=>{
        // if(item.payid == this.payId){
        //   return '同账户'   payid == null ?
        // }

        const value = `${item.payname}---${this.formatType(item.paytypeid)}---${item.balance}`
        return {'payid':item.payid,'value':value}
      })
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
    // 根据账户id获取账户信息 父组件调用
    async getFirstAccountById(payid){
      // console.log(payid)
      const result =  await getAccountById(payid)
      const {payname,balance,paytypeid} = result[0]
      let typename = this.formatType(paytypeid)
      const value = `${payname}---${typename}---${balance}`
      this.accountList = [{'payid':payid,'value':value}]
      this.formData.payid = payid
      
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

.svg-container {

  margin: 0 120px 0;
  vertical-align: middle;
  display: inline-block;
  width: 30px;
  font-size: 60px;
}
</style>
