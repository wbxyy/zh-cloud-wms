<template>
  <div>
    <h1>haha</h1>
     <SugarForm
    :form-data='formData'
    :form-label="formLabel"
  ></SugarForm>
  </div>

</template>

<script>
import SugarForm from '@/components/SugarForm'
export default {
  name:'testSugarForm',
  components:{
    SugarForm
  },
  data(){
    return {
      formData:{
        a:null,
        b:null,
        c:null,
        d:null,
        e:null,
        f:null,
      },
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
