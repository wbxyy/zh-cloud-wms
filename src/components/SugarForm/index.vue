<template>
  <el-form ref="form" :model="sugarData" :rules="rules" :size="size" label-position="right" label-width="auto" :validate-on-rule-change="false">
    <el-card v-for="(group,groupIndex) in fieldSet" :key="groupIndex" shadow="never" :class="{'little-margin-top':groupIndex!==0}">
      <div v-if="group" slot="header" class="clearfix">
        <span>{{group}}</span>
      </div>
      <div class="card-form-padding">
        <template v-for="(_,index) in filterLabel">
          <el-row  v-if="index%formCol===0" :key="index">
            <el-col v-for="(item,i) in filterLabel.filter((item,i)=>item.renderGroup===group && i>=index && i<index+Number(formCol))" :key="item.key" :xl="xl" :lg="lg" :md="md" :sm="sm" :xs="xs">
              <el-form-item   :prop="item.key" :label-width="item.labelWidth" ref="formItem" >
                <template #label>
                  <span v-tooltip="item.message" v-tooltip:error="item.error" ref="label" id="sugar">{{item.label}}</span>
                </template>
                <SugarTypeIn :form-item="item" :value="sugarData" :method-obj="methodObj" ></SugarTypeIn>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <slot></slot>
      </div>
    </el-card>
  </el-form>
</template>

<script>
import SugarTypeIn from '@/components/SugarTypeIn'
import _ from 'lodash'
export default {
  name:'SugarForm',
  components:{
    SugarTypeIn
  },
  props:{
    formLabel:Array,
    formData:Object,
    formCol:{
      type:Number,
      default:12
    },
    methodObj:Object,
    size:{
      type:String,
      default:'medium'
    }
  },
  data(){
    return {
      sugarData:{}
    }
  },
  created(){
    const entries = this.formLabel.map(item=>([item.key,undefined]))

    this.sugarData = {
      ...Object.fromEntries(entries),
      ...this.formData
    }
  },
  watch:{
    'sugarData':{
      deep:true,
      handler(data){
        this.$emit('update:formData',data)
      }
    },
    'formData':{
      deep:true,
      handler(data){
        //!??????props?????????????????????????????????????????????sugarData
        Object.keys(this.sugarData).forEach(key=>{
          this.sugarData[key] = this.formData[key]
        })
        //!?????????????????????sugarData????????????watch?????????????????????????????????????????????????????????????????????handler
        //! ?????????????????????????????????watch??????
        //!?? this.sugarData = _.cloneDeep(this.formData)
      }
    }
  },
  computed:{
    filterLabel(){
      return this.formLabel.filter(f=>f.labelVisible??true).sort((a,b)=>(b.labelOrder??0) - (a.labelOrder??0))
    },
    fieldSet(){
      const result = []
      this.filterLabel.forEach((item, index) => {
        if (result.filter(i => i.renderGroup === item.renderGroup).length === 0) {
          result.push(item)
        }
      })
      // ??????result?????????????????????????????????????????????renderGroup?????????map????????????[undefined]
      return result.map(item => item.renderGroup)
    },
    rules(){
      const entries = this.filterLabel.map(item=>{
        let rule = item.rule
        //! ?????????????????????rule????????????????????????
        //! created????????????sugarData???????????????rules???????????????????????????el-form???????????????????????????
        //! ??????validate-on-rule-change=false
        if(typeof item.rule === 'function'){
          rule = item.rule({...this.sugarData})
        }
        return [item.key,rule]
      })
      return Object.fromEntries(entries)
    },
    xl() {
      return this.formCol === 12 ? 6
        : this.formCol === 6 ? 8
          : this.formCol === 2 ? 12
            : 12
    },
    lg() {
      return this.formCol === 12 ? 6
        : this.formCol === 6 ? 8
          : this.formCol === 2 ? 12
            : 12
    },
    md() {
      return this.formCol === 12 ? 8
        : this.formCol === 6 ? 12
          : this.formCol === 2 ? 12
            : 12
    },
    sm() {
      return this.formCol === 12 ? 8
        : this.formCol === 6 ? 12
          : this.formCol === 2 ? 12
            : 12
    },
    xs() {
      return 24
    }
  },
  methods:{
    validate(){
      return this.$refs.form.validate().then(val=>{
        if(val){
          this.$refs.form.clearValidate()
        }
        return val
      }).catch(err=>{
        throw err
      })
    },
    resetFields(){
      this.$refs.form.resetFields()
    },
    clearValidate(){
      this.$refs.form.clearValidate()
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@style/sugar.scss";

</style>
