<template>
  <div class="app-container">
    <!-- 标题start -->
    <el-card shadow="never" class="mb10">
      <div class="card-title card-padding">
        <div class="card-info">
          <i class="el-icon-tickets" />
          <span>创建入仓单</span>
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

    <!-- 客户抽屉start -->
    <el-drawer
      title="选择客户"
      :visible.sync="customerDrawer"
      direction="rtl"
      custom-class="drawer"
    >
      <div class="drawer__content">
        <el-input v-model="searchCustomer" class="drawer-filter">
          <template slot="prepend">搜索客户</template>
        </el-input>
        <el-card v-for="(item,index) in filterCustomer" :key="index" class="drawer-card" shadow="never" @click.native="handleSelectCustomer({id:item.$customerId,name:item.customerName})">
          {{ item.customerName }}
        </el-card>
      </div>

    </el-drawer>
    <!-- 客户抽屉end -->

    <!-- 仓库抽屉start -->
    <el-drawer
      title="选择仓库"
      :visible.sync="warehouseDrawer"
      direction="rtl"
      custom-class="drawer"
    >
      <div class="drawer__content">
        <el-input v-model="searchWarehouse" class="drawer-filter">
          <template slot="prepend">搜索仓库</template>
        </el-input>
        <el-card v-for="(item,index) in filterWarehouse" :key="index" class="drawer-card" shadow="never" @click.native="handleSelectWarehouse({id:item.$warehouseId,name:item.warehouse})">
          {{ item.warehouse }}
        </el-card>
      </div>

    </el-drawer>
    <!-- 仓库抽屉end -->

    <!-- 表单start -->
    <SugarForm
      ref="SugarForm"
      class="mb10"
      :form-label="formLabel"
      :form-data.sync="formData"
      :form-col="formCol"
      :method-obj="methodObj"
    >
      <div class="fr mb10">
        <el-button @click="handleReset">重置</el-button>
      </div>
    </SugarForm>
    <!-- 表单end -->

    <!-- 操作栏start -->
    <div class="operation mb10">
      <el-button :disabled="!Boolean(formData.warehouse)" type="primary" @click="handleAddRow">新增</el-button>
    </div>
    <!-- 操作栏end -->

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

      <el-button type="warning" @click="handleSubmit">提交入仓单</el-button>
    </div>
    <!-- footer_end -->

  </div>
</template>

<script>
import { formLabel, tableColumns } from './data'
import { storeInCreate } from '@/api/zh/cloud/wms/store_in'
import { customerStoreIn, warehouseStoreIn, positionsStoreInOptions } from '@api/wms/preFetch'
import SugarForm from '@/components/SugarForm'
import SugarEditTable from '@/components/SugarEditTable'
// const formData = {
//   customerName: null, //! 客户名#
//   $customerId: null, //! 客户id
//   warehouse: null, //! 仓库名
//   $warehouseId: null, //! 仓库id
//   $outerNo: null, //! 外部单号✔#
//   plateNumber: null, //! 车牌✔#
//   linkman: null, //! 联系人✔#
//   phone: null, //! 电话✔#
//   identity: null, //! 身份证✔#
//   realSettlement: null, //! 实际结算方#
//   billRemark: null, //! 单证备注✔#
//   stevedorage: `1`, //! 装卸费(1代表inactive)✔#
//   workingOut: `1`, //! 作业量(1代表inactive)✔#
//   list: []//! 入仓条码明细
// }

const extra = {
  $customerId: null, //! 客户id
  $warehouseId: null//! 仓库id
}
export default {
  name: 'StoreInAdd',
  components: {
    SugarForm,
    SugarEditTable
  },
  data() {
    return {
      // 响应式渲染表单时，el-row的初始列数
      formCol: 12,
      // 抽屉
      customerDrawer: false,
      warehouseDrawer: false,
      // 搜索框的model
      searchCustomer: '',
      searchWarehouse: '',
      // 遮罩层
      loading: true,
      // 明细
      list: [],
      formData: { ...extra },
      formLabel: formLabel,
      tableColumns: tableColumns,
      warehouseList: [],
      customerList: []
    }
  },
  computed: {
    // SugarForm方法映射
    methodObj() {
      return {
        customerName: {
          click: this.showCustomerDrawer
        },
        warehouse: {
          click: this.showWarehouseDrawer
        }
      }
    },
    filterCustomer() {
      return this.customerList.filter(item => item.customerName.includes(this.searchCustomer))
    },
    filterWarehouse() {
      return this.warehouseList.filter(item => item.warehouse.includes(this.searchWarehouse))
    }
  },
  watch: {
    'formData.warehouse'(value) {
      // 查询仓位信息，并添加仓位信息
      const warehouseId = this.formData.$warehouseId
      if (!warehouseId) return
      // 所有明细仓位重置
      this.list.forEach(item => {
        item.$positionId = null
      })
      positionsStoreInOptions(warehouseId).then(res => {
        // 构造options
        this.tableColumns.find(item => item.key === '$positionId').options = res
      })
    }
  },
  mounted() {
    customerStoreIn().then(res => {
      this.customerList = res.rows
    })
    warehouseStoreIn().then(res => {
      this.warehouseList = res.rows
    })
  },

  methods: {
    handleAddRow() {
      this.$refs.SugarEditTable.add()
    },
    showCustomerDrawer() {
      this.customerDrawer = true
    },
    showWarehouseDrawer() {
      this.warehouseDrawer = true
    },
    handleSubmit() {
      Promise.all([this.$refs.SugarForm.validate(), this.$refs.SugarEditTable.validate()]).then(values => {
        if (values.every(truly => truly)) {
          const data = { list: this.list, ...this.formData }
          this.$modal.loading('提交新增中...')
          return storeInCreate(data)
        }
      }).then(res => {
        if (!res) return this.$modal.alert('添加入仓单失败，联系....')
        this.$modal.confirm('添加成功').then(res => {
          this.goBack()
        })
        // ?清空表单
      }).catch(err => {
        console.error('坐标：提交入仓单', err)
      }).finally(() => {
        this.$modal.closeLoading()
      })
    },
    handleSelectCustomer(val) {
      this.customerDrawer = false
      this.formData.customerName = val.name
      this.formData.$customerId = val.id
    },
    async handleSelectWarehouse(val) {
      this.warehouseDrawer = false
      this.formData.warehouse = val.name
      this.formData.$warehouseId = val.id
    },
    handleReset() {
      this.$refs.SugarForm.resetFields()
      // this.formData = Object.assign({}, formData)
    },
    goBack() {
      this.$tab.closePage({ path: '/wms/store_in/add', name: 'StoreInAdd' }).then(res => {
        this.$router.push({
          path: '/wms/storeIn'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/sugar.scss';
.drawer__content{
  padding:20px 10px;
}
.drawer-card{
  margin-top: 10px;
  padding:10px 10px;
  cursor:pointer;
  &:hover{
    background-color: #dce6fb;
  }
}

.drawer-filter{
  width: 80%;
  margin-bottom: 10px;
}

</style>
