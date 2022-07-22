<template>
  <div class="app-container">

    <SugarForm ref="SugarForm" class="filter-container" :form-label="formLabel" :form-data="queryParams" :form-col="formCol" size="medium">
      <div class="fr">
        <el-button class="filter-item" type="primary" @click="handleQuery">搜索</el-button>
        <el-button class="filter-item" @click="resetQuery">重置</el-button>
      </div>
    </SugarForm>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleEdit"
        >修改</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-check"
          size="mini"
          :disabled="multiple"
          class="error"
          @click="handleAudit"
        >审核</el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" :columns="tableColumns" @queryTable="getList" />
    </el-row>

    <SugarTable
      ref="sugarTable"
      :data="list"
      :loading="loading"
      size="medium"
      border
      @header-click="handleHeaderClick"
      @cell-click="handleCellClick"
      @selection-change="handleSelectionChange"
      @header-dragend="handleHeaderDragend"
    >
      <el-table-column prop="selection" label="选择" type="selection" width="55" />
      <el-table-column prop="operation" label="操作" align="center" class-name="small-padding fixed-width" fixed min-width="120px" width="120px">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['zhcloud:shop:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <!-- <el-button
            v-hasPermi="['zhcloud:shop:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button> -->
        </template>
      </el-table-column>

      <el-table-column v-for="item in displayColumns" :key="item.id" :label="item.label" :align="item.align" :prop="item.prop" :width="item.width" :tip="item.itp" :fixed="item.fixed" />

    </SugarTable>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[100, 200, 300, 400]"
      :page.sync="pageNum"
      :limit.sync="pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import SugarTable from '@/components/SugarTable'
import SugarForm from '@/components/SugarForm'
import { tableColumns, formLabel } from './data.js'
import { storeInList, storeInAudit } from '@/api/zh/cloud/wms/store_in'
import _ from 'lodash'
export default {
  name: 'StoreIn',
  components: {
    SugarTable,
    SugarForm
  },
  beforeRouteEnter(to, from, next) {
    // 疑问：为什么没有进beforeRouteUpdate
    // console.log('enter')
    next(vc => {
      if (to.params.refresh) {
        vc.getList()
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    // console.log('leave')
    next()
  },
  beforeRouteUpdate(to, from, next) {
    // console.log('update')
    next()
  },
  data() {
    return {
      // 查询表单的列数
      formCol: 12,
      // 渲染查询表单字段
      formLabel: formLabel,
      // 渲染SugarEditTable需要
      tableColumns: tableColumns,
      // 数据表格
      list: [],
      // pagination
      total: 0,
      pageNum: 1,
      pageSize: 100,

      // 查询参数
      queryParams: {
        $billNo: null, //! 单号
        $relativeNo: null, //! 关联单号
        $outerNo: null, //! 外部单号
        customerName: null, //! 客户
        _receiptDate: [], //! 日期
        startDate: null, //! 起始日期
        endDate: null, //! 结束日期
        $skuNo: null, //! 条码
        $shipNo: null, //! 柜号/批号
        warehouse: null, //! 仓库
        position: null, //! 仓位
        verify: null, //! 审核状态
        plateNumber: null//! 车牌
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true
    }
  },
  computed: {
    displayColumns() {
      return this.tableColumns.filter(item => item.visible)
    }
  },
  watch: {
    // 'queryParams.warehouse'(val) {
    //   this.queryParams.position = null
    //   const warehouseId = this.queryParams.warehouse
    //   if (warehouseId) {
    //     warehousePositions(warehouseId).then(res => {
    //       const data = res.data
    //       this.formLabel.find(item => item.key === 'position').options = data.map(item => ({ label: item.position, value: item.$positionId }))
    //     })
    //   }
    // }
  },
  mounted() {
    this.getList()
  },
  // ? 分析比写代码更重要

  // ?将表单做成组件以后：表单项的交互称为了问题
  // ?表单项之间的交互，是以当前views作为作用域
  // ?表单项的渲染是通过formLabel来渲染
  // ?formLabel的初始配置由data.js给出
  // ? 而formLabel在传递给子组件之前，需要为其绑定表单项之间的交互：例如延迟获取的下拉框选项，按钮打开dialog等
  // ? 不难的是，交互的方法都放在了methods中

  methods: {
    getList() {
      this.loading = true
      if (this.queryParams._receiptDate) {
        [this.queryParams.startDate, this.queryParams.endDate] = this.queryParams._receiptDate
      }

      storeInList({
        data: this.queryParams,
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(res => {
        this.list = res.rows
        this.total = res.total
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
      this.ids = selection.map(item => item.$billId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.$router.push({ name: 'StoreInAdd' })
    },
    /** 修改按钮操作 */
    // handleEdit(row) {
    //   this.$router.push({ name: 'EditStoreIn' })
    // },
    /** 删除按钮操作 */
    // handleDelete(row) {
    //   // const ids = row.id || this.ids
    // },
    /** 导出按钮操作 */
    handleExport() {
      // this.$modal.msg('导出功能')
    },
    // summary({ data }) {
    //   console.log('summary')
    //   return [undefined, undefined, undefined, undefined, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2]
    // },
    handleUpdate(row) {
      // 跳转到编辑页面，携带当前row的数据和dzid
      this.$router.push({
        name: 'StoreInEdit',
        params: {
          row: row
        }
      })
    },
    handleCellClick(row, column, cell, event) {
      // console.log('你点击了cell')
    },
    handleHeaderClick(column, event) {
      // console.log('你点击了头')
    },
    handleHeaderDragend(newWidth, oldWidth, column, event) {
      // console.log('你拖动了表头')
    },
    handleAudit(row) {
      const data = this.list.filter(f => {
        return this.ids.includes(f.$billId)
      })

      this.$modal.confirm(`是否确认审核${this.ids.length}条数据项`).then(() => {
        return storeInAudit(data)
      }).then(res => {
        this.getList()
        this.$modal.msgSuccess(`批量审核成功，共${this.ids.length}项`)
      }).catch(err => {
        this.$modal.msgError(`批量审核失败`, err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/sugar.scss";
// ? 分析比写代码更重要
// ? el-table 是全局引入的，给 el-table 添加样式，不能使用 scoped
// ? 组件样式如果不使用 scoped，会造成全局样式污染
//? ::v-deep 在 scoped 下给 el 组件添加样式

</style>
