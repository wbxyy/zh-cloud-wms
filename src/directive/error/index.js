export default {
  inserted(el, binding, vnode) {

    // const s = document.styleSheets
    // console.log(s);


    // //考验原生dom操作的时候到了
    // //v-error指令通过气泡提示错误信息
    // //第一步是创建一个气泡dom
    // const text = binding.value
    // if(!text) return
    // //错误信息
    // const errorMsg = document.createElement('div')
    // errorMsg.innerHTML = text



    // //错误图标
    // const errorIcon = document.createElement('div')
    // errorIcon.innerHTML = 'BUG'
    // errorIcon.classList.add('error_icon')

    // const rect = el.getBoundingClientRect()

    // document.body.appendChild(errorMsg)
    // document.body.appendChild(errorIcon)
    // setTimeout(()=>{
    //   const errorMsgRect = errorMsg.getBoundingClientRect()
    //   errorMsg.style.top = `${rect.y}px`
    //   errorMsg.style.left = `${rect.x}px`

    //   const errorIconRect = errorIcon.getBoundingClientRect()
    //   errorIcon.style.top = `${rect.y}px`
    //   errorIcon.style.left = `${rect.x}px`
    // })
  }
}
