
<template>
  <el-dialog
    title="选择仓位"
    :visible.sync="dialogVisible"
    width="80%"
    :fullscreen="true"
  >
    <div class="dialog-body">
      <MainTableView
        v-if="dialogVisible"
        ref="table"
        v-bind="attributes"
      >
        <template #operation="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="selectPosition(scope.row)"
          >选择仓位</el-button>
        </template>
      </MainTableView>
    </div>
  </el-dialog>
</template>

<script>
import { tableColumns, formLabel } from './data'
import { positionsStoreMove } from '@api/wms/preFetch'
import { positionsStoreInOptions } from '@api/wms/preFetch'
import MainTableView from '@/views/components/MainTableView'
import _ from 'lodash'

export default {
  name: 'PositionDialog',
  components: {
    MainTableView
  },
  props: ['visible', 'params'],
  data() {
    return {
      formLabel: formLabel
    }
  },
  computed: {
    attributes() {
      return {
        tableColumns,
        formLabel: this.formLabel,
        fetch: positionsStoreMove,
        qs: this.params

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
  watch: {
    'params': {
      immediate: true,
      deep: true,
      handler(params) {
        if (_.get(params, '$warehouseId')) {
          // 把 warehouseId 传递给 formData
          // formData 封装在 MainTableView 中，为 plainParams
          console.log(params.$warehouseId)
          this.formLabel.find(item => item.key === 'position').options = this.getPositionOptions(params.$warehouseId)
        }
      }
    }
  },
  mounted() {
    console.log(this.params)
  },
  methods: {
    selectPosition(row) {
      this.$emit('selectPosition', row)
    },
    getPositionOptions(id) {
      return positionsStoreInOptions(id).then(res => {
        return res.map(item => ({
          label: item.label,
          value: item.label
        }))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/sugar.scss';

</style>
