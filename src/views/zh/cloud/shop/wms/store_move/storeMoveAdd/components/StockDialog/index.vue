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
import { selectStock } from '@api/wms/store_move'
import MainTableView from '@/views/components/MainTableView'

import _ from 'lodash'
export default {
  name: 'StockDialog',
  components: {
    MainTableView
  },
  props: ['visible', 'params'],

  computed: {
    attributes() {
      return {
        tableColumns,
        formLabel,
        fetch: selectStock,
        queryParams: this.params,
        rowKey: '$skuNo',
        showOperation: false
      }
    },
    dialogVisible: {
      get() {
        return this.visible
      }, set($event) {
        this.$emit('update:visible', $event)
      }
    },
    rendered() {
      return this.visible
    }
  },
  methods: {
    confirmSelection() {
      const data = this.$refs.stockList.list
      const ids = this.$refs.stockList.ids
      console.log(ids)
      const result = data.filter(item => {
        return ids.includes(item.$skuNo)
      })
      this.$emit('confirmStock', result)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/sugar.scss';

</style>
