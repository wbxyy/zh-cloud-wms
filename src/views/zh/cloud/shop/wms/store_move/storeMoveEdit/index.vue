<template>
  <div class="app-container">
    <MainTableView
      v-if="rendered"
      ref="table"
      class="mb10"
      v-bind="attributes"
    >
      <!-- 空div替换插槽默认内容 -->
      <template #formButton>
        <div />
      </template>

      <template #operation="scope">
        <el-button
          size="mini"
          type="text"
          @click="handleDelete(scope.row)"
        >删除</el-button>
        <el-button
          v-tooltip:error="'修改调仓单，只修改仓位，会新增一条0件的记录'"
          size="mini"
          type="text"
          @click="handleUpdate(scope.row)"
        >修改</el-button>
      </template>
    </MainTableView>

    <el-button @click="handleAudit">{{ row.$verifyNo === '0' ? '审核' : '驳回' }}</el-button>

    <!-- 表单对话框 start-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="60%"
      @open="$nextTick(()=>$refs.SugarForm.clearValidate())"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
      请选择表单布局
      <el-select v-model="formCol">
        <el-option label="宽" :value="2" />
        <el-option label="中" :value="6" />
        <el-option label="窄" :value="12" />
      </el-select>
      <SugarForm ref="SugarForm" :form-label="dialogFormLabel" :form-data.sync="formData" :form-col="formCol" size="small" />
    </el-dialog>
  <!-- 表单对话框 end-->

  </div>
</template>

<script>
import { positionsStoreInOptions } from '@api/wms/preFetch'
import MainTableView from '@/views/components/MainTableView'
import SugarForm from '@/components/SugarForm'
import { tableColumns, formLabel, dialogFormLabel } from './data.js'
import { storeMoveUpdateDetail, storeMove, storeMoveAudit, storeMoveReject, storeMoveDelete } from '@api/wms/store_move'
export default {
  name: 'StoreMoveEdit',
  components: {
    MainTableView,
    SugarForm
  },
  data() {
    return {
      formData: {},
      dialogVisible: false,
      dialogFormLabel: dialogFormLabel,
      dialogTitle: '修改调仓',
      formCol: 2,
      submitData: {},
      row: {},
      rendered: true
    }
  },
  computed: {
    attributes() {
      const { $billId, $billNo, billType } = this.$route.params.row || this.row
      console.log($billId)
      return {
        tableColumns,
        formLabel,
        title: '编辑调仓单',
        rowKey: '$skuId',
        fetch: storeMove,
        formData: {
          $billNo,
          billType
        },
        qs: {
          $billId
        }
      }
    }
  },
  activated() {
    this.row = this.$route.params.row || {}
  },
  methods: {
    handleDelete(row) {
      const delNumber = row.number
      const data = { ...row, delNumber }
      this.$modal.loading('正在删除...')
      storeMoveDelete(data).then(res => {
        this.$modal.msgSuccess('删除成功')
        this.handleRefresh()
        // 刷新列表
      }).catch(err => {
        this.$modal.msgError('删除失败' + err)
      }).finally(res => {
        this.$modal.closeLoading()
        return res
      })
    },
    handleRefresh() {
      console.log('handleRefresh')
      this.rendered = false
      setTimeout(() => {
        this.rendered = true
      }, 100)
      // this.$nextTick(() => {
      //   this.rendered = true
      // })
    },
    handleUpdate(row) {
      // 要在当前明细行中拿到什么呢？
      // 修改调仓单的接口需要什么呢？
      // spbhid1: 18385 明细中有spbhid
      // spbhid2: 18385 明细中有spbhid2

      // spckid1: 72 明细中有spckido
      // spckid2: 72 明细中有spckidn

      // spcwid1: 1451 明细中有spcwido
      // spcwid2: 802 明细中有spcwidn

      // spcwid: 802 明细中有spcwidn

      // spjs: 1280 明细中有spjs
      // spjsl: 25 明细中有spjsl

      // ssrqid: 2022-08-11 明细中有ssrqid

      // itbz: 明细中有 itbz

      // spdzld1: 124507 明细中有spdzld
      // spdzld2: 124508 明细中有spdzld2

      // spjs0: 1280 调仓件数
      // spckid: 不用填

      // 上述哪些可以在明细行中找到呢？
      this.submitData.$batchId_1 = row.$batchId
      this.submitData.$batchId_2 = row.$batchId_2

      this.submitData.$warehouseId_1 = row.$warehouseId_o
      this.submitData.$warehouseId_2 = row.$warehouseId_n

      this.submitData.$positionId_1 = row.$positionId_o
      this.submitData.$positionId_2 = row.$positionId_n

      this.submitData.$positionId = row.$positionId_n

      this.submitData.$skuId_1 = row.$skuId
      this.submitData.$skuId_2 = row.$skuId_2
      this.submitData.date = row.date
      // ? row.number是原单据调拨件数
      this.submitData.number = row.number
      this.submitData.number_0 = row.number

      this.dialogFormLabel.find(item => item.key === 'position_n').options = positionsStoreInOptions(row.$warehouseId_n)

      this.dialogVisible = true
      console.log(row.position_n, row.$positionId_n)

      this.formData = { ...row }

      this.formData.position_n = {
        label: row.position_n,
        value: Number(row.$positionId_n)
      }
    },
    handleSubmit() {
      this.submitData.$billId = this.row.$billId

      this.submitData.number = this.formData.number
      this.submitData.$positionId = this.formData.position_n
      this.submitData.pieceWeight = this.formData.pieceWeight

      this.$modal.loading('正在修改数据...')
      storeMoveUpdateDetail(this.submitData).then(res => {
        this.$modal.msgSuccess('修改成功')
        this.handleRefresh()
      }).catch(err => {
        this.$modal.msgError('修改失败' + err)
      }).finally(res => {
        this.$modal.closeLoading()
      })
    },
    handleAudit() {
      // 审核
      const verifyState = Number(this.row.$verifyNo || 0)
      if (verifyState === 0) {
        this.$modal.loading('正在审核...')
        storeMoveAudit([this.row.$billId]).then(res => {
          this.$modal.msgSuccess('审核成功')
          this.$router.replace({
            name: 'StoreMove',
            params: {
              refresh: true
            }
          })
        }).catch(err => {
          this.$modal.msgError('审核失败', err)
        }).finally(res => {
          this.$modal.closeLoading()
          return res
        })
      } else {
        this.$modal.loading('正在驳回...')
        storeMoveReject(this.row.$billId).then(res => {
          this.$modal.msgSuccess('驳回成功')
          this.$router.replace({
            name: 'StoreMove',
            params: {
              refresh: true
            }
          })
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
@import "~@/assets/styles/sugar.scss";
// ? 分析比写代码更重要
// ? el-table 是全局引入的，给 el-table 添加样式，不能使用 scoped
// ? 组件样式如果不使用 scoped，会造成全局样式污染
//? ::v-deep 在 scoped 下给 el 组件添加样式

</style>
