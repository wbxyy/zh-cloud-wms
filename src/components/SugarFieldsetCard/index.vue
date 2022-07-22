<template>
  <el-form ref="form" :model="formData" :rules="rules" size="mini" label-position="right" label-width="85px">
    <el-card v-for="(renderGroup,index) in fieldSet" :key="index" shadow="never" :class="{'little-margin-top':index!==0}">
      <div slot="header" class="clearfix">
        <span>{{renderGroup}}</span>
      </div>
      <el-row class="card-form-padding">
        <el-col v-for="(item,i) in formLabel.filter(group=>group.renderGroup===renderGroup)" :key="i" :span="4" :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
          <el-form-item :label="item.label" :label-width="item.labelWidth" :prop="item.key" >
            <SugarTypeIn :form-item="item" v-bind:value="formData[item.key]"  v-on:update:value="updateSugar(item,formData,$event)"></SugarTypeIn>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
  </el-form>
</template>

<script>
import SugarTypeIn from '@/components/SugarTypeIn'
export default {
  name:'SugarFieldsetCard',
  components:{
    SugarTypeIn
  },
  props:['formLabel','formData'],
  computed:{
    fieldSet(){
      const result = []
      this.formLabel.forEach((item, index) => {
        if (result.filter(i => i.renderGroup === item.renderGroup).length === 0) {
          result.push(item)
        }
      })
      return result.map(item => item.renderGroup)
    },
    rules(){
      const entries = this.formLabel.map(item=>[item.key,item.rule])
      return Object.fromEntries(entries)
    }
  },
  methods:{
    validate(){
      return this.$refs.form.validate().then(ret=>{
        console.log(`SugarFieldsetCard校验成功啦!!! 结果为!!!`,ret);
        return ret
      }).catch(err=>{
        console.log(`SugarFieldsetCard校验失败啦!!! 原因为!!!`,err);
        throw err
      })
    },
    resetFields(){
      this.$refs.form.resetFields()
    },
    clearValidate(){
      this.$refs.form.clearValidate()
    },
    updateSugar(item,formData,$event){
      // console.log(`不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件两侧都没有明显的变更来源。`);
      formData[item.key] = $event
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@style/sugar.scss";

</style>
