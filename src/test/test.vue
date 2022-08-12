<template>
<div>
  <button @click="assign">assign</button>
  <button @click="print">打印</button>
</div>
</template>

<script>
// const row = {
//   a:10,
//   b:20
// }
export default {
  data(){
    return {
      obj:null
    }
  },
  methods:{
    print(){
      console.log(this.obj);
    },
    assign(){
      this.obj = Object.assign({
        b:'b'
      },{
        a:20,
        b:20
      })
    }
  }
}
</script>

<style>

</style>
