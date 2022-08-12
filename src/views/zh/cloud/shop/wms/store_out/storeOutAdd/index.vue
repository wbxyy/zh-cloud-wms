<template>
  <div class="app-container">
    <!-- 标题start -->
    <el-card shadow="never" class="mb10">
      <div class="card-title card-padding">
        <div class="card-info">
          <i class="el-icon-tickets" />
          <span>创建出仓单</span>
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
      class="mb10 filter-container"
      :form-label="formLabel"
      :form-data.sync="formData"
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
      class="mb10"
      :table-data.sync="list"
      :table-columns="tableColumns"
    />
    <!-- 表格end -->

    <!-- footer_start -->
    <div class="footer">
      <el-button v-tooltip:error="'库存不够也能出仓'" size="medium" type="warning" @click="handleSubmit">提交出仓单</el-button>

    </div>
    <!-- footer_end -->

    <!-- 选择客户的弹窗start -->
    <CustomerDialog
      :visible.sync="dialogCustomer"
      @fetchStock="stockSelect"
    />
    <!-- 选择客户的弹窗end -->

    <!-- 选择库存的弹窗start -->
    <StockDialog
      ref="stockDialog"
      :visible.sync="dialogStock"
      :params="stockParam"
      @confirmStock="confirmStock"
    />
    <!-- 选择库存的弹窗end -->

  </div>
</template>

<script>
import { parallelPromise, sequentialPromise } from '@/utils/sugar'
import { formLabel, tableColumns } from './data'
import { storeOutCreate } from '@api/wms/store_out'
import CustomerDialog from './components/CustomerDialog'
import StockDialog from './components/StockDialog'
import SugarForm from '@/components/SugarForm'
import SugarEditTable from '@/components/SugarEditTable'
import _ from 'lodash'
// const formData = {
//   customerName: null, //! 客户名#
//   $customerId: null, //! 客户id
//   stock: null, //! 库存
//   $outerNo: null, //! 外部单号✔#
//   plateNumber: null, //! 车牌✔#
//   linkman: null, //! 联系人✔#
//   phone: null, //! 电话✔#
//   identity: null, //! 身份证✔#
//   realSettlement: null, //! 配送方式#
//   billRemark: null, //! 单证备注✔#
//   stevedorage: `1`, //! 装卸费(1代表inactive)✔#
//   workingOut: `1`, //! 作业量(1代表inactive)✔#
//   shop: null,
//   list: []//! 入仓条码明细
// }
const submitData = {
  $customerId: null, //! 客户id
  shop: null
}
export default {
  name: 'StoreOutAdd',
  components: {
    SugarForm,
    SugarEditTable,
    CustomerDialog,
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
      dialogStock: false,
      stockParam: null
    }
  },
  computed: {
    // SugarForm方法映射
    methodObj() {
      return {
        customerName: {
          click: this.dialogCustomerShow
        },
        stock: {
          click: this.dialogStockShow
        }
      }
    }
  },
  methods: {
    stockSelect(row) {
      // 给表单中的客户信息赋值
      submitData.$customerId = row.$customerId
      submitData.shop = row.shop
      this.formData.customerName = row.customerName

      // 给库存接口的请求参数赋值
      this.stockParam = {
        customerName: row.customerName,
        $customerId: row.$customerId
      }
      this.dialogStock = true
    },
    dialogStockShow() {
      if (!_.get(submitData, '$customerId')) {
        return this.$modal.msgError('请先选择客户')
      }
      this.dialogStock = true
      // ? 这里的$set
      this.$set(this.stockParam, 'list', _.cloneDeep(this.list))
    },
    dialogCustomerShow() {
      this.dialogCustomer = true
    },
    confirmStock(data, append) {
      this.dialogStock = false
      this.dialogCustomer = false
      // ? data中没有number这个字段
      // ? 这里的number，已经注册在tableColumns中，应该实现不用$set也能完成响应式
      // data.forEach(item => {
      //   this.$set(item, 'number')
      // })
      if (append) {
        this.$refs.SugarEditTable.init(this.list.concat(data))
      } else {
        this.$refs.SugarEditTable.init(data)
      }
    },
    goBack() {
      this.$tab.closePage({ path: '/wms/store_out/add', name: 'StoreOutAdd' }).then(res => {
        this.$router.push({
          path: '/wms/storeOut'
        })
      })
    },
    handleSubmit() {
      Promise.all([this.$refs.SugarForm.validate(), this.$refs.SugarEditTable.validate()]).then(values => {
        if (values.every(truly => truly)) {
          const data = {
            list: this.list,
            ...this.formData,
            ...submitData
          }
          this.$modal.loading('提交新增中...')
          return storeOutCreate(data)
        }
      }).then(res => {
        if (!res) return this.$modal.alert('添加出仓单失败，联系....')
        this.$modal.confirm('添加成功').then(res => {
          this.goBack()
        })
        // ?清空表单
      }).catch(err => {
        console.error('坐标：提交出仓单', err)
      }).finally(() => {
        this.$modal.closeLoading()
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
