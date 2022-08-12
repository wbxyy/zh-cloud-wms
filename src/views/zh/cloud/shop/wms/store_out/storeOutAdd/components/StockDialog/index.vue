<template>
  <el-dialog
    v-dialogDrag
    title="选择库存"
    :visible.sync="dialogVisible"
    width="80%"
  >
    <div class="dialog-body">
      <MainTableView
        v-if="rendered"
        ref="stockList"
        v-bind="attributes"
      />
    </div>
    <template #footer class="dialog-footer">
      <el-button @click="confirmSelection">
        选择录入
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { tableColumns, formLabel } from './data'
import { selectStock, appendStock } from '@api/wms/store_out'
import MainTableView from '@/views/components/MainTableView'
import _ from 'lodash'

export default {
  name: 'StockDialog',
  components: {
    MainTableView
  },
  props: ['visible', 'params'],
  data() {
    return {
      append: false
    }
  },
  computed: {
    attributes() {
      return {
        tableColumns,
        formLabel,
        fetch: this.fetch,
        queryParams: this.params,
        rowKey: '$skuNo',
        showOperation: false
      }
    },
    fetch() {
      return this.append ? appendStock : selectStock
    },
    dialogVisible: {
      get() {
        return this.visible
      },
      set($event) {
        this.$emit('update:visible', $event)
      }
    },
    //! 每次弹窗都要强制刷新
    rendered() {
      return this.visible
    }
  },
  watch: {
    'params.list'(list) {
      this.append = list && list.length > 0
    }
  },
  methods: {
    confirmSelection() {
      const data = this.$refs.stockList.list
      const ids = this.$refs.stockList.ids
      const result = data.filter(f => {
        return ids.includes(f.$skuNo)
      })
      this.$emit('confirmStock', result, this.append)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/sugar.scss';

</style>
