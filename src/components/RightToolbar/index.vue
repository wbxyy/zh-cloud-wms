<template>
  <div class="top-right-btn">
    <el-row>
      <el-tooltip v-show="showExport" class="item" effect="dark" :content="'导出'" placement="top">
        <el-button size="mini" circle icon="el-icon-download" @click="handleExport()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
        <el-button size="mini" circle icon="el-icon-search" @click="toggleSearch()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="top">
        <el-button size="mini" circle icon="el-icon-refresh" @click="refresh()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="显隐列" placement="top" v-if="columns">
        <el-button size="mini" circle icon="el-icon-menu" @click="showColumn()" />
      </el-tooltip>
    </el-row>
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-transfer
        :titles="['显示', '隐藏']"
        v-model="value"
        :data="columns"
        @change="dataChange"
      ></el-transfer>
    </el-dialog>

  </div>
</template>
<script>
export default {
  name: "RightToolbar",
  data() {
    return {
      // 显隐数据
      value: [],
      // 弹出层标题
      title: "显示/隐藏",
      // 是否显示弹出层
      open: false,
    };
  },
  props: {
    showSearch: {
      type: Boolean,
      default: true,
    },
    columns: {
      type: Array,
    },
  },
  created() {
    // 初始化transform目标列表(右边列表)
    if(!this.columns) return
    this.columns.forEach((item)=>{
      if(item.visible===false){
        this.value.push(item.key)
      }
    })
  },
  computed:{
    showExport(){
      return Boolean(this.$listeners.handleExport)
    }
  },
  methods: {
    // 搜索
    toggleSearch() {
      this.$emit("update:showSearch", !this.showSearch);
    },
    //导出
    handleExport(){
      this.$emit("handleExport")
    },
    // 刷新
    refresh() {
      this.$emit("queryTable");
    },
    // 右侧列表元素变化(data是右侧列表)
    dataChange(data) {
      console.log(data);
      this.columns.forEach(item=>{
        const showIt = !data.includes(item.key)
        if(item.hasOwnProperty('visible')){
          item.visible = showIt
        }else{
          this.$set(item,'visible',showIt)
        }
      })
    },
    // 打开显隐列dialog
    showColumn() {
      this.open = true;
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-transfer__button {
  border-radius: 50%;
  padding: 12px;
  margin-left: 0px;
}

::v-deep .el-transfer__button:first-child {
  margin-bottom: 10px;
}
</style>
