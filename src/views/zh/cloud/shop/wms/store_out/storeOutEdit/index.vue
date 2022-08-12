<template>
  <div class="app-container">
    <el-card shadow="never" class="mb10">
      <div class="card-title card-padding">
        <div class="card-info">
          <i class="el-icon-tickets" />
          <span>编辑出仓单</span>
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
      class="mb10 filter-container"
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
      class="mb10"
      :table-data.sync="list"
      :table-columns="tableColumns"
      :allow-empty="true"
    />

    <div class="mb10">
      <el-button type="primary" @click="handleSubmit">提交更新</el-button>
      <el-button type="primary" @click="handleAudit">{{ row.$verifyNo === '0' ? '审核' : '驳回' }}</el-button>
    </div>

  </div>
</template>

<script>
import { parallelPromise, sequentialPromise } from '@/utils/sugar'
import _ from 'lodash'
import { formLabel, tableColumns } from './data'
import { storeOutUpdate, storeOutUpdateDetail, storeOut, storeOutAudit, storeOutReject, storeOutDelete } from '@api/wms/store_out'
import SugarForm from '@/components/SugarForm'
import SugarEditTable from '@/components/SugarEditTable'
// const formData = {
//   $billNo: null, // 单号
//   $billId: null, //! 单据id
//   plateNumber: null, //! 车牌
//   linkman: null, //! 联系人
//   phone: null, //! 电话
//   identity: null, //! 身份证
//   billRemark: null, //! 单证备注
//   stevedorage: null, //! 装卸费(1代表inactive)
//   workingOut: null, //! 作业量(1代表inactive)
//   $outerNo: null
// }

export default {
  name: 'StoreOutEdit',
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
      formData: {},
      formLabel: formLabel,
      tableColumns: tableColumns,
      row: {}
    }
  },
  activated() {
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
        storeOut($billId).then(res => {
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
            promisesUpdate.push(_.partial(storeOutUpdateDetail, Object.assign({}, item, {
              $billId: Number(this.row.$billId),
              // 修改时间
              date: item.date_2
            })))
          })

          const promisesDelete = []
          const delList = this.rawList.filter(f => !this.list.find(i => i.$skuId === f.$skuId))

          delList.forEach(item => {
            promisesDelete.push(_.partial(storeOutDelete, Object.assign({}, item, {
              $billId: Number(this.row.$billId),
              createDate: this.row.createDate
            })))
          })

          this.$modal.loading('串行提交中...请稍后...')
          return sequentialPromise([_.partial(storeOutUpdate, this.formData), ...promisesUpdate, ...promisesDelete]).finally(res => {
            return res
          })
        }
      }).then(res => {
        if (!res) return this.$modal.alert('修改出仓单失败，联系....')
        this.$modal.confirm('修改成功').then(res => {
          this.goBack()
        })
        // ?清空表单
      }).catch(err => {
        console.error('坐标：修改出仓单', err)
      }).finally(() => {
        this.$modal.closeLoading()
      })
    },
    handleReset() {
      this.$refs.SugarForm.resetFields()
    },
    goBack() {
      this.$tab.closePage({ path: '/wms/store_out/edit', name: 'StoreOutEdit' }).then(res => {
        this.$router.push({
          path: '/wms/storeOut'
        })
      })
    },
    handleAudit() {
      const data = [this.row]
      const { $verifyNo } = this.row
      if ($verifyNo === '0') {
        this.$modal.loading('提交审核中...')
        storeOutAudit(data).then(res => {
          this.$modal.msgSuccess('审核成功')
          this.$router.push({
            path: '/wms/storeOut',
            query: {
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
        const id = this.row.$billId
        this.$modal.loading('提交驳回中...')
        storeOutReject(id).then(res => {
          this.$modal.msgSuccess('驳回成功')
          this.$router.push({
            path: '/wms/storeOut',
            query: {
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
@import '~@/assets/styles/sugar.scss';

</style>
