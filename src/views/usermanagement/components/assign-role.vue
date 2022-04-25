<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <!-- 权限是一颗树 -->
    <!-- 将数据绑定到组件上 -->
    <!-- check-strictly 如果为true 那表示父子勾选时  不互相关联 如果为false就互相关联 -->
    <!-- id作为唯一标识 -->
    <el-tree
      ref="tree"
      :data="permData"
      :props="defaultProps"
      :show-checkbox="true"
      node-key="roleid"
      @check-change="checkChange"
      @node-click="nodeClick"
      :default-checked-keys="selectCheck"
      :check-strictly="true"
      highlight-current
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
// import {getPermissionList,assignPerm} from '@/api/permission'
import {getRoleList} from '@/api/role'
import {getUserById,updateUserRole} from '@/api/user'
export default {
  props:{
    showRoleDialog:{
      type: Boolean,
      default: false
    }
  },
  name: '',
  data(){
    return{
      userid:'',
      permData:{},// 专门用来接收权限数据 树形数据
      selectCheck: [], // 定义一个数组来接收 已经选中的节点
      editCheckId:null,
      defaultProps: {
        label: 'identity'
      },
    }
  },
  methods:{
    async btnOK(){
      try{

        let id = this.$refs.tree.getCheckedKeys()
        let updateData = {
          userid:this.userid,
          roleid:id[0]
        }
        await updateUserRole(updateData)

        this.$message.success('分配权限成功')
        // this.selectCheck = []
        this.$parent.showRoleDialog = false

      }catch(error){
        console.log(error)
      }
    },
    btnCancel(){
      this.selectCheck = []
      this.$emit('update:showRoleDialog',false)

    },
    // 分配权限
    async assignRole(userid){
      const {rows} = await getRoleList()
      this.permData = rows
      this.userid = userid
      const result = await getUserById(userid)
      this.selectCheck = [result[0].roleid]
    },
    // 限制只选一项
    checkChange(item,node,self){
      if(node==true){ //点击未选中的框
        this.editCheckId = item.roleid
        this.$refs.tree.setCheckedKeys([item.roleid])
      }else{
        if(this.editCheckId == item.roleid){ //点击已经选中的复选框
          this.$refs.tree.setCheckedKeys([item.roleid])
        }
      }
    },
    nodeClick(item,node,self){
      this.editCheckId = item.roleid
      this.$refs.tree.setCheckedKeys([item.roleid])
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
