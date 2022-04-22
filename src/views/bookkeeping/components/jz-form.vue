<template>
  <el-form ref="addRecord" :model="formData" :rules="rules" class="form-container" label-width="100px">
    <el-form-item label="金额" prop="amount">
      <el-input v-model="formData.amount" style="width:80%" placeholder="请输入金额"></el-input>
    </el-form-item>
    <el-form-item label="类型" prop="category">
      <el-input v-model="formData.category" style="width:80%" placeholder="请输入类型"></el-input>
    </el-form-item>
    <el-form-item label="账户" >
      <el-row>
        <el-col :span="14" prop="payid">
        <el-select v-model="formData.payid" style="width:100%;display:inline-block" placeholder="请选择账户">
          <!-- 遍历账户信息 -->
          <el-option v-for="item in accountList" :key="item.payid" :label="item.value" :value="item.payid" />
        </el-select>
        </el-col>
        <el-col :span="6"><el-button size="medium" type="primary" class="btn_add" @click="addAcount">添加账户</el-button></el-col>
      </el-row>
      
    </el-form-item>
    <el-form-item label="时间" prop="recordtime">
        <el-date-picker v-model="formData.recordtime" type="date" placeholder="选择日期" style="width: 80%;"></el-date-picker>

      <!-- <el-col class="line" :span="2" style="text-align:center;"></el-col>
      <el-col :span="10" >
        <el-time-picker placeholder="选择时间" style="width: 90%;"></el-time-picker>
      </el-col> -->
    </el-form-item>
    <el-form-item label="备注" prop="note">
      <el-input v-model="formData.note" style="width:80%" type="textarea" :rows="3" ></el-input>
    </el-form-item>
    <el-button :loading="loading" class="btn_handle" type="primary" icon="el-icon-check" circle @click="handleRecord"></el-button>
</el-form>
</template>

<script>
import {getAccountList} from '@/api/account'
import {addRecord} from '@/api/record'
import {formatDate} from '@/utils/time'
import {validAmount} from '@/utils/validate'
export default {
  props:{
    inandouttype:{
      type:Number,
      default:0
    }
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
        payid:[{}] // 为不为空待定
      },
      page:{
        page:1,
        size:1000,
        total:0
      },
      accountList:[], // 账户列表
      loading:false,
      
    }
  },
  created(){
    this.getAccountList()
  },

  methods:{
    // 获取账户列表
    async getAccountList(){

      const {rows} = await getAccountList(this.page)
      // console.log(rows)

      // rows.forEach(item=>{
      //   accountList.push({:item.payname})
      // });
      this.accountList = rows.map((item, index)=>{
        const value = `${item.payname}---${item.paytypeid}---${item.balance}`
        return {'payid':item.payid,'value':value}
      })
      // console.log(this.accountList)
      
    },
    // 提交记录
    async handleRecord(){
      try{
        this.loading  = true
        // await this.$confirm('您确定要提交吗？')
        await this.$refs.addRecord.validate()
        let {category,amount,recordtime,note,payid} = {...this.formData}
        recordtime = formatDate(recordtime)
        const addList = {
          category,
          amount,
          recordtime,
          note,
          payid,
          inandouttype:this.inandouttype,
        }
        console.log(addList)
        await addRecord(addList)
        this.loading = false
        this.$message.success('添加成功')

        // 清空表单数据 和 校验信息
        this.formData = {
          category:'',
          amount:'',
          recordtime:'',
          note:'',
          payid:''
        },
        this.$refs.addRecord.resetFields()

        this.getAccountList()
      }catch(error){
        this.loading  = false
        console.log('addRecord',error)
      }
    },
    addAcount(){
      this.$emit('update:showDialog',true)
      this.$emit('getAccountList')
    }
  }

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
