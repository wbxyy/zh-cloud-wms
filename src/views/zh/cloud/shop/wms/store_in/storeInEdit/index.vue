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
      class="little-margin-top"
      :form-label="formLabel"
      :form-data.sync="formData"
      :form-col="formCol"
    >
      <!-- <div class="fr filter-item">
        <el-button @click="handleReset">还原</el-button>
      </div> -->
    </SugarForm>
    <SugarEditTable
      ref="SugarEditTable"
      class="tinny-margin-top"
      :table-data.sync="list"
      :table-columns="tableColumns"
      :allow-empty="true"
    />

    <div class="footer little-margin-top">
      <el-button type="warning" @click="handleSubmit">提交更新</el-button>
      <!-- <el-button v-tooltip:error="'表格双重刷新'" type="primary" @click="handleAudit">{{ row.$verifyNo==='0'?'审核':'驳回' }}</el-button> -->
      <el-button v-tooltip:error="'表格双重刷新'" type="primary" @click="handleAudit">{{ row.$verifyNo==='0'?'审核':'驳回' }}</el-button>
    </div>
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
import { parallelPromise, sequentialPromise } from '@/utils/sugar'
import { formLabel, tableColumns } from './data'
import { storeInUpdate, storeInUpdateDetail, storeIn, storeInAudit, storeInReject, storeInDelete } from '@api/wms/store_in'
import SugarForm from '@/components/SugarForm'
import SugarEditTable from '@/components/SugarEditTable'
import _ from 'lodash'
// const formData = {
//   billRemark: null, //! 单证备注
//   $billNo: null, // 单号
//   $billId: null, //! 单据id
//   plateNumber: null, //! 车牌
//   linkman: null, //! 联系人
//   phone: null, //! 电话
//   identity: null, //! 身份证
//   stevedorage: null, //! 装卸费(1代表inactive)
//   workingOut: null, //! 作业量(1代表inactive)
//   $outerNo: null //! 外部单号
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
      rawList: [],
      // formData: Object.assign({}, formData),
      formData: {},
      formLabel: formLabel,
      tableColumns: tableColumns,
      row: {}
    }
  },
  activated() {
    console.log(this.row)
    this.getData()
  },
  methods: {
    getData() {
      // 回显数据
      // 守卫
      if (!this.$route.params.row) return
      this.row = this.$route.params.row

      const { $billId } = this.row

      Object.keys(this.formData).forEach(key => {
        this.formData[key] = this.row[key]
      })

      if ($billId) {
        this.$modal.loading('正在加载数据...')
        storeIn($billId).then(res => {
        // 传回来的data是散装数据，此处要构造仓库下拉和仓位下拉的初始选项
          res.data.forEach(item => {
          // 需要构造的选项(看菜吃饭，需要后端配合传id和label)
          // $newWarehouseId
          // $newPositionId
            item.$warehouseId_1 = {
              label: item.warehouse,
              value: item.$warehouseId
            }

            item.$positionId_1 = {
              label: item.position,
              value: item.$positionId
            }
          })
          this.$refs.SugarEditTable.init(res.data).then(() => {
            // rowList用来保持原始数据，浅拷贝
            this.rawList = this.list.slice()
          })
        }).finally(res => {
          this.$modal.closeLoading()
          return res
        })
      }
    },
    handleSubmit() {
      Promise.all([this.$refs.SugarForm.validate(), this.$refs.SugarEditTable.validate()]).then(values => {
        if (values.every(truly => truly)) {
          // 获取updateList和deleteList
          const promisesUpdate = []
          this.list.forEach(item => {
            promisesUpdate.push(_.partial(storeInUpdateDetail, Object.assign(item, {
              $billId: Number(this.row.$billId)
            })))
          })

          const promisesDelete = []
          const delList = this.rawList.filter(f => !this.list.find(i => i.$skuId === f.$skuId))

          delList.forEach(item => {
            promisesDelete.push(_.partial(storeInDelete, Object.assign(item, {
              $billId: Number(this.row.$billId),
              createDate: this.row.createDate
            })))
          })

          // console.log('全部列', this.rawList)
          // console.log('更新列', promisesUpdate)
          // console.log('删除列', promisesDelete)

          this.$modal.loading('<串行>提交修改中...请稍后...')
          return sequentialPromise([_.partial(storeInUpdate, this.formData), ...promisesUpdate, ...promisesDelete]).finally(res => {
            return res
          })
        }
      }).then(res => {
        if (!res) return this.$modal.alert('修改入仓单失败，联系....')
        this.$modal.confirm('修改成功').then(res => {
          this.goBack()
        })

        // ?清空表单
      }).catch(err => {
        console.error('坐标：修改入仓单', err)
      }).finally(() => {
        this.$modal.closeLoading()
      })
    },
    handleReset() {
      this.$refs.SugarForm.resetFields()
    },
    goBack() {
      this.$tab.closePage({ path: '/wms/store_in/edit', name: 'StoreInEdit' }).then(res => {
        this.$router.push({
          path: '/wms/storeIn'
        })
      })
    },
    handleAudit() {
      const data = [this.row]
      const { $verifyNo } = this.row
      if ($verifyNo === '0') {
        this.$modal.loading('提交审核中...')
        storeInAudit(data).then(res => {
          this.$modal.msgSuccess('审核成功')
          this.goBack()
        }).catch(err => {
          this.$modal.msgError('审核失败', err)
        }).finally(res => {
          this.$modal.closeLoading()
          return res
        })
      } else {
        const id = this.row.$billId
        this.$modal.loading('提交驳回中...')
        storeInReject(id).then(res => {
          this.$modal.msgSuccess('驳回成功')
          this.goBack()
        }).catch(err => {
          this.$modal.msgError('驳回失败', err)
        }).finally(res => {
          this.$modal.closeLoading()
          return res
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/sugar.scss';

</style>
