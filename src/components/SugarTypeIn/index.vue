<template>
  <div>
    <component
    :is="name"
    :class="[bindClass]"
    v-bind="item"
    :item="item"
    :form-data="value"
    v-on="methodObj[item.key]"
    v-model.trim="model"
    :placeholder="item.placeholder?item.placeholder: shortHolder?item.label:`请输入${item.label}`"
    clearable
    :disabled="disabled"
    ></component>
    <!-- <el-input
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
    </el-select> -->

    <!-- <el-date-picker
    v-else-if="item.inputType===2"

    v-model="model"
    class="param-input"
    :type="item.dateType"
    :placeholder="item.placeholder?item.placeholder:shortHolder?item.label:`选择${item.label}`"
    :start-placeholder="item.dateType?'开始日期':''"
    :end-placeholder="item.dateType?'结束日期':''"
    :range-separator="item.dateType?'至':''"
    :value-format="item.valueFormat?item.valueFormat:'yyyy-MM-dd'"/> -->

    <!-- <el-button
    class="param-btn"
    v-else-if="item.inputType===3"
    type="primary"
    v-on="methodObj[item.key]"
    :value="model || `选择${item.label}`"
    >
    </el-button> -->

    <!-- <el-switch
    v-else-if="item.inputType===4"

    :active-value="item.activeValue"
    :inactive-value="item.inactiveValue"
    v-model="model" /> -->


  </div>
</template>

<script>
import SugarSelect from '@/components/SugarSelect'
import SugarInput from '@/components/SugarInput'
import SugarButton from '@/components/SugarButton'
import SugarRawText from '@/components/SugarRawText'
import _ from 'lodash'
export default {
  name:'SugarTypeIn',
  components:{
    SugarSelect,
    SugarInput,
    SugarButton,
    SugarRawText
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
  computed:{
    bindClass(){
      let bindClass = ''
      switch(this.formItem.inputType){
        case 0: bindClass='param-input';break;
        case 1: bindClass='param-input';break;
        case 2: bindClass='param-input';break;
        case 3: bindClass='param-btn';break;
        case 4: bindClass='';break;
        default: bindClass='';break;
      }
      return bindClass

    },
    name(){
      let componentName = ''
      switch(this.formItem.inputType){
        case 0: componentName='SugarInput';break;
        case 1: componentName='SugarSelect';break;
        case 2: componentName='ElDatePicker';break;
        case 3: componentName='SugarButton';break;
        case 4: componentName='ElSwitch';break;
        default: componentName='SugarRawText';break;
      }
      return componentName
    },
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
    disabled(){
      let flag = false
      if(typeof this.item.disabled === 'function'){
        flag = this.item.disabled(this.value)
      }else{
        flag = this.item.disabled
      }
      return flag
    }
  },
  methods:{
    noop(){
      //给三元表达式占位用的空函数
      // console.log('noop');
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~@style/sugar.scss';
</style>
