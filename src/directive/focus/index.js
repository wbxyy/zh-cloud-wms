export default {
  inserted(el, binding, vnode) {
    let input,select
    if(el instanceof HTMLInputElement){
      el.focus()
    }else if(select = el.querySelector('div[class*=el-select]')){
      select.click()
    }else if(input = el.querySelector('input')){
      input.focus()
    }
  }
}
