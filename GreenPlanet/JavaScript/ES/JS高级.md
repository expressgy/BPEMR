# JavaScript高级知识

> 2022/6/20



## 语法和数据类型

变量的名字又叫做**标识符**

严格模式下直接赋值会出错`x = 12`

如果没有赋初始值，则其值为 undefined

var可以变量提升，let不行

使用 undefined 来判断一个变量是否已赋值 `input === undefined`

`undefined` 值在布尔类型环境中会被当作 `false` 。

```js
var myArray = [];
if (!myArray[0])   myFunction();
```

数值类型环境中 `undefined` 值会被转换为 `NaN`。

```js
var a;
a + 2;    // 计算为 NaN
```

当你对一个 `null` 变量求值时，空值 `null` 在数值类型环境中会被当作 0 来对待，而布尔类型环境中会被当作 `false`。例如：

```js
var n = null;
console.log(n * 32); // 在控制台中会显示 0
```

对于函数来说，只有函数声明会被提升到顶部，而函数表达式不会被提升。

```js
/* 函数声明 */

foo(); // "bar"

function foo() {
  console.log("bar");
}


/* 函数表达式 */

baz(); // 类型错误：baz 不是一个函数

var baz = function() {
  console.log("bar2");
};
```

在同一作用域中，不能使用与变量名或函数名相同的名字来命名常量。例如：

```js
// 这会造成错误
function f() {};
const f = 5;

// 这也会造成错误
function f() {
  const g = 5;
  var g;

  //语句
}
```

七种基本数据类型：Boolean、null、undefined、数字、高精度整数BigInt、字符串、Symbol

立即执行函数：立即执行函数只有一个作用：创建一个独立的作用域。这个作用域里面的变量，外面访问不到（即避免了「变量污染」）。

```js
let a = 'xsxs';
(() => {let a;console.log(a)})()
```

字符串转换

```js
x = "The answer is " + 42 // "The answer is 42"
y = 42 + " is the answer" // "42 is the answer"

"37" - 7 // 30
"37" + 7 // "377"

```

字符串

```js
var str = "this string \
is broken \
across multiple\
lines."
console.log(str);   // this string is broken across multiplelines.

```





## 流程控制和错误处理

下面这些值将被计算出 false (also known as Falsy values):

- `false`
- `undefined`
- `null`
- `0`
- `NaN`
- 空字符串（`""`）





## 函数

调用自身

1. `arguments.callee()` **（译者注：ES5 禁止在严格模式下使用此属性）**

剩余参数
剩余参数语法允许将不确定数量的参数表示为数组。在下面的例子中，使用剩余参数收集从第二个到最后参数。然后，我们将这个数组的每一个数与第一个参数相乘。这个例子是使用了一个箭头函数，这将在下一节介绍。

```js
function multiply(multiplier, ...theArgs) {
  return theArgs.map(x => multiplier * x);
}

var arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]
```



箭头函数和普通函数

箭头函数 没有proptype属性，没有arguments，不能用new创建

```js
"use strict"
const a1 = () => ({
	name:"THIS",
	method:{
		get(){
			console.log(this.names)
		}
	}
})

const obj = {
	name:a1().name,
	names:"I CAN DO IT",
	...a1().method
}

console.log(obj.name)
obj.get()
```

this指向，普通函数指向调用者，箭头函数指向定义者



void 或者 void 不会返回内容







Map

键可以为任意类型



Set集合，元素不重复
