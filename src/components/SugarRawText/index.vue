<template>
  <div>
    <div v-if="item.unit" class="cell_content">
      <span>{{value}}</span>
      <span>{{item.unit}}</span>
    </div>
    <div v-else class="cell_content">
        {{ getLabel() || value }}
    </div>
  </div>
</template>

<script>
export default {
  name:'sugarRawText',
  props:['item','value'],
  methods:{
    getLabel(){
      return _.get(this.value,'label')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@style/sugar.scss";
.cell_content{
  display:flex;
  justify-content:space-between;
  padding-left:5px;
}
</style>
