<template>
   <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs @tab-click="handleClick">
          <el-tab-pane label="收支概况">
            <show-chart />
          </el-tab-pane>
          <el-tab-pane label="账单报表">
            <bill />
          </el-tab-pane>
        </el-tabs>
      </el-card>

    </div>
  </div>
</template>

<script>
import ShowChart from './components/show-chart'
import Bill from './components/bill'

export default {
  name: '',
  components:{
    ShowChart,
    Bill,
  },
  data(){
    return{
      loading:false,
    }
  },
  methods:{
    handleClick(tab, event){
      if(tab.index == '0'){
        // this.loading = true
        // this.$refs.first.getaccountsList();
        this.$message.warning('1')
      }else{
        this.$message.warning('2')
        // this.loading2 = true
        // this.$refs.second.getRecordList();
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
