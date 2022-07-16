<template>
  <div v-show="show" ref="tool_tip" class="tool_tip" :style="{top:`${top}px`,left:`${left}px`}">
    <div class="tool_tip_close" @click.stop="closeToolTip" />
    <div class="tool_tip_copy" @click.stop="copyToolTip"/>
    <p class="tool_tip_content">{{ content }}</p>
  </div>
</template>

<script>
//! bug 当 tool_tip 的 left 值超过了浏览器，会出现定位不准问题
export default {
  name:'SugarToolTip',
  data(){
    return {
      show:false,
      content:'',
      top:0,
      left:0,
      $el:null
    }
  },
  mounted(){
    this.$el = this.$el.parentNode
    this.$el.addEventListener("click",this.placeToolTip)
  },
  beforeDestroy(){
    this.$el.removeEventListener("click",this.placeToolTip)
  },
  methods:{
    showToolTip(content){
      this.content = content
      this.show = true
      // clearTimeout(this.timer)
      // this.timer = setTimeout(()=>{
      //   this.show = false
      // },2500)
    },
    closeToolTip() {
      // clearTimeout(this.timer)
      this.show = false
    },
    async copyToolTip() {
      try{
        await navigator.clipboard.writeText(this.content)
        this.$modal.msgSuccess('复制成功')
      }catch(err){
        this.$modal.msgError(`复制失败：需要在https中才能使用复制功能`)
        console.log(err);
      }
    },
    placeToolTip(e){
      // console.log('摆放了toolTip');
      this.left = e.clientX
      this.top = e.clientY
      this.$nextTick(() => {
        // console.log(`nextTick=>offset:${this.$refs['tool_tip'].offsetWidth}`);
        this.left -= this.$refs['tool_tip'].offsetWidth
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
.tool_tip{
  max-width:200px;
  min-width:50px;
  border-radius: 2px;
  font-size: 14px;
  box-shadow: 2px 2px 4px 0 rgba(0,0,0,.4);

  background-color: rgba(0,0,0,.7);
  color: #fff;
  position: fixed;
  z-index: 999;

  &_content{
    padding: 4px 6px 4px 6px ;
    margin: 0;
  }

  &_close,&_copy{
    position:absolute;
    left: calc(100% - 12px);
    bottom: calc(100% - 12px);
    background-color: white;
    border-radius: 50%;
    border:1px solid #000;
    padding:12px;
    cursor: pointer;
    overflow:hidden;
    user-select: none;
    &::after,&::before{

      content:"";
      position:absolute;
      left: 50%;
      top: 50%;
      width: 1px;
      background-color:#000;
      height: 50%;
      user-select: none;

    }
    &::after{

      transform: translate(-50%,-50%) rotate(45deg);
    }
    &::before{

      transform: translate(-50%,-50%) rotate(-45deg);
    }
  }

  &_copy{
    left: calc(100% + 12px);
    bottom: calc(100% - 12px);
     &::after{

      transform: translate(-50%,-50%) rotate(45deg);
    }
    &::before{

      transform: translate(-50%,-50%) rotate(45deg);
    }
  }

}
</style>
