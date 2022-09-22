# JS 面向对象再学习



```js
class Satr{
    constructor(name){
        this.name = name; 
    }
}
```

```js
class Father{
    constructor(xing){
        this.xing = xing;
    }
    say(){
        return 'i am father'
    }
}

class Son extends Father{
    construvtor(xing, ming){
        super(xing);//	super必须在子类this之前调用
        this.ming = ming
        console.log(this.xing, this.ming)
    }
    say(){
        console.log(super.say() + '的儿子')
    }
}
```

类再ES6没有变量提升，不能再类定义之前使用类

利用构造函数创建对象

```js
function Star(name, age){
    this.name = name;
    this.age = age;
    this.song = function() {
        console.log(' ican sing song.')
    }
}
Star.sex = "男";//	静态成员，只能通过构造函数访问，Satr

const 张学友 = new Start('张学友', 18)
```

*this创建的对象为实例对象，实例对象只能用实例化的对象调用，也就是需要被 <u>new</u>*

构造函数创建实例都西昂浪费空间，对象内复杂的对象在实例化的时候会开辟新的内存

```js
function A(){
    this.run = function(){
        return 'Hello World!'
    }
}
const b = new A();
const c = new A();
b.run === c.run;//	false
```

**每一个构造函数都有一个原型对象 <u>prototype</u> **

每一个实例共享对象



实例对象的`__proto__`指向原型对象的`prototype`

先查找对象身上的，案子查看`__proto__`上的

`__proto__`和`prototype`中的`constructor`指向构造函数本身(这也是他的作用)

构造函数的`prototype`被覆盖了的话用`constructor`指回原来的构造函数





call调用函数，并改变this

```js
function fn(){
    console.log('Hello,world!');
}
fn.call();//	Hello,world!
//	fn的this为window
fn.call(obj);
//	fn的this为obj

function a(x, y){
    console.log(this, x, y)
}
a.call(obj, x, y);//	第一个参数是this指向
```

```js
function Father(name){
    this.name = name;
}
function Son(name){
    Father.call(this, name);//	call执行了Father，并把自己的this传递进去，此时，Father进行this.name = name操作实际上是给Son添加name
}

Son.prototype = Father.prototype;
Son.prototype.constructor = Son;
//	以上操作是错误的，也会改变父对象的方法

//	正确
Son.prototype = new Father();
Son.prototype.constructor = Son;
//	或者
Son.prototype.__proto__ = Father.prototype
```



**Object.defineProperty**

`Object.defineProperty(obj, prop, descriptor)`

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#参数)

- `obj`

  要定义属性的对象。

- `prop`

  要定义或修改的属性的名称或 [`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 。

- `descriptor`

  要定义或修改的属性描述符。

  

- `configurable`

当且仅当该属性的 `configurable` 键值为 `true` 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
**默认为** **`false`**。

- `enumerable`

  当且仅当该属性的 `enumerable` 键值为 `true` 时，该属性才会出现在对象的枚举属性中。 **默认为 `false`**。

数据描述符还具有以下可选键值：

- `value`

  该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。 **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。

- `writable`

  当且仅当该属性的 `writable` 键值为 `true` 时，属性的值，也就是上面的 `value`，才能被[`赋值运算符` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#assignment_operators)改变。 **默认为 `false`。**

存取描述符还具有以下可选键值：

- `get`

  属性的 getter 函数，如果没有 getter，则为 `undefined`。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 `this` 对象（由于继承关系，这里的`this`并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。 **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。

- `set`

  属性的 setter 函数，如果没有 setter，则为 `undefined`。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 `this` 对象。 **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。

#### 描述符默认值汇总

- 拥有布尔值的键 `configurable`、`enumerable` 和 `writable` 的默认值都是 `false`。
- 属性值和函数的键 `value`、`get` 和 `set` 字段的默认值为 `undefined`。











* 函数的特殊定义方式

```js
const fn = new Function('a','b','console.log(a + b);');//	必须使用字符串
```



```js
function(){}//	调用者
() => {}//	当前环境，定义者
```



applay

```js

function fn (a, b){
    return a + b;
} 

console.log(fn.applay(window, [1, 2]));//	参数是数组，返回值是函数返回值
```

bind

```
不调用函数
返回值是新的函数，是原函数的拷贝
```



严格模式

```js
'use strict';


提高编译器效率，消除不安全，取消不严谨，增加了不可用的关键词
//	1. 不能不定义变量就是用 a = 32
//	2. 布恩那个删除以生命好的变量 delete a
//	3. this指向为undefined
//	4. 定时器还是window、
//	5. 函数不允许参数重复function a(b, b)
//	6. 不允许再非函数块中写函数
```



高阶函数：返回值是函数

函数柯里化：部分求值，外层函数值第一次调用后固定，内层函数可变



浅拷贝是复制第一层

```js
const a = {
    name:'何夕',
    age:12
}
//	1
let b = {}
for (let i in a){
    b[i] = a[i];
}
//	2
Object.assign(b, a);//	b为需要改变的东西，a为模板
//	3
b = {...a}
```

深拷贝

```js
递归判断类型
```





* 冒泡
* 正则
* Object、Array和迭代器等方法，map，set等
* event loop
* promise
* 宏任务微任务
* 报错
* 异步错误捕获



* **算法**