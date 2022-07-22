<template>
<el-input
    v-model.trim="model"
    v-bind="$attrs"
    >
      <template v-if="item.unit" slot="append">
        {{item.unit}}
      </template>
    </el-input>
</template>

<script>
export default {
  inheritAttrs: false,
  name:'SugarInput',

  props:['value','item'],
  computed:{
    model:{
      get(){
        return this.value
      },
      set(val){
        this.$emit('input',val)
        // this.formData[this.item.key] = val
        // this.value = val//直接修改prop，vue是不允许的
      }
    }
  }
}
</script>

<style>

</style>
