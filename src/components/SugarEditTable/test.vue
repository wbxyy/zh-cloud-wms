<template>
<div>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    @close="$refs.sugarForm.clearValidate()"
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
    <SugarForm ref="SugarForm" :form-label="tableColumns" :form-data="row" :form-col="formCol" size="mini"></SugarForm>
  </el-dialog>

  <el-card class="card-container" shadow="never">
    <div class="card-padding card-title">
      <el-button type="info" @click="editInline?handleAddRowInline():handleAddRow()">{{ editInline?"添加编辑行":"进入表单录入" }}</el-button>
    <!-- <span v-show="editInline">——双击行进行编辑</span> -->
    </div>

    <el-form ref="form" :model="tableData[currentRow]" :rules="rules" size="mini">
      <el-table :data="tableData" border fit size="mini" @cell-click="handleEditRowInline" row-key="id" @hook:updated="tableUpdate">
        <!-- <el-table-column>
          <input type="text">
        </el-table-column> -->
        <el-table-column prop="operation" label="操作" align="center" class-name="small-padding fixed-width" fixed min-width="130px" width="130px">
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
        <el-table-column v-for="(item) in tableColumns" :key="item.key" :label="item.label" :align="item.align" :prop="item.key" :width="item.width?item.width:defaultWidth(item)" :fixed="item.fixed" :header-align="item.headerAlign?item.headerAlign:'center'" >
          <template slot-scope="scope">
            <div v-if="editInline && currentRow===scope.$index" >
              <el-popover  placement="top-start" trigger="manual" :value="Boolean(err[item.key])" ref="popover" >
                <div slot="reference">
                  <el-form-item :prop="item.key" >
                    <SugarTypeIn :short-holder='true' :no-label="true" :form-item="item" :value="tableData[scope.$index][item.key]" @update:value="tableData[scope.$index][item.key] = $event"></SugarTypeIn>
                  </el-form-Item>
                </div>
                <span>{{err[item.key]}}</span>
              </el-popover>

            </div>
            <div v-else>
              <span v-if="item.align==='center'">{{ scope.row[item.key] }}</span>
              <span v-else style="padding-left:15px;padding-right:20px;display:flex;justify-content:space-between;">
                <span>{{ scope.row[item.key] }}</span>
                <span>{{item.unit}}</span>
              </span>
            </div>

          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </el-card>
</div>
</template>

<script>
import SugarFieldsetCard from '@/components/SugarFieldsetCard'
import SugarTypeIn from '@/components/SugarTypeIn'
import SugarTestForm from '@/components/SugarForm/test.vue'
import SugarForm from '@/components/SugarForm'
import SugarEditCell from '@/components/SugarEditCell'
let row = null
let id = 0
const destroyId = []
export default {
  name:'sugarEditTable',
  components:{
    SugarFieldsetCard,
    SugarTypeIn,
    SugarTestForm,
    SugarForm,
    SugarEditCell
  },
  props:['tableData','tableColumns'],
  computed:{
    rules(){
      const entries = this.tableColumns.map(item=>[item.key,item.rule])
      return Object.fromEntries(entries)
    }
  },
  data(){
    return{

      //校验结果：
      err:{},
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
      currentCol:''
    }
  },
  created(){
    const entries = this.tableColumns.map(item=>[item.key,undefined])
    row =  Object.fromEntries(entries)
  },
  methods:{
    tableUpdate(){
      //清除自定义校验信息
      this.err = {}
      //删除el-table多余的图层
      const popovers = this.$refs['popover'] || []
      console.log(popovers.length);
      if(popovers.length > 0){
        const len = this.tableColumns.length
        popovers.forEach((item,index)=>{
          if(index>=len){
            item.$destroy()
          }
        })
      }
    },
    handleAddRow() {
      this.dialogVisible = true
      this.row = Object.assign({id:++id}, row)
    },
    handleAddRowInline() {
      this.tableData.push(Object.assign({id:++id}, row))
      this.currentRow = this.tableData.length-1
    },
    handleEditRow(index) {
      this.dialogVisible = true
      this.currentRow = index
      this.dialogTitle = `你正在编辑第 ${index + 1} 个条码`
      this.row = Object.assign({},this.tableData[index])
    },
    handleEditRowInline(row, column, cell, event) {
      // console.log(column);

      this.currentCol = column.property
      this.currentRow = this.tableData.findIndex(item => item.id === row.id)
    },



    handleDeleteRow(index) {
      this.tableData.splice(index, 1)
    },
    handleSubmitRow() {
      // 判断逻辑
      this.$refs.SugarForm.validate().then(valid=>{
        if(valid){
          this.dialogVisible = false
          if (this.tableData.filter(item => item.id === this.row.id).length > 0) {
            // 编辑逻辑
            this.$modal.msg('你编辑了一个条码')
            this.tableData[this.currentRow] = this.row
            this.row = null
          } else {
            // 提交逻辑
            this.$modal.msg('你提交了一个条码')
            this.tableData.push(this.row)
            this.row = null
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
      let p = Promise.resolve(true)
      this.currentRow = 0

      this.tableData.forEach((item,index)=>{
        p = p.then(()=>{
          return this.$refs.form.validate().then((value)=>{
            this.currentRow++
            return value
          })
        })
      })


      p.then(value=>{
        console.log(value);
      }).catch(err=>{
        console.log(err);
        const my_err = {}
        Object.keys(err).forEach(key=>{
          my_err[key] = err[key][0].message
        })
        this.err = my_err
        console.log(this.err);
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@style/sugar.scss';

</style>
