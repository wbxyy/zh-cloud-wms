<template>
  <div ref="sugarTable" class="sugar-table">

    <div v-show="tableHeader.show" ref="sugarTableWrapper" class="el-table el-table--fit el-table--border el-table--scrollable-x el-table--mini" :style="{width:`${tableHeader.width}px`}" :class="['sugar-table-header']">
      <!-- 克隆el-table__header-wrapper作为第二层 -->
      <div class="el-table__fixed" :class="['sugar-table-fixed-header']" :style="{width:`${fixedHeadWidth}px`}">

        <!-- 克隆el-table__fixed-header-wrapper作为第一层 -->
      </div>
    </div>

    <SugarToolTip ref="tool_tip" />
    <el-row class="scroll_bar">
      <el-col :span="24">
        <SugarScrollBar ref="scroll_bar" @handleSugarScroll="handleSugarScroll" />
      </el-col>
    </el-row>
    <el-table
      ref="table"
      v-loading="loading"
      :border="border"
      :data="data"
      :size="size"
      row-key="id"
      :fit='fit'
      @header-click="handleHeaderClick"
      @cell-click="handleCellClick"
      @selection-change="handleSelectionChange"
      @header-dragend="handleHeaderDragend"
    >
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
import SugarToolTip from '@/components/SugarToolTip'
import SugarScrollBar from '@/components/SugarScrollBar'
import _ from 'lodash'
export default {
  name:'SugarTable',
  components:{
    SugarToolTip,
    SugarScrollBar
  },
  props:['data','loading','size','fit','border','tableColumns'],
  watch:{
    data:{
      deep:true,
      handler(list){
        if(!Array.isArray(list)) return
        list.forEach(item=>{
          //!执行filter的位置
          for(const key in item){
            const col = this.filterColumns.find(col => col.key === key)
            if (_.get(col, 'filter')) {
              item[key] = col.filter(item[key])
            }
          }
        })
      }
    }
  },
  mounted() {
    this.initFixedHead()
    window.addEventListener('scroll', this.scrollEvent)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollEvent)
  },
  computed:{
     filterColumns(){
      //undefined时为true
      return this.tableColumns.filter(f=>f.columnVisible??true).sort((a,b)=>(b.columnOrder??0) - (a.columnOrder??0))
    },
  },
  data(){
    return {
      tableHeader: {
        width: 0,
        show: false
      },
      fixedHeadWidth: 0
    }
  },
  methods:{
    scrollEvent(e) {
      const base = this.$refs.sugarTable.getBoundingClientRect().top
      this.tableHeader.width = this.$refs.table.$el.querySelector('.el-table__body-wrapper').getBoundingClientRect().width
      if (window.scrollY >= base - 100) {
        this.tableHeader.show = true
      } else {
        this.tableHeader.show = false
      }
    },
    handleHeaderClick(column, event) {
      this.$emit('header-click',{column,event})
      // this.$refs['tool_tip'].showToolTip(column.label)
    },
    handleCellClick(row, column, cell, event) {
      this.$emit('cell-click',{row, column, cell, event})
      if (!column.property.match(/(selection|operation)/gi)) {
        this.$refs['tool_tip'].showToolTip(cell.children[0].innerHTML)
      } else {
        this.$refs['tool_tip'].closeToolTip()
      }
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.$emit('selection-change',{selection})
    },
    handleHeaderDragend(newWidth, oldWidth, column, event) {
      this.$emit('header-dragend',{newWidth, oldWidth, column, event})
      this.initFixedHead()
    },
    initFixedHead() {
      this.$nextTick(() => {
        const wrapper = this.$refs.table.$el.querySelector('.el-table__header-wrapper')
        const fixedWrapper = this.$refs.table.$el.querySelector('.el-table__fixed-header-wrapper')

        const headBox = document.querySelector('.sugar-table .el-table')
        const fixedHeadBox = document.querySelector('.sugar-table .el-table__fixed')

        if (fixedHeadBox.children.length > 0) {
          headBox.firstElementChild && headBox.removeChild(headBox.firstElementChild)
          fixedHeadBox.firstElementChild && fixedHeadBox.removeChild(fixedHeadBox.firstElementChild)
        }

        setTimeout(() => {
          const $elFixed = this.$refs.table.$el.querySelector('.el-table__fixed')
          if($elFixed){
            this.fixedHeadWidth = $elFixed.getBoundingClientRect().width
            headBox.insertAdjacentElement('afterbegin', wrapper.cloneNode(true))
            fixedHeadBox.insertAdjacentElement('afterbegin', fixedWrapper.cloneNode(true))
            const scroll = this.$refs.table.$el.querySelector('.el-table__header-wrapper').scrollLeft
            headBox.querySelector('.el-table__header-wrapper').scroll({ top: 0, left: scroll })
          }
        }, 0)
      })
    },
    handleSugarScroll(x) {
      // ? x是滚动条百分比，但是scroll()只接受px
      const tableTotalWidth = this.$refs.table.bodyWrapper.scrollWidth - this.$refs.table.bodyWrapper.clientWidth
      const scrollX = tableTotalWidth * x
      this.$refs.table.bodyWrapper.scroll({ top: 0, left: scrollX })
      this.$refs.sugarTableWrapper.firstChild.scroll({ top: 0, left: scrollX })
    },
  }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/sugar.scss";
@import "~@/assets/styles/variables.scss";
// ? 分析比写代码更重要
// ? el-table 是全局引入的，给 el-table 添加样式，不能使用 scoped
// ? 组件样式如果不使用 scoped，会造成全局样式污染
//? ::v-deep 在 scoped 下给 el 组件添加样式

.scroll_bar{
  position: fixed;
  width:400px;
  bottom:10%;
  z-index:999;
}

.sugar-table-header,.sugar-table-fixed-header{
  position:fixed;
  top: 0;
  z-index:999;
  overflow-x: hidden;
}

.sugar-table-fixed-header{
  position: absolute;
  top: 0;
  z-index: 1000;
  height: 40px;
}

</style>
