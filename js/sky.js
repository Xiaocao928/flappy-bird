import {getSingle, getTimer, width} from "./utils.js";

function Sky () {
  this.left = 0
  this.dom = document.querySelector('#game .sky')
  this.timer = getTimer(30, this, this.move)
}

Sky.prototype.show = function () {
  this.dom.style.transform = `translate(${this.left}px)`;
}
Sky.prototype.move = function() {
  this.left -= 1
  if (this.left <= -width) {
    this.left = 0
  }
  this.show()
 }

 var SingleSky = getSingle(Sky)

 export default SingleSky