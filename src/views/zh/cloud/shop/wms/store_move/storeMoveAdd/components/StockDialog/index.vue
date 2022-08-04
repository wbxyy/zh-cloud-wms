<template>
  <el-dialog
    v-dialogDrag
    title="选择库存"
    :visible.sync="dialogVisible"
    width="80%"
  >
    <div class="dialog-body">
      <!-- 表单start -->
      <SugarForm ref="SugarForm" :form-label="formLabel" :form-data="queryParam" class="filter-container">
        <div class="fr">
          <el-button class="filter-item" type="primary" @click="handleQuery">搜索</el-button>
          <el-button class="filter-item" @click="resetQuery">重置</el-button>
        </div>
      </SugarForm>
      <!-- 表单end -->

      <!-- 表格start -->
      <SugarTable
        ref="table"
        v-loading="loading"
        :data="list"
        border
        size="medium"
        fit
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="selection" label="选择" type="selection" width="55" />
        <el-table-column v-for="item in tableColumns" :key="item.id" :label="item.label" :align="item.align" :prop="item.key" :width="item.width" :tip="item.itp" :fixed="item.fixed">
          <template slot-scope="scope">
            {{ item.filter ? item.filter(scope.row[item.key]) : scope.row[item.key] }}
          </template>
        </el-table-column>
      </SugarTable>
      <!-- 表格end -->

    </div>
    <template #footer class="dialog-footer">
      <el-button @click="confirmSelection">
        选择录入
      </el-button>
      <pagination
        v-show="total>0"
        :total="total"
        :page-sizes="[15, 200, 300, 400]"
        :page.sync="pageNum"
        :limit.sync="pageSize"
        @pagination="getList"
      />
    </template>
  </el-dialog>
</template>

<script>
import { tableColumns, formLabel } from './data'
import { selectStock } from '@api/wms/store_move'
import SugarTable from '@/components/SugarTable'
import SugarForm from '@/components/SugarForm'

import _ from 'lodash'
const queryParam = {
  $skuNo: null,
  $shipNo: null,
  $batchNo: null,
  specification: null,
  skuName: null,
  brand: null
}
export default {
  name: 'StockDialog',
  components: {
    SugarTable,
    SugarForm
  },
  props: ['visible', 'params'],
  data() {
    return {
      tableColumns: tableColumns,
      formLabel: formLabel,
      queryParam: queryParam,
      list: [],
      total: 0,
      pageNum: 1,
      pageSize: 15,
      // 遮罩层
      loading: true,
      ids: []
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      }, set($event) {
        this.$emit('update:visible', $event)
      }
    }
  },
  watch: {
    'params': {
      deep: true,
      handler(params) {
        this.getList()
      }
    }
  },
  methods: {
    getList() {
      this.loading = true
      const queryParam = Object.assign({}, this.queryParam, this.params)
      console.log(queryParam)
      selectStock({
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        },
        data: queryParam
      }).then(res => {
        this.list = res.rows
        this.total = res.total
        this.loading = false
      }).catch(err => {
        this.$modal.msgError('获取库存信息出错', err)
      })
    },
    handleSelectionChange({ selection }) {
      this.ids = selection.map(item => {
        return item.$skuNo
      })
    },
    confirmSelection() {
      const data = this.list.filter(f => {
        return this.ids.includes(f.$skuNo)
      })
      this.$emit('confirmStock', data)
    },
    handleQuery() {
      this.pageNum = 1
      this.getList()
    },
    resetQuery() {
      this.$refs.SugarForm.resetFields()
      this.handleQuery()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/sugar.scss';

</style>
