<template>
  <div class="app-container">

    <el-card shadow="never" class="mb10">
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

    <el-row :gutter="10" class="mb10">
      <el-col :span="1.5">
        <el-button @click="dialogCustomer = true">选择客户和仓库</el-button>
      </el-col>
    </el-row>

    <SugarForm
      ref="SugarForm"
      class="filter-container"
      :form-label="formLabel"
      :form-data.sync="formData"
      :form-col="formCol"
    >
      <div class="fr filter-item">
        <el-button @click="handleReset">重置</el-button>
      </div>
    </SugarForm>

    <!-- 批量选择仓位start -->
    <el-row :gutter="10" class="mb10">
      <el-col :span="1.5">
        <el-button v-show="submitData.$warehouseId_n" @click="dialogStockShow">选择库存</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button v-show="list.length>0" @click="dialogPositionShow">批量选新仓位</el-button>
      </el-col>
    </el-row>

    <SugarEditTable
      ref="SugarEditTable"
      class="mb10"
      :table-data.sync="list"
      :table-columns="tableColumns"
    />

    <div class="footer mb10">
      <el-button size="medium" type="warning" @click="handleSubmit">提交调仓单</el-button>
    </div>

    <CustomerDialog :visible.sync="dialogCustomer" @selectCustomer="handleSelectCustomer" />

    <PositionDialog :visible.sync="dialogPosition" :params="positionParams" @selectPosition="handleSelectPosition" />

    <StockDialog :visible.sync="dialogStock" :params="stockParams" @confirmStock="confirmStock" />

  </div>
</template>

<script>
import { formLabel, tableColumns } from './data'
import { storeMoveCreate } from '@api/wms/store_move'
import { positionsStoreInOptions } from '@api/wms/preFetch'
import SugarForm from '@/components/SugarForm'
import SugarEditTable from '@/components/SugarEditTable'
import CustomerDialog from './components/CustomerDialog'
import PositionDialog from './components/PositionDialog'
import StockDialog from './components/StockDialog'
import _ from 'lodash'

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
      formData: {},
      formLabel: formLabel,
      tableColumns: tableColumns,
      dialogCustomer: false,
      dialogPosition: false,
      dialogStock: false,
      stockParams: null,
      positionParams: null,
      submitData: {}
    }
  },
  methods: {
    //! 对话框发射回来的事件
    handleSelectCustomer(row) {
      // 需要在customer中拿到哪些数据呢

      // khmc 客户名 对应row的khmc
      // khmcid 客户id 对应row的khid
      // spckidn 新仓库id  对应 row 的 spckid
      // spcwidn 仓位id 不用填
      // dzbz 备注 formData里的
      // dzrb 选项 formData里的
      // khlk 商城 对应row的shop

      this.dialogCustomer = false

      this.submitData.customerName = row.customerName
      this.submitData.$customerId = row.$customerId
      this.submitData.$warehouseId_n = row.$warehouseId
      this.submitData.shop = row.shop

      // 从客户对话框拿到客户名，客户ID，仓库名，仓库Id，shop
      const { customerName, warehouse } = row
      // 赋值给表单
      Object.assign(this.formData, { customerName, warehouse })
      // 清空列表
      this.$refs.SugarEditTable.init([])
      // 仓位下拉选项
      this.tableColumns.find(item => item.key === '$positionId_2').options = positionsStoreInOptions(row.$warehouseId)
    },
    //! 对话框发射回来的事件(批量选仓位)
    handleSelectPosition(row) {
      this.dialogPosition = false
      // 从仓位对话框拿到仓位，仓位ID
      this.submitData.$positionId_n = row.$positionId

      // 重新设置list中的仓位
      this.list.forEach(item => {
        item.$movePositionId = {
          label: row.position,
          value: row.$positionId
        }
      })
    },
    dialogPositionShow() {
      // 设置仓位的param
      this.dialogPosition = true
      this.positionParams = {
        $warehouseId: this.submitData.$warehouseId_n
      }
    },
    dialogStockShow() {
      this.dialogStock = true
      this.stockParams = {
        $warehouseId: this.submitData.$warehouseId_n
      }
      this.$set(this.stockParams, 'list', _.cloneDeep(this.list))
    },
    confirmStock(data) {
      this.dialogStock = false
      this.dialogCustomer = false
      this.$refs.SugarEditTable.init(this.list.concat(data))
    },
    handleSubmit() {
      Promise.all([this.$refs.SugarForm.validate(), this.$refs.SugarEditTable.validate()]).then(values => {
        if (values.every(truly => truly)) {
          const data = {
            list: this.list,
            ...this.submitData,
            ...this.formData
          }
          this.$modal.loading('正在添加调仓...')
          return storeMoveCreate(data)
        }
      }).then(res => {
        if (!res) return this.$modal.alert('添加调仓单失败，联系....')
        this.$modal.alert('添加调仓单成功')
        // ?清空表单
      }).catch(err => {
        console.error('坐标：提交调仓单', err)
      }).finally(res => {
        this.$modal.closeLoading()
        return res
      })
    },
    handleReset() {
      this.$refs.SugarForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/sugar.scss';

</style>
