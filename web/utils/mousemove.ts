const mousemove = (bodyDom) => {
  // bubble运动函数
  function animationBubble(dom, x, y) {
    let opacityNumber = 1
    let initX = x
    let initY = y
    function animationFrame() {
      dom.style.opacity = opacityNumber
      dom.style.top = y + 'px'
      opacityNumber -= 0.01
      y -= 1
      if (opacityNumber >= 0) {
        requestAnimationFrame(animationFrame)
      } else {
        //如果透明度降为0，移除bubble
        bodyDom.removeChild(dom)
      }
    }
    requestAnimationFrame(animationFrame)
  }

  // 创建bubble元素
  function createBubble(x, y) {
    const newBubble = document.createElement('div')
    newBubble.style.left = x + 'px'
    newBubble.style.top = y + 'px'
    newBubble.setAttribute('class', 'bubble')

    //创建随机颜色， 三个0-255的随机整数
    const red = Math.ceil(Math.random() * 255)
    const green = Math.ceil(Math.random() * 255)
    const blue = Math.ceil(Math.random() * 255)
    newBubble.style.background = 'rgb(230, 241, 247,.4)'

    // 创建初始大小，随机0-60
    const randomSize = Math.ceil(Math.random() * 10)
    newBubble.style.width = randomSize + 'px'
    newBubble.style.height = randomSize + 'px'

    //将bubble加入dom
    bodyDom.appendChild(newBubble)
    //开始动画
    animationBubble(newBubble, x, y)
  }

  // 触发mousemove函数
  function handleMouseMove(e) {
    let pageX = e.pageX
    let pageY = e.pageY
    createBubble(pageX, pageY)
  }

  //节流函数
  function throttleFunction(fn, delay) {
    let timer = null
    return function () {
      let _this = this
      let args = arguments
      if (timer) {
        return false
      } else {
        timer = setTimeout(() => {
          timer = null
        }, delay)
        return fn.apply(_this, args)
      }
    }
  }
  // 节流控制mousemove触发过于频繁
  const throttleMouseMove = throttleFunction(handleMouseMove, 100)

  bodyDom.addEventListener('mousemove', throttleMouseMove, false)
}
export default mousemove
