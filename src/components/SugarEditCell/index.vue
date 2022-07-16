<template>
  <div>
    <el-popover :value="validateMsg!==''" trigger='manual'>
      <div class="" slot='reference'>
        <div v-if='!editable' @click='handleEditable'>
          <slot>
            {{value}}
            <i class="el-icon-edit"></i>
          </slot>
        </div>
        <input ref="input" type="text" v-else v-model="editValue" @change="handleEditable" @blur="handleEditable">
        <!-- <SugarInput :form-item='formItem' :value="value" @update:value="value = $event"></SugarInput> -->
      </div>
      <span style="color:red">{{validateMsg}}</span>
    </el-popover>
  </div>
</template>

<script>
import SugarInput from '@/components/SugarInput'
export default {
  name:'SugarEditCell',
  components:{
    SugarInput
  },
  props:['formItem','value','validator'],
  data(){
    return {
      // 用validateMsg来控制气泡的显示，validateMsg为空时气泡不显示
      validateMsg:'',
      editable:false,
      editValue:''
    }
  },
  mounted(){
    this.editValue = this.value
  },
  methods:{
    handleEditable(){
      console.log(this.editValue);
      if(this.editable && typeof this.validator === 'function'){
        const err = this.validator(this.editValue)
        if(err){
          this.validateMsg = err;
          return
        }
        this.validateMsg = ''
      }

      this.editable = !this.editable
      if(this.editable){
        this.$nextTick(()=>{
          this.$refs.input.focus()
        })
      }



      this.$emit('change',this.editValue)

    },

  }

}
</script>

<style>

</style>
