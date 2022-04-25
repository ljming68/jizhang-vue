<template>
  <el-dialog title="分配权限" :visible="showPermDialog" @close="btnCancel">
    <!-- 权限是一颗树 -->
    <!-- 将数据绑定到组件上 -->
    <!-- check-strictly 如果为true 那表示父子勾选时  不互相关联 如果为false就互相关联 -->
    <!-- id作为唯一标识 -->
    <el-tree
      ref="permTree"
      :data="permData"
      :props="defaultProps"
      :show-checkbox="true"
      :default-checked-keys="selectCheck"
      node-key="pid"
    />
    <!-- footer -->
    <template slot="footer">
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import {getPermissionList,assignPerm} from '@/api/permission'
import {getRolePerm} from '@/api/role'
export default {
  props:{
    showPermDialog:{
      type: Boolean,
      default: false
    }
  },
  name: '',
  data(){
    return{
      roleid:'',
      permData:{},// 专门用来接收权限数据 树形数据
      selectCheck: [], // 定义一个数组来接收 已经选中的节点
      defaultProps: {
        label: 'name'
      },
    }
  },
  methods:{
    async btnOK(){
      try{
        let pids = this.$refs.permTree.getCheckedKeys()
        pids = pids.toString()
        
        let updateData = {
          pids,
          roleid:this.roleid
        }
        await assignPerm(updateData)

        this.$message.success('分配权限成功')
        this.selectCheck = []
        this.$parent.showPermDialog = false

      }catch(error){
        console.log(error)
      }
    },
    btnCancel(){
     
      this.$emit('update:showPermDialog',false)

    },
    // 分配权限
    async assignPerm(roleid){
      const {rows} = await getPermissionList()
      this.permData = rows
      this.roleid = roleid
      const {pids} = await getRolePerm(roleid)
      console.log(pids)
      this.selectCheck = pids
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
