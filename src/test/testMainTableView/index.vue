<template>
<div class="app-container">
  <button @click="showTable">{{show?'隐藏':'显示'}}</button>
  <div v-if="show">
    <MainTableView
      v-bind="attributes"
    >
    </MainTableView>
  </div>

</div>

</template>

<script>
import MainTableView from '@/views/components/MainTableView'
import { tableColumns,formLabel } from './data'
import { storeInList } from '@/api/zh/cloud/wms/store_in'

export default {
  name:'testMainTableView',
  components:{
    MainTableView
  },
  data(){
    return{
      // fetch:storeInList,
      queryParams:{},
      show:false
    }
  },
  methods:{
    showTable(){
      this.show = !this.show
    }
  },
  computed:{
    attributes(){
      return {
        tableColumns,
        formLabel,
        fetch:storeInList,
        rowKey:'$billId',
        queryParams:this.queryParams,
        // title:'入仓单来了',
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/sugar.scss";

</style>
