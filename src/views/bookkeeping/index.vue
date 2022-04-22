<template>
   <div class="dashboard-container">
    <div class="app-container">
      <el-card class="bookkeeping-card">
        <el-tabs>
          <el-tab-pane  label="支出">
            <jz-form ref="add" :showDialog.sync="showDialog" />
          </el-tab-pane>
          <el-tab-pane  label="收入">
            <jz-form :inandouttype="inandouttype" :showDialog.sync="showDialog" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <add-account :showDialog.sync="showDialog"/>
  </div>
</template>

<script>
import jzForm from './components/jz-form'
export default {
  name: '',
  components:{
    jzForm,
  },
  data(){
    return{
      inandouttype:1,
      showDialog:false,
    }
  },
  methods:{
    getAccountList(){
      this.$refs.add.getAccountList()
    }
  }
}
</script>

<style lang="scss" >
  .el-tabs__item{
    font-size: 16px ;
    padding: 0 10px ;
  }
  .bookkeeping-card{
    padding: 0 5%;
  
  }
</style>