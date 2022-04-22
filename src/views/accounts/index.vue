<template>
   <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs >
          <el-tab-pane  label="资产账户">
            <asset-account />
          </el-tab-pane>
          <el-tab-pane   label="收支明细" >
            <inandout-detail ref="second" />
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
  methods:{
    async refreshRecord(){
      this.$refs.second.getRecordList();
    }
  }


}
</script>

<style lang="scss" scoped>

</style>
