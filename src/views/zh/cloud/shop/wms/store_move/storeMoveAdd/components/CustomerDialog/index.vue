
<template>
  <el-dialog
    title="选择客户"
    :visible.sync="dialogVisible"
    width="80%"
    :fullscreen="true"
  >
    <div class="dialog-body">
      <MainTableView
        v-bind="attributes"
      >
        <template #operation="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleSelect(scope.row)"
          >选择库存</el-button>
        </template>
      </MainTableView>
    </div>
  </el-dialog>
</template>

<script>
import { tableColumns, formLabel } from './data'
import { customerStoreMove } from '@api/wms/preFetch'
import MainTableView from '@/views/components/MainTableView'

export default {
  name: 'CustomerDialog',
  components: {
    MainTableView
  },
  props: ['visible'],
  data() {
    return {
    }
  },
  computed: {
    attributes() {
      return {
        tableColumns,
        formLabel,
        fetch: customerStoreMove,
        showSelection: false
      }
    },
    dialogVisible: {
      get() {
        return this.visible
      },
      set($event) {
        this.$emit('update:visible', $event)
      }
    }
  },

  methods: {
    handleSelect(row) {
      this.$emit('selectCustomer', row)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/sugar.scss';

</style>
