<template>
  <el-select  v-bind="$attrs" v-model="model" v-on="$listeners">
    <el-option
      v-for="(option,index) in options"
      :key="index"
      :label="option.label"
      :value="option" >
    </el-option>
  </el-select>
</template>

<script>
import _ from 'lodash'
export default {
  inheritAttrs: false,
  name:'SugarSelect',
  model:{
    prop:'value',
    event:'change'
  },
  props:{
    item:Object,
    value:[Object,String],
    formData:Object,
    methodObj:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  watch:{
    'item.options':{
      async handler(val){
        if(val instanceof Promise){
          this.options = await val
        }else{
          this.options = val
        }
      }
    }
  },
  data(){
    return{
      options:[]
    }
  },
  created(){
    //?options 选项 可以配置trigger和resolve,通过监听表单属性的变化，来更新自己的选项
    //?trigger是触发源，在这里指需要监听的属性，由label配置对象给出
    const trigger = _.get(this.item,'options.trigger')
    if(trigger){
      this.$watch(`formData.${trigger}`,function(val){
        this.getOptions(val)
      },{ immediate: true })
    }
  },
  mounted(){
    this.getOptions()
  },
  computed:{
    model:{
      get(){
        return this.value
      },
      set(val){
        this.formData[this.item.key] = val
        // this.value = val//直接修改prop，vue是不允许的
      }
    },
  },
  methods:{
    async getOptions(...args){
      //select类型的label对象上，存在一个options配置项，该配置项有resolve和trigger
      //其中trigger表示触发resolve的时机
      //resolve表示获取选项的接口，返回的是promise
      //如果options是普通数组或者promise对象，则await返回
      if(_.get(this.item.options,'resolve')){
        // this.model = null
        this.options =  await _.get(this.item.options,'resolve').apply(this.formData,args)
      }else{
        this.options = await this.item.options
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@style/sugar.scss';

</style>
