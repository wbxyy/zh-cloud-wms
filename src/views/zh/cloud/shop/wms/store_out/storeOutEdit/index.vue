<template>
  <div class="app-container">
    <el-card shadow="never">
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
      class="little-margin-top filter-container"
      :form-label="formLabel"
      :form-data="formData"
      :form-col="formCol"
    >
      <!-- <div class="fr filter-item">
        <el-button @click="handleReset">还原</el-button>
      </div> -->
    </SugarForm>
    <SugarEditTable
      ref="SugarEditTable"
      :table-data="list"
      :table-columns="tableColumns"
      :edit-mode="false"
      :allow-empty="true"
    />

    <el-button type="primary" @click="handleSubmit">提交更新</el-button>

    <el-button type="primary" @click="handleAudit">{{ verify||'审核' }}</el-button>
  </div>
</template>

<script>
import moment from 'moment'
import { formLabel, tableColumns } from './data'
import { storeOutUpdate, storeOutUpdateDetail, storeOut, storeOutAudit, storeOutReject, storeOutDelete } from '@api/wms/store_out'
import SugarForm from '@/components/SugarForm'
import SugarEditTable from '@/components/SugarEditTable'
const formData = {
  $billNo: null, // 单号
  $billId: null, //! 单据id
  plateNumber: null, //! 车牌
  linkman: null, //! 联系人
  phone: null, //! 电话
  identity: null, //! 身份证
  billRemark: null, //! 单证备注
  stevedorage: null, //! 装卸费(1代表inactive)
  workingOut: null, //! 作业量(1代表inactive)
  $outerNo: null
}
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
      formData: Object.assign({}, formData),
      formLabel: formLabel,
      tableColumns: tableColumns,
      verify: ''
    }
  },
  computed: {
    row() {
      return this.$route.params.row
    }
  },
  activated() {
    this.getData()
  },
  methods: {
    getData() {
      // 回显数据
      // 守卫
      if (!this.row) return

      this.verify = this.row.verify === '未审核' ? '审核' : '驳回'
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = this.row[key]
      })

      if (this.formData.$billId) {
        storeOut(this.formData.$billId).then(res => {
          this.list = res.data
          // rowList用来保持原始数据，浅拷贝
          this.rawList = this.list.slice()
        })
      }
    },
    handleSubmit() {
      Promise.all([this.$refs.SugarForm.validate(), this.$refs.SugarEditTable.validate()]).then(values => {
        if (values.every(truly => truly)) {
          // 获取updateList和deleteList
          const promisesUpdate = []
          this.list.forEach(item => {
            promisesUpdate.push(storeOutUpdateDetail(Object.assign({}, item, {
              $billId: Number(this.formData.$billId),
              // 修改时间
              date: item.dischargeDate
            })))
          })

          const promisesDelete = []
          const delList = this.rawList.filter(f => !this.list.find(i => i.$skuId === f.$skuId))

          delList.forEach(item => {
            promisesDelete.push(storeOutDelete(Object.assign({}, item, {
              $billId: Number(this.formData.$billId),
              createDate: this.row.createDate
            })))
          })
          return Promise.all([storeOutUpdate(this.formData), ...promisesUpdate, ...promisesDelete])
        }
      }).then(res => {
        if (!res) return this.$modal.alert('修改出仓单失败，联系....')
        this.$modal.alert('修改出仓单成功')
        // ?清空表单
      }).catch(err => {
        console.error('坐标：修改出仓单', err)
      })
    },
    handleReset() {
      this.formData = Object.assign({}, formData)
    },
    handleAudit() {
      const data = [this.row]
      if (this.verify === '审核') {
        storeOutAudit(data).then(res => {
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
        storeOutReject(id).then(res => {
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
