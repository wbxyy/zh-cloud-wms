<template>
  <div class="app-container">
    <el-card shadow="never">
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
    <SugarEditTable
      v-show="formData.warehouse"
      ref="SugarEditTable"
      :table-data="list"
      :table-columns="tableColumns"
    />

    <el-button size="medium" type="warning" @click="handleSubmit">提交入仓单</el-button>

  </div>
</template>

<script>
import { formLabel, tableColumns } from './data'
import { customerList, warehouseList, storeInCreate, warehousePositions } from '@/api/zh/cloud/wms/store_in'
import SugarForm from '@/components/SugarForm'
import SugarEditTable from '@/components/SugarEditTable'
import _ from 'lodash'
const formData = {
  customerName: null, //! 客户名#
  $customerId: null, //! 客户id
  warehouse: null, //! 仓库名
  $warehouseId: null, //! 仓库id
  $outerNo: null, //! 外部单号✔#
  plateNumber: null, //! 车牌✔#
  linkman: null, //! 联系人✔#
  phone: null, //! 电话✔#
  identity: null, //! 身份证✔#
  realSettlement: null, //! 实际结算方#
  billRemark: null, //! 单证备注✔#
  stevedorage: `1`, //! 装卸费(1代表inactive)✔#
  workingOut: `1`, //! 作业量(1代表inactive)✔#
  items: []//! 入仓条码明细
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
      formData: Object.assign({}, formData),
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
      warehousePositions(warehouseId).then(res => {
        const data = res.data
        // 构造options

        this.tableColumns.find(item => item.key === '$positionId').options = data.map(item => ({ label: item.position, value: item.$positionId }))
      })
    }
  },
  mounted() {
    customerList().then(res => {
      this.customerList = res.rows
    })
    warehouseList().then(res => {
      this.warehouseList = res.rows
    })
  },

  methods: {
    showCustomerDrawer() {
      this.customerDrawer = true
    },
    showWarehouseDrawer() {
      this.warehouseDrawer = true
    },
    handleSubmit() {
      Promise.all([this.$refs.SugarForm.validate(), this.$refs.SugarEditTable.validate()]).then(values => {
        if (values.every(truly => truly)) {
          this.formData.list = this.list
          return storeInCreate(this.formData)
        }
      }).then(res => {
        if (!res) return this.$modal.alert('添加入仓单失败，联系....')
        this.$modal.alert('添加入仓单成功')
        // ?清空表单
      }).catch(err => {
        console.error('坐标：提交入仓单', err)
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
      this.formData = Object.assign({}, formData)
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
