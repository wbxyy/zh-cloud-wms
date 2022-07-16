<template>
  <div class="app-container">
    <el-card shadow="never">
      <div class="card-title card-padding">
        <div class="card-info">
          <i class="el-icon-tickets" />
          <span>编辑入仓单</span>
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

    <SugarForm
      ref="SugarForm"
      class="little-margin-top filter-container"
      :form-label="formLabel"
      :form-data="formData"
      :form-col="formCol"
    >
      <div class="fr filter-item">
        <el-button @click="handleReset">还原</el-button>
      </div>
    </SugarForm>
    <SugarEditTable
      ref="SugarEditTable"
      :table-data="list"
      :table-columns="tableColumns"
    />

    <el-button type="primary" @click="handleSubmit">提交更新</el-button>

  </div>
</template>

<script>
// ?单据修改怎么都提交不了，一共20个字段，全部必填，全部是乱码字段，一个对不上就提交不了
// ?提交的字段名和页面字段名如何映射，只能手动映射
// 单证id dzid <==> $billId(没有)最后在formData中获取
// 客户id khmcid <==> $customerId(✔) 获取明细时请解析spkhmcid获得
// 批号 spbh <==> $batchNo(✔)
// 批号id spbhid <==> $batchId（✔）
// 条码id spdzld <==> $skuId（✔）
// 柜号 spgh <==> $shipNo（✔）
// 原仓库id spckid <==> $warehouseId（✔）
// 改后仓库id spckid1 <==> $newWarehouseId（没有） 请在一开始赋值原仓库id
// 原仓位id spcwid <==> $positionId（✔）获取明细时请解析spcwid获得
// 改后仓位id spcwid1 <==> $newPositionId（没有）请在一开始赋值原仓位id
// 新仓位id spcwid3 <==> $splitPositionId（没有）
// 拆分件数 spjs3 <==> splitNumber（没有）
// 拆分入仓日期 ssrqid3 <==> splitDate（没有）
// sku备注 itbz <==> skuRemark（✔）
// 客户 khmc <==> customerName（✔）
// 品牌 spcd <==> brand（✔）
// 件数 spjs <==> number（✔）
// 单重 spjsl <==> pieceWeight（✔）
// spmc 不用传
// 重量 spsl <==> totalWeight（✔）
// 物品规格  spzs <==> specification（✔）
// 入仓日期 ssrqid <==> receiptDate（✔）
// wbdh 不用传
// 纱支 wpggA <==> yarn（✔）
// 工艺 wpggB<==> tech（✔）
// 工序 wpggC<==> process（✔）
// 用途 wpggD<==> purpose（✔）
// 产地 wpggE <==> origin（✔）
// 漂染性 wpggF <==> bleach（✔）
// 生产日期 wpggG <==> manufactureDate（✔）
// 颜色 wpggH <==> color（✔）

import { formLabel, tableColumns } from './data'
import { updateStoreIn, updateStoreInDetail, storeIn } from '@/api/zh/cloud/wms/store_in'
import SugarForm from '@/components/SugarForm'
import SugarEditTable from '@/components/SugarEditTable'
import _ from 'lodash'
const row = null
const formData = {
  billRemark: null, //! 单证备注
  $billNo: null, // 单号
  $billId: null, //! 单据id
  plateNumber: null, //! 车牌
  linkman: null, //! 联系人
  phone: null, //! 电话
  identity: null, //! 身份证
  stevedorage: null, //! 装卸费(1代表inactive)
  workingOut: null, //! 作业量(1代表inactive)
  $outerNo: null //! 外部单号
}
// const skuExtend = {
//   $warehouseId: null,
//   $positionId: null,
//   $newWarehouseId: null,
//   $newPositionId: null,
//   $splitPositionId: null,
//   splitDate: null,
//   splitNumber: null,
//   splitWeight: null
// }
export default {
  name: 'StoreInEdit',
  components: {
    SugarForm,
    SugarEditTable
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
      tableColumns: tableColumns
    }
  },
  computed: {

  },
  watch: {
    // 'formData.warehouse'(value) {
    //   // 查询仓位信息，并添加仓位信息
    //   const warehouseId = this.formData.$warehouseId
    //   if (!warehouseId) return
    //   // 所有明细仓位重置
    //   this.list.forEach(item => {
    //     item.position = null
    //   })
    //   warehousePositions(warehouseId).then(res => {
    //     const data = res.data
    //     this.tableColumns.find(item => item.key === 'position').options = data.map(item => ({ label: item.position, value: item.$positionId }))
    //   })
    // },
    // 'list': {
    //   deep: true,
    //   handler(list) {
    //     list.forEach(item => {
    //       item.totalWeight = Number(item.pieceWeight || 0) * Number(item.number || 0) / 1000
    //     })
    //   }
    // }
  },
  mounted() {
    // 回显数据
    if (this.$route.params.row) {
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = this.$route.params.row[key]
      })
    }

    if (this.formData.$billId) {
      storeIn(this.formData.$billId).then(res => {
        // 传回来的data是散装数据，此处要构造仓库下拉和仓位下拉的初始选项
        res.data.forEach(item => {
          // 需要构造的选项(看菜吃饭，需要后端配合传id和label)
          // $newWarehouseId
          // $newPositionId
          item.$newWarehouseId = {
            label: item.warehouse,
            value: item.$warehouseId
          }

          item.$newPositionId = {
            label: item.position,
            value: Number(item.$positionId)
          }
        })
        this.list = res.data
      })
    }
  },

  methods: {
    handleSubmit() {
      Promise.all([this.$refs.SugarForm.validate(), this.$refs.SugarEditTable.validate()]).then(values => {
        if (values.every(truly => truly)) {
          const promises = []
          this.list.forEach(item => {
            console.log(item)
            promises.push(updateStoreInDetail(Object.assign(item, { $billId: this.formData.$billId })))
          })
          return Promise.all([updateStoreIn(this.formData), ...promises])
        }
      }).then(res => {
        if (!res) return this.$modal.alert('修改入仓单失败，联系....')
        this.$modal.alert('修改入仓单成功')
        // ?清空表单
      }).catch(err => {
        console.error('坐标：修改入仓单', err)
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

</style>
