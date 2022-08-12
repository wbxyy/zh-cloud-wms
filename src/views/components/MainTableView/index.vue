<template>
<div>
  <!-- 标题start(title) -->
    <el-card shadow="never" v-show="title" class="mb10">
      <div class="card-title card-padding">
        <div class="card-info">
          <i class="el-icon-tickets" />
          <span v-if="title">{{title}}</span>
        </div>
        <div class="card-opt">
          <span>选择表单布局</span>
          <el-select v-model="formCol">
            <el-option :label="`宽`" :value="2" />
            <el-option :label="`中`" :value="6" />
            <el-option :label="`窄`" :value="12" />
          </el-select>
        </div>
      </div>
    </el-card>
  <!-- 标题end -->

  <!-- 搜索区start(formLabel) -->
  <SugarForm ref="SugarForm" v-show="showSearch" class="filter-container" :form-label="formLabel" :form-data.sync="plainParams" :form-col="formCol" size="medium">
    <slot name="formButton">
      <div class="fr" v-if="showSearch">
        <el-button class="filter-item" type="primary" @click="handleQuery">搜索</el-button>
        <el-button class="filter-item" @click="resetQuery">重置</el-button>
      </div>
    </slot>
  </SugarForm>
  <!-- 搜索区end -->

  <!-- 操作栏start(tableColumns,fetch) -->
  <el-row :gutter="10" class="mb10" v-if="$slots.button">
    <slot name="button"></slot>
    <right-toolbar
    @handleExport="handleExport"
    :show-search.sync="showSearch"
    :columns="columns"
    @queryTable="getList" />
  </el-row>

  <!-- 操作栏end -->


  <!-- 表格start(tableColumns) -->
  <SugarTable
    ref="sugarTable"
    :data="list"
    :loading="loading"
    :table-columns="displayColumns"
    size="medium"
    border
    @selection-change="handleSelectionChange"
  >
    <el-table-column v-if="showSelection" prop="selection" label="选择" type="selection" width="55" />
    <el-table-column v-if="$scopedSlots.operation" prop="operation" label="操作" align="center" class-name="small-padding fixed-width" fixed min-width="120px" width="120px">
      <template slot-scope="scope">
        <slot name="operation" v-bind="scope"></slot>
      </template>
    </el-table-column>
    <el-table-column v-for="item in displayColumns" :key="item.id" :label="item.label" :align="item.align" :prop="item.key" :width="item.width || '100px'" :fixed="item.fixed" >
      <template slot="header" slot-scope="scope">
        <div v-tooltip="item.message" v-tooltip:error="item.error">{{item.label}}</div>
      </template>
    </el-table-column>
  </SugarTable>
  <!-- 表格end -->

  <!-- 分页start(fetch) -->
  <pagination
    v-show="total>0"
    :total="total"
    :page-sizes="[15, 30, 50, 200, 300, 400]"
    :page.sync="pageNum"
    :limit.sync="pageSize"
    @pagination="getList"
  />
  <!-- 分页end -->


</div>
</template>

<script>
import { buildXlsx } from '@/utils/xlsx'
import SugarTable from '@/components/SugarTable'
import SugarForm from '@/components/SugarForm'
export default {
  name:'MainTableView',
  components:{
    SugarTable,
    SugarForm
  },
  data(){
    return {
      plainParams:{...this.formData},
      formCol:12,
      pageNum:1,
      pageSize:15,
      showSearch: true,
      multiple: true,
      single: true,
      ids:[],
      list:[],
      total:0,
      loading:true,
      columns:this.tableColumns
    }
  },
  props:{
    formData:{
      type:Object,
      default:()=>{}
    },
    showSelection:{
      type:Boolean,
      default:true
    },
    showOperation:{
      type:Boolean,
      default:true
    },
    title:{
      type:String,
      default:''
    },
    formLabel:{
      type:Array,
      required:true
    },
    tableColumns:{
      type:Array,
      required:true
    },
    queryParams:{
      type:Object,
      default(){
        return {}
      }
    },
    qs:{
      type:Object,
      default(){
        return {}
      }
    },
    fetch:{
      type:Function,
      required:true
    },
    rowKey:{
      type:String,
      default:'id'
    }
  },
  mounted(){
    this.getList()
  },
  computed: {
    displayColumns() {
      return this.columns.filter(item => item.visible ?? true)
    },
  },
  methods:{
    //拆分属性(dataRange)
    dateRangeParams(){
      const params = {}
      this.formLabel.forEach(item=>{
        const value = this.plainParams[item.key]
        if(item.inputType===2 && value){
          if(Array.isArray(item.splitParams)){
            const [value1,value2]= value
            const [key1,key2] = item.splitParams
            params[key1] = value1
            params[key2] = value2
          }else{
            throw new Error('splitParams expect type of Array')
          }
        }
      })
      return params
    },
    getList(){
      //getList中找不到fetch就退出
      if(typeof this.fetch !== 'function') return
      this.loading = true
      const dateRangeParams = this.dateRangeParams()
      const data = Object.assign({},this.plainParams,this.queryParams,dateRangeParams)
      const params = Object.assign({
        pageNum:this.pageNum,
        pageSize:this.pageSize
      })
      if(Object.keys(this.qs).length > 0){
        Object.assign(params,this.plainParams,this.qs)
      }
      //params 和 data
      this.fetch({
        data,
        params
      }).then(res=>{
        console.log(res);
        const {data,rows,total} = res
        this.list = rows || data
        this.total = total || 0
        this.loading = false
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$refs.SugarForm.resetFields()
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange({ selection }) {
      this.ids = selection.map(item => item[this.rowKey])
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 导出按钮操作 */
    handleExport() {
      // 拿到表头
      if (!this.ids.length) {
        return this.$modal.msgWarning('请勾选导出的数据')
      }
      // 导出数据要和表格一致
      const data = this.list.filter(f => this.ids.includes(f.$billId)).map(item => this.displayColumns.map(column => item[column.key]))

      data.unshift(this.displayColumns.map(m => m.label))

      buildXlsx([{ name: '列表', data: data }], '导出').then(res => {
        this.$modal.msgSuccess('导出成功')
      }).catch(err => {
        this.$modal.msgSuccess('导出失败', err)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/sugar.scss";

</style>
