<template>
  <div class="userinfo">
    <el-card>
      <el-row type="flex" justify="end"> 
        <el-button type="primary" @click="save" v-if="isEdit">保存</el-button>
        <el-button type="primary" @click="edit" v-else>编辑</el-button>
      </el-row>
      <el-form label-width="120px" :model="formData">
        <el-row>
          <el-col >
            <el-form-item label="用户头像">
              <image-upload ref="imgupload" @imgUrl="imgUrl"  v-show="isEdit"/>
              <img :src="url"  style="width:146px;height:146px;border-radius:4px" v-show=" !isEdit">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱/用户名" >
              <el-input style="width:70%" v-if="isEdit" disabled=""></el-input>
              <li v-else>{{userInfo.username}}</li>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" >
              <el-input style="width:70%" v-if="isEdit" v-model="formData.nickname"></el-input>
              <li v-else>{{userInfo.nickname}}</li>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="记账天数">
              <el-input style="width:70%" v-if="isEdit" disabled=""></el-input>
              <li v-else>{{recorddays}}天</li>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="记账笔数">
              <el-input style="width:70%" v-if="isEdit" disabled=""></el-input>
              <li v-else>{{userInfo.count}}笔</li>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="QQ">
              <el-input style="width:70%" v-if="isEdit" v-model="formData.qq"></el-input>
              <li v-else>{{userInfo.qq}}</li>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

  </div>
</template>

<script>
import {getUserInfo,updateUserInfo} from '@/api/user'
import {mapActions} from 'vuex'
export default {
  name: '',
  data(){
    return{
      url:'888',
      avatar:'',
      isEdit:false,
      userInfo:{},
      formData:{
        nickname:'',
        avatar:'',
        qq:'',
      }
    }
  },
  computed:{
    recorddays(){
      let createtime = this.userInfo.time
      let date1 = new Date(createtime); 
      let date2 = new Date();
      let Difference_In_Time = date2.getTime() - date1.getTime(); 
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      return parseInt(Difference_In_Days) 
    }
  },
  created(){
    this.getUserInfo()
  },
  methods:{
    ...mapActions(['user/getSimpleInfo']),
    // 接收 头像地址
    imgUrl(value){
      this.avatar = value
      this.url = `https://jizhang-avatar.oss-cn-beijing.aliyuncs.com/${value}`
    },
    // 进入编辑页面
    edit(){
      this.isEdit = true
      let avatar = this.avatar
      // console.log(avatar)
      this.$refs.imgupload.getAvatar(avatar)
      
    },
    // 保存 
    async save(){
      const {nickname,avatar,qq} = this.formData
      let data = {
        nickname,
        avatar:this.avatar,
        qq
      }
      // console.log(data)
      await updateUserInfo(data)
      await this['user/getSimpleInfo']()
      this.$message.success('资料修改成功')
      
      this.getUserInfo()
      this.isEdit = false
    },
    // 获取用户信息
    async getUserInfo(){
      const {rows} = await getUserInfo()
      // console.log(rows)
      this.userInfo = rows[0]
      this.formData = this.userInfo
      this.avatar = this.userInfo.avatar
      this.url = `https://jizhang-avatar.oss-cn-beijing.aliyuncs.com/${this.userInfo.avatar}`
      
    }
  }

}
</script>

<style lang="scss" scoped>
.userinfo{
  padding: 0 200px;
  li{
    list-style: none;
  }
}
</style>
