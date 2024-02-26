# 像素鸟课堂笔记



## *HTML* 结构

整个游戏的 *HTML* 结构非常简单，如下所示：

```html
<!-- 整个游戏盒子 -->
<div id="game">
  <!-- 装背景图片的容器 -->
  <div class="sky"></div>
  <!-- 装大地的容器 -->
  <div class="land"></div>
  <!-- 装小鸟的容器 -->
  <div class="bird"></div>
  <!-- 计分的容器 -->
  <div class="score">0</div>
  <!-- 显示最终得分 -->
  <div class="over">游戏总分：</div>
</div>
<p class="msg">回车键开始/暂停，空格键或者点击鼠标跳跃</p>
```



## *CSS* 样式

*CSS* 样式基本也是常规设置，不存在什么很偏的 *CSS* 属性。

这里我们仅仅设置了游戏容器、天空、大地、小鸟这部分目前所见即所得的样式。

注意 *div#game* 上的 *overflow* 属性，前期方便调试，我们会关闭此条样式规则。

另外，在小鸟身上我们用到了图片定位技术，这是精灵图的核心原理。

```css
/* 整个游戏的样式 */

#game{
    width: 800px;
    height: 600px;
    border: 2px solid;
    margin: 50px auto;
    position: relative;
    overflow: hidden; /* 前期方便调试，我们会关闭此条样式规则 */
}

/* 设置游戏背景图样式 */

#game .sky{
    width: 1600px;
    height: 600px;
    background: url('../img/sky.png');
    position: absolute;
    left: 0;
    top: 0;
}

/* 游戏大地的样式 */

#game .land{
    width: 1600px;
    height: 112px;
    background: url('../img/land.png');
    position: absolute;
    left: 0;
    bottom: 0;
}

/* 游戏提示的样式 */

.msg{
    text-align: center;
    user-select: none;
}

/* 小鸟的样式 */

#game .bird{
    width: 33px;
    height: 26px;
    background: url('../img/bird.png');
    position: absolute;
    left: 200px;
    top: 150px;
    background-position: -113px -10px;
    z-index: 1;
}
```



## 面向对象分析

接下来重头戏来了，咱们整个游戏是采用面向对象的方式去书写。因此第一步需要思考整个游戏中有哪些对象🤔

整体来讲，整个游戏中存在如下的对象：

- *Game*：控制整个游戏的核心对象
- *Sky*：天空对象
- *Land*：大地对象
- *Pipe*：柱子对象
- *Bird*：小鸟对象

其中 *Game* 对象算是咱们整个游戏的核心大脑，它负责协调其他的对象进行一个良好的工作。

分析完有哪些对象后，我们接下来可以继续分析，哪些对象只能有一个实例对象（单例），哪些对象可以有多个实例对象（非单例）

得到的答案如下：

- *Game*：控制整个游戏的核心对象（单例）
- *Sky*：天空对象（单例）
- *Land*：大地对象（单例）
- *Pipe*：柱子对象（非单例）
- *Bird*：小鸟对象（单例）

因此这里就涉及到了设计模式中的单例模式。



## 单例模式

所谓单例模式，是 *23* 种设计模式中的一种。

> 所谓模式，就是是在特定环境下人们解决某类重复出现问题的一套成功或有效的解决方案。
>
> 模式起源于建筑领域，模式之父—*Christopher Alexander*（克里斯托弗·亚历山大）
>
> <img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-08-03-080008.png" alt="image-20210803160008527" style="zoom:45%;" />
>
> *1994* 年 *GoF* 归纳发表了 *23* 种在软件开发中使用频率较高的设计模式，旨在用模式来统一沟通面向对象方法在分析、设计和实现间的鸿沟。
>
> <img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-08-03-080250.png" alt="image-20210803160250301" style="zoom:45%;" />

单例模式的定义是：保证一个类仅有一个实例，并提供一个访问它的全局访问点。

单例模式是一种常见用的模式，有一些对象我们往往只需要一个，比如线程池、全局缓存、浏览器中的 *window* 对象等。

在 *JavaScript* 开发中，单例模式的用途同样的非常广泛。

例如，当用户单击登录按钮时，页面中就会出现一个登录浮框，而这个登录浮框应该是唯一的，无论单击多少次登录按钮，这个浮框都只会被创建一次。此时的这个场景就适合使用单例模式来创建。

要实现一个标准的单例模式，并不复杂，无非就是用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。

下面是在 *JavaScript* 中实现单例模式的示例：

```js
// 返回能够创建单例的构造函数
function getSingle(fn) {
    var instance = null;
    // 返回一个新的构造函数
    return function () {
        if (instance !== null) {
            // 如果已经存在实例对象，直接返回该实例对象
            return instance;
        }
        // 没有进入上面的 if，说明是第一次实例化对象
        // arguments 是调用这个新的构造函数所传入的参数 { '0': '张三', '1': 18 }
        // 方式一：
        // instance = new fn(...arguments);
        // return instance;
        // 思考：上面的 return instance 不写会怎么样？
        // 答案：会输出 undefined 张三 false
        // 原因：当外界 new 这个 function 的时候，会产生一个 {}（假设这个名字叫 A），然后隐式的返回这个对象 A
        // 然而你的这个 A 对象啥都没有，所以外界访问 p1.name 的时候，拿到的是 undefined
        // 而第二次之所以有值，是因为返回的是 instance，instance 的值存储的是 new fn(...arguments) 返回的对象


        // 方式二：this 是 new 这个 function 的时候会产生的一个对象，默认为空
        fn.apply(this, arguments);
        instance = this; // 将创建出来的实例对象赋值给 instance，下一次直接进入 if 然后 return
        // return this; // 隐式调用语句
        // return { name: 'xiejie' }; // 如果显式的返回一个对象，那么外界拿到的值是这个对象
        // 思考：书写 return { name: 'xiejie' } 后，外面依次打印出什么？
        // 答案：xiejie 张三 false 张三 false true
        // 原因：第一次 new 这个 function 的时候，instance 没有值，new 会生成一个空的 {}（假设这个名字叫 A）
        // fn.apply(this, arguments) 会执行 Person 里面的每一条语句，只不过 this 指向的是 A
        // 接下来将 A 这个对象赋值给 instance，然后本来该隐式返回 A 这个对象的，结果你显式返回了一个 {name: 'xiejie'}
        // 所以第一次 var p1 = new singlePerson('张三', 18) 拿到的是 {name: 'xiejie'} 这个对象
        // 然后第二次以及第三次 new singlePerson 的时候，因为 instance 里面有值了，所以直接返回 instance 存储的值
        // instance 存储的是 {name : '张三'}
    }
}

// 人类构造函数
var Person = function (name, age) {
    this.name = name;
    this.age = age;
}

// 获取新的构造函数
var singlePerson = getSingle(Person);

// 测试
var p1 = new singlePerson('张三', 18);
console.log(p1.name); // 张三
var p2 = new singlePerson('李四', 20);
console.log(p2.name); // 张三
console.log(p1 === p2); // true

// 书写了 return { name: 'xiejie' } 后进行测试
// var p3 = new singlePerson('王五', 22);
// console.log(p3.name); // 张三
// console.log(p1 === p3); // false
// console.log(p2 === p3); // true
```



## 工具方法

实现了单例模式后，别着急，工欲善其事，必先利其器。

我们再来书写一个我们会用到的工具方法。

什么工具方法呢？仔细想想，整个游戏中在动的东西特别东，天空在动，大地在动，柱子在动，小鸟也在动。

那么既然要动，就必然会涉及到计时器的书写。

但是一个一个的绑定计时器，比较麻烦，也不方便管理，因此我们期望有一个统一的地方，来管理我们的计时器。

```js
/*
    通过此函数，可以统一的为各个对象绑定一个计时器
    该函数会返回一个计时器对象，该对象会提供两个方法 1. start 创建计时器  2. stop 停止计时器
    该函数接收三个参数
    （1） duration：setInterval 方法的第二个参数   
    （2） thisObj 要绑定在哪一个对象上面  
    （3） callback：要做什么事儿，setInterval 方法的第一个参数
*/
export function getTimer(duration, thisObj, callback) {
  let timer = null; // 存储 setInterval 的返回值，用于停止计时器
  return {
    start: function () {
      // 如果计时器不存在时才会进行计时器的生成
      if (!timer) {
        timer = setInterval(callback.bind(thisObj), duration);
      }
    },
    stop: function () {
      if (timer) {
        clearInterval(timer); // 停止计时器
        timer = null;
      }
    },
  };
}
```

在上面的代码中，我们定义了一个名为 *getTimer* 的方法，该方法会返回一个对象，对象包含两个方法，分别是 *start* 和 *stop*，代表启动计时器和停止计时器，但是启动计时器后要做什么，我们这里是不知道的，所以从外界接收一个 *callback* 回调函数。

注意这里还用到了 *bind* 方法，如果对该方法不熟悉的同学，可以移步：*https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind*



## 天空和大地对象

准备工作完成后，接下来我们就可以开始一个一个完善我们的对象了。

我们先来拿简单的天空和大地对象开刀。

```js
/**
 * 天空
 */

import { getSingle, getTimer, width } from "./utils.js";

function Sky() {
  this.left = 0;
  this.dom = document.querySelector('#game .sky');
  this.timer = getTimer(30, this, this.move);
}
Sky.prototype.show = function () {
  // 重新展示天空这张背景图
  // this.dom.style.left = this.left + "px";
  this.dom.style.transform = `translateX(${this.left}px)`;
};
Sky.prototype.move = function () {
  // 不停的修改 left 值
  this.left -= 1;
  if (this.left === -width) {
    this.left = 0;
  }
  this.show();
};

var SingleSky = getSingle(Sky);

export default SingleSky;
```

上面的代码中，我们创建了一个 *Sky* 的构造函数，*timer* 属性对应 *getTimer* 返回的计时器对象，最后通过 *getSingle* 将其转为单例模式，之后导出。

下面是大地对象的代码，基本上如出一辙：

```js
/**
 * 大地
 */
import { getSingle, getTimer, width } from "./utils.js";

function Land() {
  this.left = 0;
  this.dom = document.querySelector('#game .land');
  this.timer = getTimer(30, this, this.move);
}
Land.prototype.show = function () {
  // 重新展示大地这张背景图
  // this.dom.style.left = this.left + 'px'
  this.dom.style.transform = `translateX(${this.left}px)`;
};
Land.prototype.move = function () {
  this.left -= 4;
  if (this.left === -width) {
    this.left = 0;
  }
  this.show();
};

var SingleLand = getSingle(Land);

export default SingleLand;

```

接下来来到 *Game* 中，前面我们有说过，*Game* 对象算是整个游戏的核心大脑，它会负责调和所有的其他对象

```js
import { getSingle, width, height, getTimer, birdAreaHeight } from "./utils.js";
import Sky from "./sky.js";
import Land from "./land.js";

function Game() {
  this.width = width; // 游戏场景的宽
  this.height = height; // 游戏场景的高
  this.dom = document.getElementById("game"); // dom 元素
  this.paused = true; // 游戏是否暂停
  this.score = 0; // 游戏的分数
  this.isGameOver = false; // 游戏是否结束
  this.sky = null; // 天空
  this.land = null; // 大地
}

/**
 * 游戏初始化方法
 */
Game.prototype.init = function () {
  // 初始化场景中的各个对象
  this.sky = new Sky();
  this.land = new Land();
};

/**
 * 游戏开始方法
 */
Game.prototype.start = function () {
  this.sky.timer.start();
  this.land.timer.start();
};

/**
 * 游戏结束方法
 */
Game.prototype.stop = function () {
  this.sky.timer.stop();
  this.land.timer.stop();
};

/**
 * 向外暴露小鸟跳跃方法
 */
Game.prototype.handleJump = function () {};

/**
 * 游戏记分方法
 */
Game.prototype.getScore = function () {};

/**
 * 检测是否发生碰撞，如果碰撞，则游戏结束
 */
Game.prototype.isCrash = function () {};

var SingleGame = getSingle(Game);

var game = new SingleGame();

export default game;

```

可以看到，*game* 对象中有一个 *init* 方法，负责初始化场景中的各个对象，然后有一个 *start* 方法，负责启动各个对象的 *start* 方法，*stop* 方法同理也是调用其他各个对象的 *stop* 方法。

最后向外部暴露了这个 *game* 对象。



接下来来到 *index.js*，在主函数中调用 *game* 对象的 *init* 方法进行初始化即可。

```js
import game from "./game.js";
function main() {
  // 1. 进行初始化
  game.init();
  
  // 2. 启动游戏
  game.start();
}

main();
```



## 柱子对象

如果完成了上一个步骤，那么我们已经能够看到移动起来的天空和大地了。

接下来我们来书写柱子对象。

相比前面天空和大地，柱子稍微麻烦一些，首先它不是单例，其次就是上下的长度是随机的。

我们先来解决长度随机的问题，看下面的图：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-25-083735.png" alt="image-20220825163734638" style="zoom:50%;" />

通过上面的图我们可以知道，已知游戏容器总高度，大地的高度，我们就能计算出小鸟的活动高度为 *600-112*。

接下来针对每一组柱子，中间的间隙我们固定为 *150*，一个柱子的最小值为 *60*，这样就能算出柱子的最大值为 *600 - 112 - 150 - 60*

有了柱子最小值和最大值的信息后，我们就可以来随机的生成每一组柱子的高度，首先封装一个随机函数：

```js
/**
 * 返回指定范围的随机数
 * @param {*} min 最小值范围
 * @param {*} max 最大值范围
 */
export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
```

之后调用此随机函数，生成一组柱子中的其中一根柱子的随机高度，另外一根柱子根据上面的公式也就能够计算出来了。

```js
var minHeight = 60, // 柱子的最小高度
    gap = 150, // 柱子中间的缝隙
    maxHeight = birdAreaHeight - gap - minHeight; // 柱子的最高高度
// 接下来来确定一组柱子的高度
const h1 = getRandom(minHeight, maxHeight);
const h2 = birdAreaHeight - h1 - gap;
```

一组柱子的高度出来后，后面的事情就比较轻松了，我们创建对应的 *dom* 元素，设置好相应的信息即可，如下：

```js
// 创建上方的柱子
const div1 = document.createElement("div");
div1.className = "pipeup";
div1.style.height = h1 + "px";
div1.style.left = width + "px";

// 将上方柱子添加到文档碎片
fragment.appendChild(div1);

// 还需要将这个柱子添加数组里面，方便后面判断操作
Pipe.all.push({
  dom: div1, // dom 属性指向当前的 div
  height: h1,
  width: this.width,
  top: 0,
  left: width,
});

// 创建下方的柱子
const div2 = document.createElement("div");
div2.className = "pipedown";
div2.style.height = h2 + "px";
div2.style.left = width + "px";

// 将下方柱子添加到文档碎片
fragment.appendChild(div2);

// 还需要将这个柱子添加数组里面，方便后面判断操作
Pipe.all.push({
  dom: div2, // dom 属性指向当前的 div
  height: h2,
  width: this.width,
  top: h1 + gap, // 下方柱子的 top 值 = 上面柱子的高度 + 空隙
  left: width,
});

// 添加到页面中
document.getElementById("game").appendChild(fragment);
```

在上面的代码中，我们还将创建好的 *dom* 对象再次封装成一个新的柱子对象，推入到了 *Pipe.all* 数组里面。*Pipe.all* 是 *Pipe* 的一个静态属性，用来存储所有的柱子对象，方便我们后面来进行操作。



要想在界面上看到新增的柱子，我们还需要补充柱子对应的 *CSS* 样式：

```css
/* 水管的样式 */

#game .pipeup{
    background: url('../img/pipeDown.png') no-repeat left bottom;
    width: 52px;
    height: 200px;
    position: absolute;
    top: 0;
    right: 0;
}

#game .pipedown{
    background: url('../img/pipeUp.png') no-repeat;
    width: 52px;
    height: 200px;
    position: absolute;
    bottom: 112px;
    right: 0;
}
```

接下来是柱子的移动。不同于天空大地仅仅是当前对象移动，柱子的移动是所有的柱子都要一起移动，因此我们选择仍然是书写一个静态方法，来控制所有柱子的移动：

```js
// 这是一个静态方法，用于移动 all 数组里面的所有柱子
Pipe.timer = getTimer(30, Pipe, function () {
  for (let i = 0; i < Pipe.all.length; i++) {
    const p = Pipe.all[i]; // 得到当前的柱子
    p.left -= 2; // 通过修改 left 的值来让柱子进行移动
    if (p.left < -p.width) {
      // 如果进入到此 if，说明柱子已经移动到了舞台之外
      p.dom.remove(); // 从屏幕上面移除
      Pipe.all.splice(i, 1); // 从数组中删除该柱子
      i--;
    } else {
      // 如果进入 else，说明柱子没有抛出舞台
      // p.dom.style.left = p.left + 'px';
      p.dom.style.transform = `translateX(${p.left - width}px)`;
    }
  }
});
```

在上面的代码中，我们遍历了 *all* 数组中所有的柱子，然后通过改变 *left* 值使其移动。如果柱子已经移出了游戏舞台外面，则删除。

柱子除了从左往右移动以外，本身还需要不停的产生新的柱子。因此我们在 *game* 对象上面新增一个计时器

```js
// 制作柱子的计时器
this.produceTimer = getTimer(2500, Pipe, function () {
  new Pipe();
});
```

该计时器用于每隔 *2.5* 毫秒生成一对新的柱子。



当你书写完上面的步骤后，你能看到移动的天空、大地以及不停生成新的往左边移动的柱子。但是你也会发现一个问题，就是当我们切屏之后，再次切换回去时，会出现一大堆堆在一起的柱子。这是怎么回事儿呢？

这里实际上是因为浏览器的优化机制导致的。为了更极致的优化，在我们切换 *tab* 或者切屏之后浏览器会把 *setInterval* 的执行效率降低。不足一秒的计时器会将频率调整至一秒。不同的浏览器这个优化机制的时间可能还不一样。

怎么解决这个问题呢？

很简单，我们监听 *visibilitychange* 时间，监测到用户切屏后，暂停游戏即可。

```js
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    game.stop();
    game.paused = true;
  }
});
```

至此，我们就完成了柱子对象的书写。



## 小鸟对象

小鸟对象整体来讲有三个关键的点，我们一个一个来看。

首先第一个就是小鸟的图片是不停在切换的，从而营造出一种小鸟在飞的效果。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-25-095026.png" alt="image-20220825175025540" style="zoom:50%;" />

而小鸟图片的素材是这样的，这就需要我们利用图片定位技术，不停的切换小鸟的背景图。

```js
function Bird(){
  // ...略
  this.wingIndex = 0; // 记录当前小鸟的图片索引，翅膀是处于哪个位置
  // 小鸟的第一个计时器，不停的变换小鸟的背景图，呈现出小鸟在飞行的视觉效果
  this.wingTimer = getTimer(100, this, function () {
    this.wingIndex = (this.wingIndex + 1) % 3; // 重新计算当前应该显示小鸟图片的索引
    this.show(); // 调用 show 方法来重新显示当前的小鸟图片
  });
}
```

在上面的代码中，我们为 *bird* 对象定义了一个 *wingIndex* 属性，用于记录当前小鸟的图片索引。之后新增 *wingTimer* 计时器，不停的修改对应的索引值。之后调用了 *show* 方法来重新显示小鸟对应图片。



其次，小鸟是要做自由落体运动的，这里必然也会涉及到计时器的使用，而且由于是自由落体运动而非匀速，所以我们这里会用到物理学里面的匀加速运动  S = vt + 1/2 * a * t * t

```js
// 小鸟的第二个计时器，控制这个小鸟不停的下落，实际上就是在不停的修改 top 值
// 涉及到一个物理里面的匀加速运动  S = vt + 1/2 * a * t * t
// 获取匀加速一段时间后的末速度  假设初始速度为 v0，加速度为 a 的情况下，物体运行了 t 时间后，末速度为 v = v0 + a * t
this.dropTimer = getTimer(16, this, function () {
  // 每过 16 毫秒，就需要去计算小鸟现在的向下位移情况
  var s = this.speed * 16 + 0.5 * this.a * 16 * 16;
  this.setTop(this.top + s); // 重新设置小鸟的 top 值
  this.speed = this.speed + this.a * 16; // 更新当前向下的速度
  this.show();
});
```

在上面的代码中，我们计算出每过 *16* 毫米小鸟下移的距离，然后调用 *setTop* 方法更新小鸟的 *top* 值即可，该方法如下：

```js
/**
 * 设置小鸟 top 值的方法
 */
Bird.prototype.setTop = function (newTop) {
  if (newTop < 0) {
    newTop = 0;
  } else if (newTop > birdAreaHeight - this.height) {
    newTop = birdAreaHeight - this.height;
  }
  this.top = newTop;
};
```

更新了新的 *top* 值之后，将当前的速度也进行更新，最后也是调用  *show* 方法来重新显示小鸟。



最后就是前面两个方法都用到了的 *show* 方法了。

```js
/**
 * 显示小鸟的方法
 */
Bird.prototype.show = function () {
  // 设置新的 top 值
  // this.dom.style.top = this.top + "px";
  // 之所以要减去 150，是因为小鸟一开始有 150 的 top 值
  this.dom.style.transform = `translateY(${this.top - 150}px)`;
  // 根据图片的索引值，来决定背景图的位置
  if (this.wingIndex === 0) {
    this.dom.style.backgroundPosition = "-8px -10px";
  } else if (this.wingIndex === 1) {
    this.dom.style.backgroundPosition = "-60px -10px";
  } else {
    this.dom.style.backgroundPosition = "-113px -10px";
  }
};
```

做的事情主要有两件，一件是更新 *dom* 的 *top* 值，另一件是根据图片的索引值，来决定背景图的位置。



最后，小鸟对象还提供了一个跳跃的方法，方便用户在进行操作时，小鸟能向上移动一段距离。

```js
Bird.prototype.jump = function () {
  this.speed = -0.5;
};
```

整体思路也很简单，就是将将下落的速度修改为负值，这样的话就可以反方向的移动一段距离。

但是因为加速度是正值，所以向上移动一段距离后，就会重新开始下落。

绑定对应的事件如下：

```js
document.addEventListener("keydown", function (e) {
  if (e.key === " ") {
    game.handleJump(); // 如果用户按的是空格，就往上移动一段距离
  } else if (e.key === "Enter") {
    // ...略
  }
});

// 3. 点击鼠标也能操作小鸟跳动
document.addEventListener("click", function () {
  game.handleJump(); // 如果用户按的是空格，就往上移动一段距离
});
```



## 得分检测

至此，我们的游戏已经完成了各个对象的移动，小鸟的自由落体以及按下空格小鸟往上移动的效果。

接下来我们来看一下如何评判得分。

这里的思路是首先遍历 *Pipe.all* 里面的所有柱子，如果小鸟当前的 *left* 已经大于了柱子的 *left* 加上柱子自己本身的宽度，则我们判定小鸟已经通过了该柱子，给该柱子打上一个标记 *pass*（防止下一次重复加分），因为有上下两根柱子，因此每根柱子只增加 *0.5* 分。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-25-101449.png" alt="image-20220825181448680" style="zoom:50%;" />

对应的代码如下：

```js
/**
 * 游戏记分方法
 */
Game.prototype.getScore = function () {
  // 遍历所有的柱子
  for (var i = 0; i < Pipe.all.length; i++) {
    var p = Pipe.all[i]; // 获取当前的柱子
    if (this.bird.left > p.left + p.width && !p.pass) {
      p.pass = true; // 说明当前的这根柱子已经计过分
      this.score += 0.5; // 因为有上下两根柱子，而遍历的是所有的柱子，所以一次只增加 0.5 分
      document.querySelector("#game .score").innerHTML = this.score;
    }
  }
};
```



## 碰撞检测

离游戏的完成，只剩下最后一步了，目前我们的游戏，小鸟就像一条咸鱼一样，或者说就像开启了金手指一样，躺着的分。

要解决这个问题，我们需要做的那就是检测碰撞。

碰撞这里其实又分为两种情况，一种是小鸟碰到地面了，另外一种是小鸟碰到柱子了。



**小鸟碰到地面**

这种情况是比较好检测的，我们只需要对小鸟当前的 *top* 值进行检查即可。

```js
if (this.bird.top === birdAreaHeight - this.bird.height) {
  this.stop(); // 停止游戏
  document.querySelector("#game .score").style.display = "none";
  document.querySelector("#game .over").innerHTML += this.score;
  document.querySelector("#game .over").style.display = "block";
  this.isGameOver = true;
  return;
}
```



**小鸟碰到柱子**

这种情况就要稍微思考一下了🤔

两个物体我们如何判定是否撞在一起了呢？我们先以一个 *X* 轴为例，看下面的图：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-25-102604.png" alt="image-20220825182603976" style="zoom:33%;" />

首先取两个物体的中心点，计算出第一个物体中心点到第二个物体中心点的距离。如果这个距离大于两个物理宽度之和的一半，就说明水平方向是没有碰撞的；如果等于宽度之和的一半，说明已经到达了临界点；如果小于宽度之和的一半，则说明水平方向已经碰撞。

因此，我们可以写出如下的代码：

```js
// 小鸟是否碰撞到柱子
let bx = this.bird.left + this.bird.width / 2; // 获取小鸟 x 轴方向的中心点
let by = this.bird.top + this.bird.height / 2; // 获取小鸟 y 轴方向的中心点
// 接下来我们需要去遍历所有的柱子，判断小鸟是否和柱子碰撞
for (let i = 0; i < Pipe.all.length; i++) {
  let p = Pipe.all[i]; // 获取当前的柱子

  // 如果柱子带有 pass 属性
  // 说明小鸟已经通过了这一根柱子了
  // 则不需要进行后面的碰撞检测
  if (p.pass) {
    continue;
  }
  // 接下来来检测两个矩形是否碰撞
  // 横向 ： |矩形1x中心点到矩形2x中心点距离| < 两个矩形宽度之和/2
  // 纵向 ： |矩形1y中心点到矩形2y中心点距离| < 两个矩形高度之和/2
  let px = p.left + p.width / 2; //  柱子 x轴方向的中心点
  let py = p.top + p.height / 2; //  柱子 y轴方向的中心点
  if (
    Math.abs(bx - px) < (p.width + this.bird.width) / 2 &&
    Math.abs(by - py) < (p.height + this.bird.height) / 2
  ) {
    this.stop(); // 停止游戏
    document.querySelector("#game .score").style.display = "none";
    document.querySelector("#game .over").innerHTML += this.score;
    document.querySelector("#game .over").style.display = "block";
    this.isGameOver = true;
    return;
  }
}
```

注意在进行判断的时候，需要遍历所有的柱子，但是这里有一个优化的手段，那就是如果柱子带有 *pass* 属性，说明小鸟已经通过了这一根柱子了，则不需要进行后面的碰撞检测了。



至此，我们就完成了整个像素鸟小游戏，你学废了么 -）

---

-*EOF*-
