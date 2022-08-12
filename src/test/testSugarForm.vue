<template>
  <div>
    <h1>haha</h1>
     <SugarForm
    :form-data.sync='formData'
    :form-label="formLabel"
  ></SugarForm>
  <button @click="showData">显示数据</button>
  <button @click="update">修改formData</button>
  </div>

</template>

<script>
import SugarForm from '@/components/SugarForm'
export default {
  name:'testSugarForm',
  components:{
    SugarForm
  },
  methods:{
    showData(){
      console.log(this.formData);
    },
    update(){
      this.formData = {
        a:1,
        b:2,
        c:3,
        d:4,
        e:5,
        f:6
      }
    }
  },
  data(){
    return {
      formData:{a:10,b:20},
      formLabel:[
        {
          key:'a',
          label:'androidandroidandroid',
          inputType:0,
          rule:{
            required: true, message: '仓库不能为空', trigger: 'blur'
          },
          message:'haha',
          error:'haha'
        },
        {
          key:'b',
          label:'ios',
          inputType:0,

        },
        {
          key:'c',
          label:'鸿蒙harmony',
          inputType:0,

        },
        {
          key:'d',
          label:'中国芯',
          inputType:0,

        },
        {
          key:'e',
          label:'统一战线',
          inputType:0,

        },
        {
          key:'f',
          label:'a_a_a',
          inputType:0,

        },
      ]
    }
  }
}
</script>

<style>

</style>
