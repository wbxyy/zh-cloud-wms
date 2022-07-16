<template>
  <div class="sugar_scroll_bar">
    <div class="bg" v-show="show"></div>
    <div ref="bar" class="bar" @click.stop="handleBarClick">
      <div ref="dot" class="dot" :style="{left:`${left}px`}" @mousedown.stop="handleMouseDown"></div>
    </div>
  </div>
</template>

<script>
export default {
  name:'SugarScrollBar',
  mounted(){
    this.barRectWidth = this.$refs.bar.getBoundingClientRect().width
    this.max = this.barRectWidth -50
    this.barRectLeft = this.$refs.bar.getBoundingClientRect().left

    window.addEventListener('mouseup',(e)=>{
      window.removeEventListener('mousemove',this.handleMouseMove)
      this.show = false
      setTimeout(()=>{
        window.onselectstart = ()=>true
      },200)
    })
  },
  data(){
    return{
      barRectLeft:'',
      barRectWidth:0,
      left:0,
      min:0,
      max:0,
      mouseInDot:0,
      show:false
    }
  },
  methods:{
    handleMouseMove(e){
      if(this.timer) return
      this.timer = setTimeout(()=>{
        this.left = e.pageX - this.barRectLeft - this.mouseInDot
        this.left = this.left < this.min ? 0 : this.left
        this.left = this.left > this.max ? this.max : this.left

        //? 将 scrollX 变成百分比
        const p = this.left / this.max
        this.$emit('handleSugarScroll',p)
        this.timer = null
      },32)

    },
    handleMouseDown(e){
      this.mouseInDot = e.offsetX
      this.show = true

      window.addEventListener('mousemove',this.handleMouseMove)
      // 取消文本选中状态
      window.getSelection().empty()
      window.onselectstart = ()=>false
    },
    handleBarClick(e){
      this.left = e.pageX - this.barRectLeft - 25
      this.left = this.left < this.min ? 0 : this.left
      this.left = this.left > this.max ? this.max : this.left
      const p = this.left / this.max
        this.$emit('handleSugarScroll',p)
    }
  }
}
</script>

<style lang="scss" scoped>
.sugar_scroll_bar{
  .bg{
    opacity: 0.1;
    background:  url(~@img/bg.jpg) no-repeat;
    background-size:cover;
    width: 100vw;
    height: 100%;
    position:fixed;
    left: 0;
    top: 0;
    z-index: 998;
  }

  .bar{
    position:relative;
    height: 30px;
    width: 100%;
    border-radius: 30px;
    background-color: pink;
    z-index:999;
    cursor: pointer;
  }

  .dot{
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    padding:25px;
    border-radius: 50%;
    background-color: tomato;
    cursor: pointer;
    z-index:1000;
  }
}
</style>
