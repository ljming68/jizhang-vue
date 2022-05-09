<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-card class="header-card">
        <div>
          <div class="fl headL">
            <div class="headImg">
              <img :src="'https://jizhang-avatar.oss-cn-beijing.aliyuncs.com/'+avatarImg">
            </div>
            <div class="headInfoTip">
              <p class="firstChild">早安，{{ nickname }}，祝你开心每一天！</p>
              <p class="lastChild">理财是一项长久的事项，贯通人的一生</p>
            </div>
          </div>
          <div class="fr" />
        </div>
      </el-card>
            <!-- 主要内容 -->
      <el-row type="flex" justify="space-between">
        <!-- 左侧内容 -->
        <el-col :span="24">
          <!-- 日历 -->
          <el-card class="box-card">
            <div slot="header" class="header">
              <span>流水日历</span>
            </div>
            <!-- 放置日历组件 -->
            <work-calendar></work-calendar>
            <!-- <WorkCalendar />
            <component :is="'WorkCalendar'" /> -->
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WorkCalendar from './components/work-calendar'
export default {
  name: 'Dashboard',
  components:{
    WorkCalendar,
  },
  data(){
    return{
      // userInfo:{
      //   username:'大熊'
      // }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'nickname',

    ]),
    avatarImg(){
      return this.$store.state.user.userInfo.avatar? this.$store.state.user.userInfo.avatar :'1.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  margin: 10px;
  li {
    list-style: none;
  }
  .headImg {
    float: left;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #999;
          img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .headInfoTip {
    padding: 25px 0 0;
    margin-left: 120px;
    p {
      padding: 0 0 15px;
      margin: 0;
      &.firstChild {
        font-size: 24px;
      }
      &.lastChild {
        font-size: 20px;
        color: #7f8c8d;
      }
    }
  }
}
.header-card{
  position: relative;
  .header {
    position: absolute;
    right: 20px;
    top: 15px;
    z-index: 1;
  }
}
.box-card {
  // padding: 5px 10px;
  margin-top: 20px;
  .header {
    span {
      color: #2c3e50;
      font-size: 24px;
    }
    .item {
      color: #97a8be;
      float: right;
      padding: 3px 0;
    }
  }
  .headTit {
    span {
      border-bottom: 4px solid #8a97f8;
      padding-bottom: 10px;
    }
  }
}

</style>
