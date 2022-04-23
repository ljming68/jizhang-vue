<template>
   <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs @tab-click="handleClick">
          <el-tab-pane  label="资产账户">
            <asset-account v-loading="loading" ref="first"  :loading.sync="loading"/>
          </el-tab-pane>
          <el-tab-pane   label="收支明细" >
            <inandout-detail  v-loading="loading2" ref="second" :loading.sync="loading2" />
          </el-tab-pane>

        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import AssetAccount from './components/asset-account'
import InandoutDetail from './components/inandout-detail'
export default {
  name: '',
  components:{
    AssetAccount,
    InandoutDetail
  },
  data(){
    return{
      loading:true,
      loading2:true,
    }
  },
  methods:{
    async refreshRecord(){
      this.$refs.second.getRecordList();
    },
    async refreshAccount(){
      this.$refs.first.getaccountsList();
    },
    handleClick(tab, event){
      if(tab.index == '0'){
        this.loading = true
        this.$refs.first.getaccountsList();
      }else{
        this.loading2 = true
        this.$refs.second.getRecordList();
      }
    }
  }


}
</script>

<style lang="scss" scoped>

</style>
