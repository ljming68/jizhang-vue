<template>
  <el-dialog title="编辑记录" :visible="showEditDialog" @close="btnCancel">
    <el-form ref="editAccount" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="账户名称" style="width:80%" prop="payname">
        <el-input v-model="formData.payname"></el-input>
      </el-form-item>
      <el-form-item label="账户类型" style="width:80%" prop="typename">
        <el-input v-model="formData.typename" placeholder="请选择账户类型" @focus="getAccountTypeList"></el-input>
          <div 
            class="down-tree"
            >
            <!-- 放置一个tree 组件 -->
            <el-tree
            :data="treeData"
            v-if="showTree"
            v-loading="loading" 
            accordion
            :props="{ label: 'typename' }"
            @node-click="selectNode"
            />
          </div>
      </el-form-item>
      <el-form-item label="账户余额" style="width:80%" prop="balance">
        <el-input v-model="formData.balance"></el-input>
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
import {getAccountTypeList,getAccountById,updateAccount} from '@/api/account'
import {tranListToTreeData} from "@/utils/index"
import RecordEnum from '@/api/constant/record'
import {validAmount} from '@/utils/validate'
export default {
  props:{
    showEditDialog:{
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
    return{
      formData:{
        payname:'',
        balance:'',
        paytypeid:null,
        typename:'',
      },
      rules:{
        payname:[{required: true, message: '账户名称不能为空', trigger: 'blur'}],
        balance:[{required: true, message: '账户余额不能为空', trigger: 'blur'},
        {required:true,trigger:'blur',validator: validateAmount}
        ],
        typename:[{required: true, message: '账户类型不能为空', trigger: 'change'}],
      },
      treeData:[], // 定义数组接收树形数据
      showTree:false,
      loading: false, // 控制树的显示或者隐藏进度条

    }
  },
  created(){
    // this.getAccountById()
  },
  methods:{
    async btnOK(){
      try{
        await this.$refs.editAccount.validate()
        const {payname,balance,typename} = {...this.formData}
        
        this.paytypeid = this.formatType(typename)
        // console.log(this.paytypeid)
        const addData = {
          payname,
          balance,
          paytypeid:this.paytypeid,
          payid:this.payId,
        }
        await updateAccount(addData)
        this.$message.success('更新账户成功')
        this.$parent.getaccountsList()
        this.$parent.showEditDialog = false

      }catch(error){
        console.log(error)
      }
    },
    btnCancel(){
      // 重置表单
      this.formData = {
        payname:'',
        balance:'',
        paytypeid:null,
         typename:'',
      }
      // 重置校验结果
      this.$refs.editAccount.resetFields()
      this.$emit('update:showEditDialog',false)

    },
    // 获取账户类型列表
    async getAccountTypeList(){
      this.showTree = true
      this.loading = true
      const result = await getAccountTypeList()
      // console.log(result)

      this.treeData = tranListToTreeData(result,null)
      // console.log(this.treeData)
      this.loading = false
    },
    // 选择账户类型
    selectNode(node){
        this.formData.typename = node.typename
        // console.log(this.formData)
        this.showTree = false
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
    async getAccountById(payid){
      // console.log(payid)
      const result =  await getAccountById(payid)
      const {payname,balance,paytypeid} = result[0]
      let typename = this.formatType(paytypeid)
      // console.log(result)
      
      
      this.formData = {
        payname,
        balance,
        typename,

      }
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
