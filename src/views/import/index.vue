<template>
  <upload-excel :on-success="success" />
</template>

<script>
import {importRecord} from '@/api/record'
import {formatDate} from '@/utils/time'
export default {
  name: '',
  methods:{
    async success({header,results}){
      // debugger
      // header里的数据是中文  results里的数据也是中文
      const recordRelations = {
        '记录类型': 'category',
        '金额': 'amount',
        '收支类型': 'type',
        '记录时间': 'recordtime',
        '备注': 'note'
      }
      var newArr = results.map(item =>{
        var recordInfo = {}
        Object.keys(item).forEach(key =>{
          if(recordRelations[key] === 'recordtime'){
            recordInfo[recordRelations[key]] = new Date(this.formatDates(item[key],'/')) // 只有这样才可以存进数据库里
          }else{
            recordInfo[recordRelations[key]] = item[key]
          }
            
            
        })
        return recordInfo
      })
      let addData =  newArr.map(item=>{
        item.recordtime = formatDate(item.recordtime)
        if(item.type === '支出'){
          item.type = 0
          item.amount = -item.amount
        }else{
          item.type = 1
        }
        
        return item
      })
      // console.log(addData)
      console.log('导入成功',addData)
      let data = {
        records:JSON.stringify(addData)
      }
      await importRecord(data)
      this.$message.success('excel导入成功')
      
      this.$router.back()
    },
    formatDates(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
