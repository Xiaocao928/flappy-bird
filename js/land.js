import {getSingle, getTimer, width} from "./utils.js";

function Land () {
  this.left = 0
  this.dom = document.querySelector('#game .land')
  this.timer = getTimer(30, this, this.move)
}

Land.prototype.show = function () {
  this.dom.style.transform = `translate(${this.left}px)`;
}

Land.prototype.move = function() {
  this.left -= 4
  if (this.left <= -width) {
    this.left = 0
  }
  this.show()
 }

 var SingleLand = getSingle(Land)

 export default SingleLand