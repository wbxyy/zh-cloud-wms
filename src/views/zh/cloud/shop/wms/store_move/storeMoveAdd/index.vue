<template>
  <div class="app-container">
    <!-- 标题start -->
    <el-card shadow="never">
      <div class="card-title card-padding">
        <div class="card-info">
          <i class="el-icon-tickets" />
          <span>创建调仓单</span>
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

    <!-- 表单start -->
    <SugarForm
      ref="SugarForm"
      class="little-margin-top filter-container"
      :form-label="formLabel"
      :form-data="formData"
      :form-col="formCol"
      :method-obj="methodObj"
    >
      <div class="fr filter-item">
        <el-button @click="handleReset">重置</el-button>
      </div>
    </SugarForm>
    <!-- 表单end -->

    <!-- 表格start -->
    <SugarEditTable
      ref="SugarEditTable"
      :table-data="list"
      :table-columns="tableColumns"
    />
    <!-- 表格end -->

    <!-- footer_start -->
    <div class="footer little-margin-top">
      <el-button size="medium" type="warning" @click="handleSubmit">提交调仓单</el-button>
    </div>
    <!-- footer_end -->

    <!--录入客户和仓库start -->
    <CustomerDialog :visible.sync="dialogCustomer" @selectCustomer="handleSelectCustomer" />
    <!-- 录入客户和仓库end -->

    <!-- 录入仓位start -->
    <PositionDialog :visible.sync="dialogPosition" :params="positionParams" @selectPosition="handleSelectPosition" />
    <!-- 录入仓位end -->

    <!-- 录入库存start -->
    <StockDialog :visible.sync="dialogStock" :params="stockParams" @selectStock="handleSelectStock" @confirmStock="confirmStock" />
    <!-- 录入库存end -->

  </div>
</template>

<script>
import { formLabel, tableColumns } from './data'
import { storeOutCreate } from '@api/wms/store_out'
import SugarForm from '@/components/SugarForm'
import SugarEditTable from '@/components/SugarEditTable'
import CustomerDialog from './components/CustomerDialog'
import PositionDialog from './components/PositionDialog'
import StockDialog from './components/StockDialog'
import _ from 'lodash'
const formData = {
  btnCustomerWarehouse: null, // 按钮
  customerName: null, //! 客户名#
  warehouse: null,
  $warehouseId: null,
  position: null,
  $positionId: null,
  $newPositionId: null,
  $customerId: null, //! 客户id
  stock: null, //! 库存
  movingType: null, //! 调仓类型
  billRemark: null, //! 单证备注✔#
  list: []//! 入仓条码明细
}
export default {
  name: 'StoreMoveAdd',
  components: {
    SugarForm,
    SugarEditTable,
    CustomerDialog,
    PositionDialog,
    StockDialog
  },
  data() {
    return {
      // 响应式渲染表单时，el-row的初始列数
      formCol: 12,
      // 遮罩层
      loading: true,
      // 明细
      list: [],
      formData: Object.assign({}, formData),
      formLabel: formLabel,
      tableColumns: tableColumns,
      dialogCustomer: false,
      dialogPosition: false,
      dialogStock: false,
      stockParams: null,
      positionParams: null
    }
  },
  computed: {
    // SugarForm方法映射
    methodObj() {
      return {
        customerName: {
          click: this.customerSelect
        },
        position: {
          click: this.positionSelect
        },
        stock: {
          click: this.stockSelect
        }
      }
    }
  },
  methods: {
    //! 对话框发射回来的事件
    handleSelectCustomer(row) {
      this.dialogCustomer = false
      const { customerName, $customerId, warehouse, $warehouseId } = row
      Object.assign(this.formData, { customerName, $customerId, warehouse, $warehouseId })
    },
    handleSelectPosition(row) {
      this.dialogPosition = false
      const { position, $positionId } = row
      Object.assign(this.formData, { position, $positionId, $newPositionId: $positionId })
    },

    handleSelectStock(data) {
      // 将选中的数据赋值给list
      this.list = data
    },
    //! 按钮事件
    customerSelect() {
      this.dialogCustomer = true
    },
    positionSelect() {
      // 设置仓位的param
      this.dialogPosition = true
      this.positionParams = Object.assign({}, this.formData)
    },
    stockSelect() {
      this.dialogStock = true
      this.stockParams = Object.assign({}, this.formData)
    },
    confirmStock(data) {
      this.dialogStock = false
      this.dialogCustomer = false
      this.list = this.list.concat(data)
    },
    handleSubmit() {
      Promise.all([this.$refs.SugarForm.validate(), this.$refs.SugarEditTable.validate()]).then(values => {
        if (values.every(truly => truly)) {
          this.formData.list = this.list
          return storeOutCreate(this.formData)
        }
      }).then(res => {
        if (!res) return this.$modal.alert('添加出仓单失败，联系....')
        this.$modal.alert('添加出仓单成功')
        // ?清空表单
      }).catch(err => {
        console.error('坐标：提交出仓单', err)
      })
    },
    handleReset() {
      this.formData = Object.assign({}, formData)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/sugar.scss';

</style>
