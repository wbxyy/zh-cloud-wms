<template>
  <el-form ref="form" :model="formData" :rules="rules" :size="size" label-position="right" label-width="85px">
    <el-card v-for="(group,groupIndex) in fieldSet" :key="groupIndex" shadow="never" :class="{'little-margin-top':groupIndex!==0}">
      <div v-if="group" slot="header" class="clearfix">
        <span>{{group}}</span>
      </div>
      <div class="card-form-padding">
        <template v-for="(_,index) in formLabel">
          <el-row  v-if="index%formCol===0" :key="index">
            <el-col v-for="item in formLabel.filter((item,i)=>item.renderGroup===group && i>=index && i<index+Number(formCol))" :key="item.key" :xl="xl" :lg="lg" :md="md" :sm="sm" :xs="xs">
              <el-form-item :label="item.label" :label-width="item.labelWidth" :prop="item.key" >

                <SugarInput :form-item="item" :value="formData" :method-obj="methodObj" ></SugarInput>
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
import SugarInput from '@/components/SugarInput'
export default {
  name:'SugarForm',
  components:{
    SugarInput
  },
  props:['formLabel','formData',"formCol",'methodObj','size'],
  props:{
    formLabel:Array,
    formData:Object,
    formCol:Number,
    methodObj:Object,
    size:{
      type:String,
      default:'medium'
    }
  },
  computed:{
    fieldSet(){
      const result = []
      this.formLabel.forEach((item, index) => {
        if (result.filter(i => i.renderGroup === item.renderGroup).length === 0) {
          result.push(item)
        }
      })
      // 上面result至少会有一个元素，如果没有设置renderGroup，最后map返回一个[undefined]
      return result.map(item => item.renderGroup)
    },
    rules(){
      const entries = this.formLabel.map(item=>[item.key,item.rule])
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
