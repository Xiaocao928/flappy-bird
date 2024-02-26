import {getSingle, getTimer, width} from "./utils.js";

function Sky () {
  this.left = 0
  this.dom = document.querySelector('#game .sky')
  this.timer = getTimer(10, this, this.move)
}

Sky.prototype.show = function () {
  this.dom.style.transform = `tannslate${this.left}px`
}