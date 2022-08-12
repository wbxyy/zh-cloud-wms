<template>
  <div class="app-container">
    <MainTableView
      ref="table"
      v-bind="attributes"
    >
      <template #button>
        <el-col :span="0.1">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
          >新增</el-button>
        </el-col>
        <el-col :span="0.1">
          <el-button
            v-tooltip:error="'审核100条数据请求超时'"
            type="warning"
            plain
            icon="el-icon-check"
            size="mini"
            @click="handleAudit"
          >审核</el-button>
        </el-col>

      </template>
      <template #operation="scope">
        <el-button
          v-hasPermi="['zhcloud:shop:edit']"
          size="mini"
          type="text"
          icon="el-icon-edit"
          @click="handleUpdate(scope.row)"
        >修改</el-button>
      </template>
    </MainTableView>

  </div>
</template>

<script>
import MainTableView from '@/views/components/MainTableView'
import { tableColumns, formLabel } from './data.js'
import { storeOutList, storeOutAudit } from '@api/wms/store_out'
export default {
  name: 'StoreOut',
  components: {
    MainTableView
  },
  beforeRouteEnter(to, from, next) {
    // 疑问：为什么没有进beforeRouteUpdate
    next(vc => {
      if (['StoreOutEdit', 'StoreOutAdd'].includes(from.name)) {
        vc.$refs.table.getList()
      }
    })
  },

  computed: {
    attributes() {
      return {
        tableColumns,
        formLabel,
        title: '出仓单',
        rowKey: '$billId',
        fetch: storeOutList
      }
    }
  },
  methods: {
    /** 新增按钮操作 */
    handleAdd() {
      this.$router.push({ name: 'StoreOutAdd' })
    },
    handleUpdate(row) {
      // 跳转到编辑页面，携带当前row的数据和dzid
      this.$router.push({
        name: 'StoreOutEdit',
        params: {
          row: row
        }
      })
    },
    handleAudit(row) {
      const list = this.$refs.table.list
      const ids = this.$refs.table.ids

      const data = list.filter(f => {
        return ids.includes(f.$billId)
      })

      this.$modal.confirm(`是否确认审核${ids.length}条数据项`).then(() => {
        this.$modal.loading('批量审核中...')
        return storeOutAudit(data)
      }).then(res => {
        this.$refs.table.getList()
        this.$modal.msgSuccess(`批量审核成功，共${ids.length}项`)
      }).catch(err => {
        this.$modal.msgError(`批量审核失败`, err)
      }).finally(() => {
        this.$modal.closeLoading()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/sugar.scss";

</style>
