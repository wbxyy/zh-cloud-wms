<template>
  <div class="app-container">

    <el-row :gutter="15">
      <el-form v-show="showSearch" ref="queryForm" :model="queryParams" size="small" label-width="80px">
        <el-col :span="8" :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="单号" prop="pzbh">
            <el-input
              v-model="queryParams.pzbh"
              placeholder="请输入单号"
              :maxlength="11"
              show-word-limit
              clearable
              prefix-icon="el-icon-mobile"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="关联单号" prop="pzbh1">
            <el-input
              v-model="queryParams.pzbh1"
              placeholder="请输入关联单号"
              :maxlength="11"
              show-word-limit
              clearable
              prefix-icon="el-icon-mobile"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="外部单号" prop="wbdh">
            <el-input
              v-model="queryParams.wbdh"
              placeholder="请输入外部单号"
              :maxlength="11"
              show-word-limit
              clearable
              prefix-icon="el-icon-mobile"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户" prop="spkhmc">
            <el-input
              v-model="queryParams.spkhmc"
              placeholder="请输入客户"
              :maxlength="11"
              show-word-limit
              clearable
              prefix-icon="el-icon-mobile"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="入仓日期" prop="rqid">
            <el-date-picker
              v-model="queryParams.rqid"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :style="{width: '100%'}"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              range-separator="至"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="条码" prop="sptm">
            <el-input v-model="queryParams.sptm" placeholder="请输入单行文本" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8" :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="柜号/批号" prop="spgh">
            <el-input v-model="queryParams.spgh" placeholder="请输入单行文本" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8" :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="仓库" prop="spckmc">
            <el-select v-model="queryParams.spckmc" placeholder="请选择下拉选择" clearable>
              <el-option
                v-for="(item, index) in spckmcOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="仓位" prop="ckcw">
            <el-select v-model="queryParams.ckcw" placeholder="请选择下拉选择仓位" clearable>
              <el-option
                v-for="(item, index) in ckcwOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="审核状态" prop="shzt">
            <el-select v-model="queryParams.shzt" placeholder="请选择下拉选择审核状态" clearable>
              <el-option
                v-for="(item, index) in shztOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="车牌" prop="dzzy6">
            <el-input v-model="queryParams.dzzy6" placeholder="请选择下拉选择车牌" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8" :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item size="large">
            <el-button type="primary" @click="handleQuery">搜索</el-button>
            <el-button @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['zhcloud:shop:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['zhcloud:shop:edit']"
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleEdit"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['zhcloud:shop:remove']"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['zhcloud:shop:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" :columns="tableColumns" @queryTable="getList" />
    </el-row>

    <div ref="sugarTable" class="sugar-table">

      <SugarToolTip ref="tool_tip" />

      <SugarScrollBar ref="scroll_bar" class="scroll_bar" @handleSugarScroll="handleSugarScroll" />

      <el-table
        ref="table"
        v-loading="loading"
        border
        :data="storeInList"
        size="mini"
        row-key="id"
        fit
        @header-click="handleHeaderClick"
        @cell-click="handleCellClick"
        @selection-change="handleSelectionChange"
        @header-dragend="handleHeaderDragend"
      >
        <el-table-column prop="selection" label="选择" type="selection" width="55" />
        <el-table-column prop="operation" label="操作" align="center" class-name="small-padding fixed-width" fixed min-width="120px" width="120px">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['zhcloud:shop:edit']"
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
            >修改</el-button>
            <el-button
              v-hasPermi="['zhcloud:shop:remove']"
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>

        <template v-for="item in displayColumns">
          <el-table-column :key="item.id" :label="item.label" :align="item.align" :prop="item.prop" :width="item.width" :tip="item.itp" :fixed="item.fixed" />
        </template>
      </el-table>
    </div>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import SugarToolTip from '@/components/SugarToolTip'
import SugarScrollBar from '@/components/SugarScrollBar'
import { storeInList as getData } from '@api/wms/store_in'
import { tableColumns } from './data.js'
export default {
  name: 'StoreIn',
  components: {
    SugarToolTip,
    SugarScrollBar
  },
  data() {
    return {
      isFixed: 'static',
      // 行样式
      myClass: 'success',
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 出仓单数据
      storeInList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        pzbh: null,
        pzbh1: null,
        wbdh: null,
        spkhmc: null,
        rqid: null,
        sptm: null,
        spgh: null,
        spckmc: null,
        ckcw: null,
        shzt: null,
        dzzy6: null
      },
      // 表单参数
      form: {},
      spckmcOptions: [],
      ckcwOptions: [],
      shztOptions: [],
      tableColumns: tableColumns,
      tableHeader: {
        width: 0,
        show: false
      },
      fixedHeadWidth: 0
    }
  },
  computed: {
    displayColumns() {
      return this.tableColumns.filter(item => item.visible)
    }
  },
  mounted() {
    this.initFixedHead()
    let $fh = null
    const $h = this.$refs.table.$el.querySelector('.el-table__header-wrapper')
    this.$nextTick(() => {
      $fh = this.$refs.table.$el.querySelector('.el-table__fixed-header-wrapper')
    })

    const base = this.$refs.sugarTable.getBoundingClientRect().top
    window.addEventListener('scroll', (e) => {
      this.tableHeader.width = this.$refs.table.$el.querySelector('.el-table__body-wrapper').getBoundingClientRect().width
      if (window.scrollY >= base - 100) {
        this.tableHeader.show = true
        this.$el.querySelector('#sticky').insertAdjacentElement('afterbegin', $h)
        // $h.style.transform = `translateY(${window.scrollY - base}px)`
        // $h.style.transform = `translate3d(0px,${window.scrollY - base}px,0px)`
        $h.style.position = `sticky`
        $h.style.top = `${1000}px`
        $h.style.zIndex = `999`
        // $fh.style.transform = `translate3d(0px,${window.scrollY - base}px,0px)`
        $fh.style.position = `absolute`
        $fh.style.top = `0`
        $fh.style.zIndex = `1000`
      } else {
        // $h.style.transform = `translateY(0px)`
        // $fh.style.transform = `translateY(0px)`

        this.tableHeader.show = false
      }
    })

    this.getList()
  },
  methods: {
    /** 查询企业会员列表 */
    getList() {
      this.loading = true
      // listShop(this.queryParams).then(response => {
      //   this.shopList = response.rows
      //   this.total = response.total
      //   this.loading = false
      // })
      getData({
        url: '/wms/store_in'
      }).then(res => {
        this.storeInList = res.data
        this.total = res.total
        this.loading = false
      })
    },
    getSpckmcOptions() {
      this.spckmcOptions
    },
    getCkcwOptions() {
      this.ckcwOptions
    },
    getShztOptions() {
      this.shztOptions
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      console.log(this.queryParams)
      this.$modal.alert(this.queryParams)
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.$router.push({ name: 'AddStoreIn' })
    },
    /** 修改按钮操作 */
    handleEdit(row) {
      this.$router.push({ name: 'EditStoreIn' })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      console.log(ids)
    },
    /** 导出按钮操作 */
    handleExport() {
      this.$modal.msg('导出功能')
    },
    summary({ data }) {
      console.log('summary')
      return [undefined, undefined, undefined, undefined, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2]
    },
    handleCellClick(row, column, cell, event) {
      if (!column.property.match(/(selection|operation)/gi)) {
        this.$refs['tool_tip'].showToolTip(cell.children[0].innerHTML)
      } else {
        this.$refs['tool_tip'].closeToolTip()
      }
    },
    handleHeaderClick(column, event) {
      // this.$refs['tool_tip'].showToolTip(column.label)
    },
    handleSugarScroll(x) {
      // ? x是滚动条百分比，但是scroll()只接受px
      const tableTotalWidth = this.$refs.table.bodyWrapper.scrollWidth - this.$refs.table.bodyWrapper.clientWidth
      const scrollX = tableTotalWidth * x
      this.$refs.table.bodyWrapper.scroll({ top: 0, left: scrollX })
      // this.$refs.sugarTableWrapper.firstChild.scroll({ top: 0, left: scrollX })
    },
    handleHeaderDragend(newWidth, oldWidth, column, event) {
      this.initFixedHead()
    },
    initFixedHead() {

    }
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

.box{
  background-color: pink;
  width: 100px;
  height: 100px;
  position:sticky;
  top:200px;
  z-index: 2020;
}

</style>
