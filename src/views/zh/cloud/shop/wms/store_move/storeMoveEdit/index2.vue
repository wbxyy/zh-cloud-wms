<template>
  <div class="app-container">
    <!-- 标题start -->
    <el-card shadow="never">
      <div class="card-title card-padding">
        <div class="card-info">
          <i class="el-icon-tickets" />
          <span>编辑调仓单</span>
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
    <SugarForm
      ref="SugarForm"
      class="little-margin-top"
      :form-label="formLabel"
      :form-data.sync="formData"
      :form-col="formCol"
    />
    <!-- <SugarEditTable
      ref="SugarEditTable"
      class="little-margin-top"
      :table-columns="tableColumns"
      :table-data.sync="list"
      :allow-empty="true"
    /> -->
    <SugarTable />
    <div class="little-margin-top">
      <el-button type="primary" @click="handleSubmit">提交更新</el-button>
      <el-button type="primary" @click="handleAudit">{{ verify||'审核' }}</el-button>
    </div>
  </div>
</template>

<script>
import { parallelPromise, sequentialPromise } from '@/utils/sugar'
import { storeMoveUpdate, storeMoveUpdateDetail, storeMove, storeMoveAudit, storeMoveReject, storeMoveDelete } from '@api/wms/store_move'
import { positionsStoreInOptions } from '@api/wms/preFetch'
import { tableColumns, formLabel } from './data'
import SugarEditTable from '@/components/SugarEditTable'
import SugarForm from '@/components/SugarForm'
import SugarTable from '@/components/SugarTable'
import _ from 'lodash'

export default {
  name: 'StoreMoveEdit',
  components: {
    SugarEditTable,
    SugarForm,
    SugarTable
  },
  data() {
    return {
      formCol: 12,
      loading: true,
      tableColumns: tableColumns,
      formLabel: formLabel,
      formData: {},
      list: [],
      rawList: [],
      verify: ''
    }
  },
  computed: {
    row() {
      return this.$route.params.row
    }
  },
  activated() {
    this.getList()
  },
  methods: {
    getList() {
      // 获取调仓单明细
      // 回显数据
    // 守卫

      if (!this.row) return

      const { $billId, verify } = this.row
      console.log({ $billId, verify })

      // 按钮赋值
      this.verify = verify === '未审核' ? '审核' : '驳回'
      // 表单赋值
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = this.row[key]
      })

      if (this.row.$warehouseId) {
        this.tableColumns.find(item => item.key === 'newPosition').options = positionsStoreInOptions(this.row.$warehouseId)
      }

      // spbhid<==>批号id
      // spbhid2<==>批号id2
      // sptmc<==>仓库条码
      // sptmc2<==>仓库条码2
      // sptm<==>条码
      // spzs<==>物品规格
      // spcd<==>品牌
      // spgh<==>柜号
      // spbh<==>批号
      // spkhmc<==>客户
      // spkhmcid<==>客户id
      // khlx<==>商城
      //! spckido<==>旧仓库id
      //! spckmco<==>旧仓库名
      //! spcwido<==>旧仓位id
      //! ckcwo<==>旧仓位名
      //! spckidn<==>新仓库id
      //! spckmcn<==>新仓库名
      //! spcwidn<==>新仓位id
      //! ckcwn<==>新仓位名
      // spdzld<==>旧skuId
      // spdzld2<==>新skuId
      // ssrqid<==>调仓日期

      // 策略：仓库下拉和仓位下拉放在表单中渲染

      if ($billId) {
        storeMove($billId).then(res => {
          console.log(res.data)
          this.$refs.SugarEditTable.init(res.data).then(res => {
            // rowList用来保持原始数据，浅拷贝
            this.rawList = this.list.slice()
            return res
          })
        })
      }
    },
    handleSubmit() {
      Promise.all([this.$refs.SugarForm.validate(), this.$refs.SugarEditTable.validate()]).then(values => {
        if (values.every(truly => truly)) {
          // 获取updateList和deleteList
          const promisesUpdate = []
          this.list.forEach(item => {
            const { $billId, $oldSkuId, $newSkuId } = this.row
            // spdzld1 <==> $oldSkuId
            // spdzld2 <==> $newSkuId
            // spjs <==> number
            // spjs0 <==>newNumber
            // spcwid1 <==> $newPositionId
            // spcwid2 <==> $movePositionId
            // spbhid1 <==>
            // spbhid2 <==>
            // spckid1 <==> $newWarehouseId
            // spckid2 <==> $moveWarehouseId
            // const {}
            promisesUpdate.push(_.partial(storeMoveUpdateDetail, Object.assign({}, item, {
              $billId,
              $oldSkuId,
              $newSkuId,
              updateNumber: Number(item.number)
            })))
          })

          const promisesDelete = []
          const delList = this.rawList.filter(f => !this.list.find(i => i.$skuId === f.$skuId))

          delList.forEach(item => {
            promisesDelete.push(_.partial(storeMoveDelete, Object.assign({}, item, {
              $billId: Number(this.row.$billId),
              createDate: this.row.createDate
            })))
          })
          this.$modal.loading('串行提交中...请稍后...')
          return sequentialPromise([_.partial(storeMoveUpdate, this.formData), ...promisesUpdate, ...promisesDelete]).finally(res => {
            this.$modal.closeLoading()
            return res
          })
        }
      }).then(res => {
        if (!res) return this.$modal.alert('修改调仓单失败，联系....')
        this.$modal.alert('修改调仓单成功')
        // ?清空表单
      }).catch(err => {
        console.error('坐标：修改调仓单', err)
      })
    },
    handleReset() {
      this.$refs.SugarForm.resetFields()
    },
    handleAudit() {
      const data = [this.row]
      if (this.verify === '审核') {
        storeMoveAudit(data).then(res => {
          this.$modal.msgSuccess('审核成功')
          this.verify = '驳回'
          this.$router.replace({
            name: 'StoreOut',
            params: {
              refresh: true
            }
          })
        }).catch(err => {
          this.$modal.msgError('审核失败', err)
        })
      } else {
        const id = this.row.$billId
        storeMoveReject(id).then(res => {
          this.$modal.msgSuccess('驳回成功')
          this.verify = '审核'
          this.$router.replace({
            name: 'StoreOut',
            params: {
              refresh: true
            }
          })
        }).catch(err => {
          this.$modal.msgError('驳回失败', err)
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/sugar.scss';
</style>
