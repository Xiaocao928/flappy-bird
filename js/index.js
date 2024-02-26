import { getSingle, getTimer, width } from './utils.js'
function Sky() {
  this.left = 0
  this.dom = document.querySelector('#game .sky')
  this.timer = getTimer(30, this, this.move)
}
Sky.prototype.show = function () {
  // 重新展示天空这张背景图
  // this.dom.style.left = this.left + "px";
  this.dom.style.transform = `translateX(${this.left}px)`
}
Sky.prototype.move = function () {
  // 不停的修改 left 值
  this.left -= 1
  if (this.left === -width) {
    this.left = 0
  }
  this.show()
}

var SingleSky = getSingle(Sky)

export default SingleSky

const btn = document.querySelector('.btn')
btn.addEventListener('cliack', function () {
  console.log('链接进来了')
})
