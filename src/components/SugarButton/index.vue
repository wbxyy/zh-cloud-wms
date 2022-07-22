<template>
  <el-button
    type="primary"
    v-on="$listeners"
    v-bind="$attrs"
    >
    {{value || `选择${item.label}`}}
    </el-button>
</template>

<script>
export default {
  inheritAttrs: false,
  name:'SugarButton',
  props:{
    item:Object,
    value:String
  }
}
</script>

<style lang="scss" scoped>

</style>
