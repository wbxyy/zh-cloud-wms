<template>
  <div>

    <el-input
    v-if="item.inputType===0"
    v-model.trim="model"
    :placeholder="item.placeholder?item.placeholder: shortHolder?item.label:`请输入${item.label}`"
    clearable
    :disabled="item.disabled"
    class="param-input">
      <template v-if="item.unit" slot="append">
        {{item.unit}}
      </template>
    </el-input>

    <el-select
    filterable
    :popper-append-to-body="true"
    v-else-if="item.inputType===1"
    :disabled="item.disabled"
    v-model="model"
    :placeholder="item.placeholder?item.placeholder: shortHolder ? item.label:`请选择${item.label}`"
    class="param-input"
    v-on="methodObj[item.key]"
    clearable>
      <el-option
      v-for="option in options"
      :key="option.value" :label="option.label"
      :value="option" />
    </el-select>

    <el-date-picker
    v-else-if="item.inputType===2"

    v-model="model"
    class="param-input"
    :type="item.dateType"
    :placeholder="item.placeholder?item.placeholder:shortHolder?item.label:`选择${item.label}`"
    :start-placeholder="item.dateType?'开始日期':''"
    :end-placeholder="item.dateType?'结束日期':''"
    :range-separator="item.dateType?'至':''"
    :value-format="item.valueFormat?item.valueFormat:'yyyy-MM-dd'"/>

    <el-button
    class="param-btn"
    v-else-if="item.inputType===3"
     type="primary"
    v-on="methodObj[item.key]">
      {{ model || `选择${item.label}` }}
    </el-button>

    <el-switch
    v-else-if="item.inputType===4"

    :active-value="item.activeValue"
    :inactive-value="item.inactiveValue"
    v-model="model" />

    <span v-else>{{ model }}</span>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name:'SugarInput',
  data(){
    return {

      options:[]

    }
  },
  props:{
    formItem:Object,
    value:[String,Number,Array,Object],
    shortHolder:Boolean,
    methodObj:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  watch:{
    'item.options'(val){
      console.log(val);
      this.options = val
    }
  },
  beforeCreate(){
    // console.log('before',this.$options.propsData);
    // const key = _.get(this.$options,'propsData.formItem.key')
    // const options = _.get(this.$options,'propsData.formItem.options')
    // const resolve = _.get(this.$options,'propsData.formItem.options.resolve')
    // const trigger = _.get(this.$options,'propsData.formItem.options.trigger')
    //trigger就是watch选项，需要扔进linkWatch中
    // console.log(resolve);
    // console.log(trigger);
    // console.log(key);
    // if(trigger){
    //   console.log(this.$watch);
    //   // this.$watch(`value.warehouse`,function(val){
    //   //   console.log(key);
    //   // })
    // }

  },
  created(){
    const options = _.get(this.item,'options')
    const resolve = _.get(this.item,'options.resolve')
    const trigger = _.get(this.item,'options.trigger')
    //options 选项 可以配置trigger和resolve,通过监听表单属性的变化，来更新自己的选项
    //trigger是触发源，在这里指需要监听的属性，由label配置对象给出
    if(trigger){
      this.$watch(`value.${trigger}`,function(val){
        this.getOptions(val)
      },{ immediate: true })
    }

  },
  async mounted(){
    this.getOptions()
    //  this.item.options = await this.item.options
  },
  computed:{
    item(){
      return this.formItem
    },
    key(){
      return this.formItem.key
    },
    model:{
      get(){
        //value是整个表单对象
        let result = this.value[this.key]

        //computed出来的表单，要在获取值时进行实时计算，然后赋值给formData，再返回给v-model显示
        if(this.item.computed){
          result = this.item.computed(this.value)
          this.value[this.key] = result
        }else{
          result =  this.value[this.key]
        }
        return result
      },
      set(val){
        this.value[this.key] = val
      }
    },
  },
  methods:{
    noop(){
      //给三元表达式占位用的空函数
      // console.log('noop');
    },
    handleInput($event){
      console.log('handleInput');
      this.model = $event
    },
    async getOptions(...args){
      //select类型的label对象上，存在一个options配置项，该配置项有resolve和trigger
      //其中trigger表示触发resolve的时机
      //resolve表示获取选项的接口，返回的是promise
      //如果options是普通数组或者promise对象，则await返回
      if(_.get(this.item.options,'resolve')){
        // this.model = null
        this.options =  await _.get(this.item.options,'resolve').apply(this.value,args)
        //重新set一下model让el-select更新input的内容
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
