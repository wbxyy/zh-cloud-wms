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
import { tableColumns, formLabel } from './data.js'
import { storeInList, storeInAudit } from '@api/wms/store_in'
import MainTableView from '@/views/components/MainTableView'
export default {
  name: 'StoreIn',
  components: {
    MainTableView
  },
  beforeRouteEnter(to, from, next) {
    // 疑问：为什么没有进beforeRouteUpdate
    next(vc => {
      if (['StoreInEdit', 'StoreInAdd'].includes(from.name)) {
        vc.$refs.table.getList()
      }
    })
  },
  computed: {
    attributes() {
      return {
        tableColumns,
        formLabel,
        title: '入仓单',
        rowKey: '$billId',
        fetch: storeInList
      }
    }
  },

  // ? 分析比写代码更重要

  // ?将表单做成组件以后：表单项的交互称为了问题
  // ?表单项之间的交互，是以当前views作为作用域
  // ?表单项的渲染是通过formLabel来渲染
  // ?formLabel的初始配置由data.js给出
  // ? 而formLabel在传递给子组件之前，需要为其绑定表单项之间的交互：例如延迟获取的下拉框选项，按钮打开dialog等
  // ? 不难的是，交互的方法都放在了methods中

  methods: {
    /** 新增按钮操作 */
    handleAdd() {
      this.$router.push({ name: 'StoreInAdd' })
    },
    // summary({ data }) {
    //   console.log('summary')
    //   return [undefined, undefined, undefined, undefined, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2]
    // },
    handleUpdate(row) {
      // 跳转到编辑页面，携带当前row的数据和dzid
      this.$router.push({
        name: 'StoreInEdit',
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
        return storeInAudit(data)
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
// ? 分析比写代码更重要
// ? el-table 是全局引入的，给 el-table 添加样式，不能使用 scoped
// ? 组件样式如果不使用 scoped，会造成全局样式污染
//? ::v-deep 在 scoped 下给 el 组件添加样式

</style>
