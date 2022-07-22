<template>

  <el-form ref="form" :model="formData" :rules="rules" size="mini" label-position="right" label-width="85px">
    <el-card v-for="(group,groupIndex) in fieldSet" :key="groupIndex" shadow="never" :class="{'little-margin-top':groupIndex!==0}">
      <div v-if="group" slot="header" class="clearfix">
        <span>{{group}}</span>
      </div>

      <div class="card-form-padding">
        <template v-for="(_,index) in formLabel">
          <el-row  v-if="index%formCol===0" :key="index">
            <el-col v-for="item in formLabel.filter((item,i)=>item.renderGroup===group && i>=index && i<index+Number(formCol))" :key="item.key" :xl="xl" :lg="lg" :md="md" :sm="sm" :xs="xs">
              <el-form-item :label="item.label" :label-width="item.labelWidth" :prop="item.key" >
                <!-- <SugarTypeIn :form-item="item" v-bind:value="formData[item.key]"  v-on:update:value="updateSugar(item,formData,$event)"></SugarTypeIn> -->
                <SugarTypeIn :form-item="item" :value="formData[item.key]" @update:value="formData[item.key] = $event" :method-obj="methodObj"></SugarTypeIn>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </div>
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
  props:['formLabel','formData',"formCol",'methodObj'],
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
        console.log(`SugarFieldsetCard校验成功啦!!! 结果为!!!`,val);
        return val
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
    // updateSugar(item,formData,$event){
    //   console.log(`不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件两侧都没有明显的变更来源。`);
    //   formData[item.key] = $event
    // }
  }
}
</script>

<style lang="scss" scoped>
@import "~@style/sugar.scss";

</style>
