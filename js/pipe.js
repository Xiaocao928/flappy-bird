import { getTimer, getRandom, birdAreaHeight, width } from './utils.js'

function Pipe() {
  this.all = []
  this.width = 52
  this.init()
}

Pipe.prototype.init = function () {
  var minHeight = 60
  var gap = 150
  var maxHeight = birdAreaHeight - minHeight - gap

  const h1 = getRandom(minHeight, maxHeight)
  const h2 = birdAreaHeight - h1 - gap

  const div1 = document.createElement('div')
  div1.className = 'pipeup'
  div1.style.height = h1 + 'px'
  div1.style.left = width + 'px'

  const fragment = document.createDocumentFragment()
  fragment.appendChild(div1)

  const div2 = document.createElement('div')
  div2.className = 'pipedown'
  div2.style.height = h2 + 'px'
  div2.style.left = width + 'px'
  fragment.appendChild(div2)

  const all = this.all

  all.push({
    dom: div1,
    heght: h1,
    width: this.width,
    top: 0,
    left: width,
  })
  all.push({
    dom: div2, // dom 属性指向当前的 div
    height: h2,
    width: this.width,
    top: h1 + gap, // 下方柱子的 top 值 = 上面柱子的高度 + 空隙
    left: width,
  })

  document.getElementById('game').appendChild(fragment)
  Pipe.timer = getTimer(30, Pipe, function () {
    for (let i = 0; i < all.length; i++) {
      const p = all[i] // 得到当前的柱子
      p.left -= 2 // 通过修改 left 的值来让柱子进行移动
      if (p.left < -p.width) {
        // 如果进入到此 if，说明柱子已经移动到了舞台之外
        p.dom.remove() // 从屏幕上面移除
        all.splice(i, 1) // 从数组中删除该柱子
        i--
      } else {
        // 如果进入 else，说明柱子没有抛出舞台
        // p.dom.style.left = p.left + 'px';
        p.dom.style.transform = `translateX(${p.left - width}px)`
      }
    }
  })
  Pipe.timer.start()
}

export default Pipe
