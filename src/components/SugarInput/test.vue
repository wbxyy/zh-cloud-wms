<template>
  <input type="checkbox" :value="checked" @change="$emit('change',$event.target.checked)">
</template>

<script>
//研究自定义组件的v-model
export default {
  name:'SugarTestInput',
  model:{
    prop:'checked',
    event:'change'
  },
  props:['checked']
}
</script>

<style>

</style>
