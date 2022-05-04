<template>
  <div class="userinfo">
    <el-card>
      <el-row type="flex" justify="end"> 
        <el-button type="primary" @click="save" v-if="isEdit">点击保存</el-button>
        <el-button type="primary" @click="edit" v-else>点击编辑</el-button>
      </el-row>
      <el-form label-width="120px">
        <el-row>
          <el-col >
            <el-form-item label="用户头像">
              <image-upload @imgUrl="imgUrl"  v-if="isEdit"/>
              <img src=""  style="width:146px;height:146px;border-radius:4px" v-else>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱/用户名" >
              <el-input style="width:70%" v-if="isEdit"></el-input>
              <li v-else>888888@qq.com</li>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" >
              <el-input style="width:70%" v-if="isEdit"></el-input>
              <li v-else>时默</li>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="记账天数">
              <el-input style="width:70%" v-if="isEdit"></el-input>
              <li v-else>16天</li>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="记账笔数">
              <el-input style="width:70%" v-if="isEdit"></el-input>
              <li v-else>25笔</li>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="QQ">
              <el-input style="width:70%" v-if="isEdit"></el-input>
              <li v-else>8888888</li>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

  </div>
</template>

<script>
export default {
  name: '',
  data(){
    return{
      url:'888',
      isEdit:false,
    }
  },
  methods:{
    imgUrl(value){
      this.url = value
    },
    edit(){
      this.isEdit = true
    },
    save(){
      this.isEdit = false
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
