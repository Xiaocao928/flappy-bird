// 返回能够创建单例的构造函数
export function getSingle(fn) {
  var instance = null
  // 返回一个新的构造函数
  return function () {
    if (instance !== null) {
      // 如果已经存在实例对象，直接返回该实例对象
      return instance
    }
    // 没有进入上面的 if，说明是第一次实例化对象

    fn.apply(this, arguments)
    instance = this
  }
}
export function getTimer(duration, thisObj, callback) {
  let timer = null // 存储 setInterval 的返回值，用于停止计时器
  return {
    start: function () {
      // 如果计时器不存在时才会进行计时器的生成
      if (!timer) {
        timer = setInterval(callback.bind(thisObj), duration)
      }
    },
    stop: function () {
      if (timer) {
        clearInterval(timer) // 停止计时器
        timer = null
      }
    },
  }
}
 export const width = 800