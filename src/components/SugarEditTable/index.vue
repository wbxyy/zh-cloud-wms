<template>
<div>
  <!-- 表单对话框 start-->
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    @open="$nextTick(()=>$refs.SugarForm.clearValidate())"
    width="60%"
  >
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmitRow">确 定</el-button>
    </span>
    请选择表单布局
    <el-select v-model="formCol">
      <el-option label='宽' :value="2"></el-option>
      <el-option label='中' :value="6"></el-option>
      <el-option label='窄' :value="12"></el-option>
    </el-select>
    <SugarForm ref="SugarForm" :form-label="tableColumns" :form-data.sync="row" :form-col="formCol" size="small"></SugarForm>
  </el-dialog>
  <!-- 表单对话框 end-->


  <!-- 表格start -->
    <!-- 用来提示校验的气泡 -->
    <el-popover trigger="manual" :value="Boolean(err)" placement="top">
      <!-- 表单域，校验域是一行 -->
      <el-form  slot="reference" ref="form" :model="sugarData[currentRow]" :rules="rules" :size="size" :validate-on-rule-change="false">
      <el-table :data="sugarData" border fit :size="size" @cell-click="handleEditRowInline" row-key="$sugarRowId" @hook:updated="tableUpdate">
        <!-- <el-table-column>
          <input type="text">
        </el-table-column> -->
        <el-table-column prop="operation" label="操作" align="center" class-name="small-padding fixed-width" min-width="130px" width="160px">
          <!-- <template slot="header" slot-scope="scope">
            <el-switch v-model="editInline" inactive-text="编辑模式" />
          </template> -->
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleEditRow(scope.$index)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDeleteRow(scope.$index)"
            >删除</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-fork"
              @click="handleCopyRow(scope.$index)"
            >复制</el-button>
          </template>
        </el-table-column>
        <el-table-column v-for="(item) in filterColumns" :key="item.key" :label="item.label" :align="item.align" :prop="item.key" :width="item.width?item.width:defaultWidth(item)" :fixed="item.fixed" :header-align="item.headerAlign?item.headerAlign:'center'" >
          <template slot="header" slot-scope="scope">
            <div v-tooltip="item.message" v-tooltip:error="item.error">{{item.label}}</div>
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="item.key" v-show="currentRow===scope.$index">
              <SugarTypeIn :short-holder='true' :no-label="true" :form-item="item" :value="sugarData[scope.$index]" ></SugarTypeIn>
            </el-form-Item>
            <!-- 这里用了v-show区分el-form-item，缺点是请求会发出2次 -->
            <!-- 如果里面的仓位需要请求，就会请求行数两倍的数量 -->
            <!-- <SugarTypeIn v-show="!(currentRow===scope.$index)" :short-holder='true' :no-label="true" :form-item="item" :value="tableData[scope.$index]" ></SugarTypeIn> -->
            <SugarRawText v-show="!(currentRow===scope.$index)" :value="sugarData[scope.$index][item.key]" :item="item"></SugarRawText>
          </template>
        </el-table-column>
      </el-table>
      </el-form>
      <span style="color:red">{{err}}</span>
    </el-popover>
  <!-- 表格end -->

</div>
</template>

<script>
// SugarEditTable是一个操作对象数组的页面控件
// 通过配置tableColumns对象，能够从内部创建对象数组
// 通过传入对象数组，可以对SugarEditTable进行初始化
// 初始化过程中，进行filter过滤，响应式加持

// 外部可以通过修改tableData属性而修改内部数据
// 内部可以通过封装好地控件操作内部数据
import SugarRawText from '@/components/SugarRawText'
import SugarTypeIn from '@/components/SugarTypeIn'
import SugarForm from '@/components/SugarForm'
import _ from 'lodash'
export default {
  name:'sugarEditTable',
  components:{
    SugarTypeIn,
    SugarForm,
    SugarRawText
  },
  props:{
    tableData:{
      type:Array,
      default:()=>[]
    } ,
    tableColumns:{
      type:Array,
      default:()=>[]
    },
    size:{
      type:String,
      default:'medium'
    },
    allowEmpty:{
      type:Boolean,
      default:false
    }
  },
  watch:{
    'sugarData':{
      deep:true,
      handler($event){
        this.$emit('update:tableData',$event)
      }
    },
  },
  computed:{
    rules(){
      const entries = this.filterColumns.map(item=>{
        let rule = item.rule
        //! 支持函数形式的rule，传递整个表单值
        if(typeof item.rule === 'function'){
          rule = item.rule(_.get(this.tableData,this.currentRow))
        }
        return [item.key,rule]
      })
      return Object.fromEntries(entries)
    },
    filterColumns(){
      //undefined时为true
      return this.tableColumns.filter(f=>f.columnVisible??true).sort((a,b)=>(b.columnOrder??0) - (a.columnOrder??0))
    },
  },
  data(){
    return{
      nextRowId:0,
      //校验结果：
      err:'',
      formCol:2,
      // 行表单弹窗
      dialogVisible:false,
      // 弹窗表单的标题
      dialogTitle:'',
      // 切换明细输入方式
      editInline:true,
      // 聚焦的行
      currentRow:0,
      row:null,
      plainRow:null,
      currentCol:'',
      sugarData:[]
    }
  },
  created(){
    const entries = this.filterColumns.map(item=>{
      return [item.key,undefined]
    })
    this.plainRow = Object.fromEntries(entries)
  },
  methods:{
    async init(tableData){
      this.sugarData.splice(0)
      tableData.forEach((item,index)=>{
        //如果是请求过来的数据，打上标记
        if(!item.hasOwnProperty('$sugarRowId')){
          //没有打上标记的数据，先执行filter再打上标记(数据流是循环的，filter只在初始化数据时生效)
          //!执行filter的位置
          //!如果初始化的数据没有tableColumns的字段，需要进行响应式注册
          for(const key in item){
            const col = this.filterColumns.find(col => col.key === key)
            if (_.get(col, 'filter')) {
              item[key] = col.filter(item[key])
            }
          }

        }
        //!vue2独特的响应式继承
        this.sugarData.push({...this.plainRow,...item,$sugarRowId:++this.nextRowId})
      })
    },
    add(){
      this.editInline ? this.handleAddRowInline() : this.handleAddRow()
    },
    tableUpdate(){
      //?将popover放在el-table，要记得删掉多余fixed图层
      // //清除自定义校验信息
      // this.err = {}
      // //删除el-table多余的图层
      // const popovers = this.$refs['popover'] || []
      // console.log(popovers.length);
      // if(popovers.length > 0){
      //   const len = this.tableColumns.length
      //   popovers.forEach((item,index)=>{
      //     if(index>=len){
      //       item.$destroy()
      //     }
      //   })
      // }
    },
    handleCopyRow(index){
      //实现向下复制的功能
      const row = {...this.sugarData[index],$sugarRowId:++this.nextRowId}
      this.sugarData.splice(index,0,row)
    },
    handleAddRow() {
      this.dialogVisible = true
      this.row = {$sugarRowId:++this.nextRowId}
    },
    handleAddRowInline() {
      this.sugarData.push({$sugarRowId:++this.nextRowId,...this.plainRow})
      this.currentRow = this.sugarData.length-1
    },
    handleEditRow(index) {
      this.dialogVisible = true
      this.currentRow = index
      this.dialogTitle = `你正在编辑第 ${index + 1} 个条码`
      this.row = {...this.sugarData[index]}
    },
    handleEditRowInline(row, column, cell, event) {
      setTimeout(()=>{
        const input = cell.querySelector('input')
        input && input.focus()
      })

      this.currentCol = column.property
      //?在行数据中找到 id，再根据 id 找 index
      this.currentRow = this.sugarData.findIndex(item => item.$sugarRowId === row.$sugarRowId)
    },

    handleDeleteRow(index) {
      this.sugarData.splice(index, 1)
    },
    handleSubmitRow() {
      // 判断逻辑
      this.$refs.SugarForm.validate().then(valid=>{
        if(valid){
          this.dialogVisible = false
          this.clearValidate()
          if (this.sugarData.filter(item => item.$sugarRowId === this.row.$sugarRowId).length > 0) {
            // 编辑逻辑
            // this.$modal.msg('你编辑了一个条码')
            this.$set(this.sugarData,this.currentRow,{...this.row})

          } else {
            // 提交逻辑
            // this.$modal.msg('你提交了一个条码')
            this.sugarData.push({...this.row})
            this.currentRow = this.sugarData.length - 1
          }
          this.row = {...this.plainRow}
        }
      }).catch(err=>{
        throw err
      })
    },
    validate(){
      //?要不，循环校验，每次校验一行，怎么样呢
       //?写法1
      let p = Promise.resolve(this.allowEmpty)
      this.currentRow = 0
      console.log(this.sugarData);

      this.sugarData.forEach((item,index)=>{
        p = p.then(()=>{
          console.log('1');
          return this.$refs.form.validate().then((value)=>{
            this.currentRow++
            console.log(this.currentRow);
            return value
          })
        })
      })

      return p.then(value=>{
        console.log(this.currentRow);
        if(!value){
          const msg = '明细不能为空'
          this.$modal.alert(msg)
          throw msg
        }
        this.clearValidate()
        return value
      }).catch(err=>{
        this.editInline = true
        Object.values(err).every(item=>{
          this.err = item[0].message
        })
        throw err
      })

    },
    defaultWidth(item){
      let width = 0
      switch(item.inputType){
        case 0:width='100px'; break
        case 1:width='100px'; break
        case 2:width='100px'; break
        case 3:width=undefined; break
        case 4:width=undefined; break
      }
      return width
    },
    clearValidate(){
      // this.$refs.SugarForm.clearValidate()
      // this.$refs.form.clearValidate()
      this.err=''
    }

  }
}
</script>

<style lang="scss" scoped>
@import '@style/sugar.scss';

::v-deep .el-table{
  .el-input__inner{
    padding:0;
    padding-left: 5px;
  }

  .el-table__cell .cell{
    padding:0;
    padding-left:5px;
    padding-right:5px;
  }

  .el-input-group__append{
    padding:0;
    padding-left:2px;
    padding-right:2px;
  }

  //table内的日期选择器隐藏前置图标
  .el-date-editor .el-input__prefix{
    display:none;
  }
}

</style>
