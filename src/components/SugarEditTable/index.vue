<template>
<div>
  <!-- 表单对话框 -->
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
    <SugarForm ref="SugarForm" :form-label="tableColumns" :form-data="row" :form-col="formCol" size="small"></SugarForm>
  </el-dialog>

  <!-- 表格 -->
  <el-card class="little-margin-top" shadow="never">
    <div v-show="editMode" class="card-padding card-title">
      <el-button type="info" @click="editInline?handleAddRowInline():handleAddRow()">{{ editInline?"添加编辑行":"进入表单录入" }}</el-button>
    </div>

    <!-- 用来提示校验的气泡 -->
    <el-popover trigger="manual" :value="Boolean(err)" placement="top">
      <!-- 表单域，校验域是一行 -->
      <el-form  slot="reference" ref="form" :model="tableData[currentRow]" :rules="rules" :size="size">
      <el-table :data="tableData" border fit :size="size" @cell-click="handleEditRowInline" row-key="$sugarRowId" @hook:updated="tableUpdate">
        <!-- <el-table-column>
          <input type="text">
        </el-table-column> -->
        <el-table-column prop="operation" label="操作" align="center" class-name="small-padding fixed-width" min-width="130px" width="130px">
          <template slot="header" slot-scope="scope">
            <el-switch v-model="editInline" inactive-text="编辑模式" />
          </template>
          <template slot-scope="scope">
            <el-button
              v-show="!editInline"
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
          </template>
        </el-table-column>
        <el-table-column v-for="(item) in filterColumns" :key="item.key" :label="item.label" :align="item.align" :prop="item.key" :width="item.width?item.width:defaultWidth(item)" :fixed="item.fixed" :header-align="item.headerAlign?item.headerAlign:'center'" >
          <template slot-scope="scope">
            <div v-show="editInline && currentRow===scope.$index" >
              <el-form-item :prop="item.key" >
                <SugarTypeIn :short-holder='true' :no-label="true" :form-item="item" :value="tableData[scope.$index]" ></SugarTypeIn>
              </el-form-Item>
            </div>
            <div v-show="!(editInline && currentRow===scope.$index)">
              <span v-if="item.align==='center'">{{ scope.row[item.key] }}</span>
              <span v-else-if="item.inputType === 1">
                {{getLabel(scope.$index,item.key)}}
              </span>
              <span v-else style="padding-left:15px;padding-right:20px;display:flex;justify-content:space-between;">
                  <span>{{tableData[scope.$index][item.key]}}</span>
                  <span>{{item.unit}}</span>
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      </el-form>
      <span style="color:red">{{err}}</span>
    </el-popover>
  </el-card>
</div>
</template>

<script>
import SugarTypeIn from '@/components/SugarTypeIn'
import SugarForm from '@/components/SugarForm'
import _ from 'lodash'

let row = null
export default {
  name:'sugarEditTable',
  components:{
    SugarTypeIn,
    SugarForm,
  },
  props:{
    tableData:Array,
    tableColumns:Array,
    editMode:{
      type:Boolean,
      default:true
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
    tableData:{
      deep:true,
      handler(list){
        list.forEach(item=>{
          //如果是请求过来的数据，打上标记
          if(!item.hasOwnProperty('$sugarRowId')){
            //没有打上标记的数据，先执行filter再打上标记(数据流是循环的，filter只在初始化数据时生效)
            //!执行filter的位置
            for(const key in item){
              const col = this.tableColumns.find(col => col.key === key)
              if (_.get(col, 'filter')) {
                item[key] = col.filter(item[key])
              }
            }
            item.$sugarRowId = ++this.nextRowId
          }
        })
      }
    }
  },
  computed:{
    rules(){
      const entries = this.tableColumns.map(item=>[item.key,item.rule])
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
      editInline:false,
      // 聚焦的行
      currentRow:0,
      row:null,
      currentCol:''
    }
  },
  created(){
    const entries = this.tableColumns.map(item=>{
      return [item.key,undefined]
    })
    row =  Object.fromEntries(entries)
  },
  methods:{
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
    handleAddRow() {
      this.dialogVisible = true
      this.row = Object.assign({$sugarRowId:++this.nextRowId}, row)
    },
    handleAddRowInline() {
      this.tableData.push(Object.assign({$sugarRowId:++this.nextRowId}, row))
      this.currentRow = this.tableData.length-1
    },
    handleEditRow(index) {
      this.dialogVisible = true
      this.currentRow = index
      this.dialogTitle = `你正在编辑第 ${index + 1} 个条码`
      this.row = Object.assign({},this.tableData[index])
    },
    handleEditRowInline(row, column, cell, event) {
      setTimeout(()=>{
        const input = cell.querySelector('input')
        input && input.focus()
      })

      this.currentCol = column.property
      //?在行数据中找到 id，再根据 id 找 index
      this.currentRow = this.tableData.findIndex(item => item.$sugarRowId === row.$sugarRowId)
    },

    handleDeleteRow(index) {
      this.tableData.splice(index, 1)
    },
    handleSubmitRow() {
      // 判断逻辑
      this.$refs.SugarForm.validate().then(valid=>{
        if(valid){
          this.dialogVisible = false
          if (this.tableData.filter(item => item.$sugarRowId === this.row.$sugarRowId).length > 0) {
            // 编辑逻辑
            this.$modal.msg('你编辑了一个条码')
            this.$set(this.tableData,this.currentRow,this.row)
            this.$modal.msg(this.currentRow)

            this.row = row
          } else {
            // 提交逻辑
            this.$modal.msg('你提交了一个条码')
            this.tableData.push(this.row)
            this.row = row
            this.currentRow = this.tableData.length-1
          }
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

      this.tableData.forEach((item,index)=>{
        p = p.then(()=>{
          return this.$refs.form.validate().then((value)=>{
            this.currentRow++
            return value
          })
        })
      })

      return p.then(value=>{
        if(!value){
          const msg = '明细不能为空'
          this.$modal.alert(msg)
          throw msg
        }
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
        case 0:width='120px'; break
        case 1:width='150px'; break
        case 2:width='160px'; break
        case 3:width=undefined; break
        case 4:width=undefined; break
      }
      return width
    },
    getLabel(index,key){
      return _.get(this.tableData,`[${index}][${key}].label`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@style/sugar.scss';

</style>
