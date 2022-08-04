
<template>
  <el-dialog
    title="选择客户"
    :visible.sync="dialogVisible"
    width="80%"
    :fullscreen="true"
    @close="$refs.SugarForm.resetFields()"
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
        border
        :data="list"
        size="medium"
        fit
      >
        <el-table-column prop="operation" label="操作" align="center" class-name="small-padding fixed-width" fixed min-width="120px" width="120px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleFetchStock(scope.row)"
            >选择库存</el-button>
          </template>
        </el-table-column>
        <el-table-column v-for="item in tableColumns" :key="item.id" :label="item.label" :align="item.align" :prop="item.key" :width="item.width" :tip="item.itp" :fixed="item.fixed">
          <template slot-scope="scope">
            {{ item.filter ? item.filter(scope.row[item.key]) : scope.row[item.key] }}
          </template>
        </el-table-column>
      </SugarTable>
      <!-- 表格end -->
    </div>
    <template #footer class="dialog-footer">
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
import { customerList } from '@api/wms/store_out'
import SugarTable from '@/components/SugarTable'
import SugarForm from '@/components/SugarForm'
const queryParam = {
  customerName: null,
  $warehouseId: null
}
export default {
  name: 'CustomerDialog',
  components: {
    SugarTable,
    SugarForm
  },
  props: ['visible'],
  data() {
    return {
      tableColumns: tableColumns,
      list: [],
      total: 0,
      pageNum: 1,
      pageSize: 15,
      // 遮罩层
      loading: true,
      queryParam: queryParam,
      formLabel: formLabel
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set($event) {
        this.$emit('update:visible', $event)
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      customerList({
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        },
        data: this.queryParam
      }).then(res => {
        this.list = res.rows
        this.total = res.total
        this.loading = false
      }).catch(err => {
        this.$modal.msgError('获取客户信息出错', err)
      })
    },
    handleFetchStock(row) {
      this.$emit('fetchStock', row)
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
