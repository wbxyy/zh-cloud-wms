<template>
  <div>
    <button @click="add">新增</button>
    <button @click="init">初始化表格</button>
    <button @click="submit">提交表格</button>
    <SugarEditTable
      ref="sugarEditTable"
      :table-columns="tableColumns"
      :table-data.sync="list"
    ></SugarEditTable>
  </div>
</template>

<script>
//! 测试用例
//! 给SugarEditTable添加内容时，tableColumns中显式指定的字段能实现响应式
//! 设计一个tableColumns
//! 设计初始化列表数据
//! 初始化列表数据中必须缺失tableColumns的某个字段
import SugarEditTable from '@/components/SugarEditTable'
export default {
  components:{
    SugarEditTable
  },
  methods:{
    add(){
      this.$refs.sugarEditTable.add()
    },
    init(){
      this.$refs.sugarEditTable.init(this.data)
    },
    submit(){
      console.log(this.list);
    }
  },
  data(){
    return {
      data:[
        {a:'a1'},
        {a:'a2'},
        {a:'a3'},

      ],
      list:[],
      tableColumns:[
        {
          key:'a',
          label:'注册字段a',
          inputType:0
        },
        {
          key:'b',
          label:'注册字段b',
          inputType:0
        },
        {
          key:'c',
          label:'注册字段c',
          inputType:0
        },
      ]
    }
  },

}
</script>

<style>

</style>
