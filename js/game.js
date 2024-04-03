import { getSingle, getTimer, width, height, birdAreaHeight } from './utils.js'
import Sky from './sky.js'
import Land from './land.js'
import Pipe from './pipe.js'

function Game() {
  this.width = width
  this.height = height
  this.dom = document.getElementById('game')
  this.paused = true
  this.score = 0
  this.isGameOver = false
  this.sky = null
  this.land = null
  // 制作柱子的计时器
  this.produceTimer = getTimer(3500, Pipe, function () {
    new Pipe()
  })
}

Game.prototype.init = function () {
  this.sky = new Sky()
  this.land = new Land()
}
Game.prototype.start = function () {
  this.sky.timer.start()
  this.land.timer.start()
  this.produceTimer.start()
}
Game.prototype.stop = function () {
  this.sky.timer.stop()
  this.land.timer.stop()
}
/**
 * 向外暴露小鸟跳跃方法
 */
Game.prototype.handleJump = function () {}

/**
 * 游戏记分方法
 */
Game.prototype.getScore = function () {}

/**
 * 检测是否发生碰撞，如果碰撞，则游戏结束
 */
Game.prototype.isCrash = function () {}

var SingleGame = getSingle(Game)

var game = new SingleGame()

export default game
