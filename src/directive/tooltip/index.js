import Vue from 'vue'
export default {
  inserted(el,binding){
    if (!binding.value) return
    //tooltip的两种类型，提示和错误
    //提示以黑色-问号图标显示
    //错误以红色-感叹号图标显示

    //icon的宽高、字体大小跟随el的font-size
    const size = window.getComputedStyle(el).fontSize

    //为了让el-form-item的label可以自适应，el-form的label-width默认设置为auto
    //el-form-item无法自动计算图标的宽度，需要显式设置图标的width和height
    const style = {
      width:size,
      lineHeight:size,
      height:size,
      fontSize:size,
      marginLeft:'1px',
      color:'black'
    }
    let iconClass = ["el-icon-question"]
    const type = binding.arg
    if(type==='error'){
      style.color = 'red'
      iconClass = ["el-icon-warning"]
    }
    const tooltip = Vue.extend({
      render(createElement){
        return createElement(
          'el-tooltip',{
            props:{
              content:binding.value,
              placement:"top-start",
              'popper-class':'is-error'
            },
          },[
            createElement('i',{
              class:iconClass,
              style
            })
          ]
        )
      }
    })
    // 创建一个 tooltip 实例并返回 dom 节点
    const iconElement =  new tooltip().$mount().$el
    el.insertAdjacentElement('beforeend',iconElement)
  }
}
