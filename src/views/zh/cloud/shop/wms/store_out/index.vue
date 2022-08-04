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
          v-tooltip:error="'审核100条数据请求超时'"
          type="warning"
          plain
          icon="el-icon-check"
          size="mini"
          :disabled="multiple"
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
      :table-columns="displayColumns"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="selection" label="选择" type="selection" width="55" />
      <el-table-column prop="operation" label="操作" align="center" class-name="small-padding fixed-width" fixed min-width="120px" width="120px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
        </template>
      </el-table-column>

      <el-table-column v-for="item in displayColumns" :key="item.id" :label="item.label" :align="item.align" :prop="item.key" :width="item.width" :tip="item.itp" :fixed="item.fixed" />

    </SugarTable>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20, 200, 300, 400]"
      :page.sync="pageNum"
      :limit.sync="pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { buildXlsx } from '@/utils/xlsx'
import SugarTable from '@/components/SugarTable'
import SugarForm from '@/components/SugarForm'
import { tableColumns, formLabel } from './data.js'
import { storeOutList, storeOutAudit } from '@api/wms/store_out'
export default {
  name: 'StoreOut',
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
      pageSize: 20,

      // 查询参数
      queryParams: {
        $billNo: null, //! 单号
        $relativeNo: null, //! 关联单号
        $outerNo: null, //! 外部单号
        customerName: null, //! 客户
        _dischargeDate: [], //! 日期
        startDate: null, //! 起始日期
        endDate: null, //! 结束日期
        $skuNo: null, //! 条码
        $shipNo: null, //! 柜号/批号
        $warehouseId: null, //! 仓库
        $positionId: null, //! 仓位
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
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      if (this.queryParams._dischargeDate) {
        [this.queryParams.startDate, this.queryParams.endDate] = this.queryParams._dischargeDate
      }

      storeOutList({
        data: this.queryParams,
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(res => {
        this.list = res.rows
        this.total = res.total
        this.loading = false
        this.queryParams.startDate = null
        this.queryParams.endDate = null
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
      this.$router.push({ name: 'StoreOutAdd' })
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

      buildXlsx([{ name: '出仓单列表', data: data }], '出仓单导出').then(res => {
        this.$modal.msgSuccess('导出成功')
      }).catch(err => {
        this.$modal.msgSuccess('导出失败', err)
      })
    },
    handleUpdate(row) {
      // 跳转到编辑页面，携带当前row的数据和dzid
      this.$router.push({
        name: 'StoreOutEdit',
        params: {
          row: row
        }
      })
    },
    handleAudit(row) {
      const data = this.list.filter(f => this.ids.includes(f.$billId))

      this.$modal.confirm(`是否确认审核${this.ids.length}条数据项`).then(() => {
        return storeOutAudit(data)
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

</style>
