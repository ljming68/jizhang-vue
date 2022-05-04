<template>
  <div>
    <el-upload 
    list-type="picture-card" 
    :limit="1" action="#" 
    :on-preview="preview"
    :file-list="fileList"
    :on-remove="handleRemove"
    :on-change="changeFile"
    :before-upload="beforeUpload"
    :class="{disabled: fileComputed }"

    :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片" :visible.sync="showDialog">
      <el-row type="flex" justify="center">
      <img :src="imgUrl" style="width:50% ;height:50%" alt="">
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {imgUpload} from '@/api/user'
import {client} from '@/utils'
import OSS from 'ali-oss'
export default {
  name: '',
  data(){
    return{
      fileList:[{url:'http://localhost:5000/avatar/1.png'}],
      showDialog:false,
      imgUrl:''
    }
  },
  computed:{
    // 设定一个计算属性 判断是否已经上传完了一张
    fileComputed() {
      return this.fileList.length === 1
    },
  },
  methods:{
    // 弹层 查看图片 
    preview(file){
      // console.log('preview',file)
       // 这里应该弹出一个层 层里是点击的图片地址
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 删除文件
    // file 是要删除的文件 filelist 是删除过后的文件
    handleRemove(file,fileList){
      // console.log('handleRemove',file,fileList)
      //   将原来的文件给排除掉了 剩下的就是最新的数组了
      this.fileList = this.fileList.filter(item =>item.uid !== file.uid)
      // 方法二
      // this.fileList = fileList
    },
    // 此时可以用fileList 因为该方法会执行多次 不能每次都去push
    // file 是当前文件 filelist 是当前最新数组
    // fileList因为fileList参数是当前传进来的最新参数 我们只需要将其转化成数组即可 需要转化成一个新的数组
    // [] => [...fileList] [] => fileList.map()
    // 上传成功之后 还会进来 需要实现上传代码的逻辑 这里才会成功
    // 添加文件
    changeFile(file, fileList) {
      this.fileList = fileList.map(item => item)
      // 为什么 上传本地不成功显示  因为现在还没有上传  所以第二次进来的数据 一定是空的
    },
    // 检测上传文件类型
    beforeUpload(file){
      // console.log('beforeupload',file)
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      // if(!types.includes(file.type)){
        if(!types.some(item => item === file.type)){
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      // 检查大小
      const maxSize = 5 * 1024 * 1024
      if(maxSize < file.size){
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      return true
    },
    // 自定义上传方式
    async upload(params){
      if(params.file){
        // console.log(params.file.name)
        let time = new Date().getTime()
        let left = params.file.name.split('.')[1]
        // console.log(left)
        let fileName = time + '.' + left
        // console.log(fileName)
        let file = params.file
        client().multipartUpload(fileName,file, {
          progress: function(percentage, cpt) {
            console.log('打印进度',percentage)
        }}).then((res)=>{
          console.log(res)
          // let imgUrl = 'https://jizhang-avatar.oss-cn-beijing.aliyuncs.com/' + res.name;
          this.$emit('imgUrl',res.name)
          
        })
      }
    }

  }

}
</script>

<style >
.disabled .el-upload--picture-card {
  display: none
}
</style>
