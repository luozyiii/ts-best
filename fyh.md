# 一、类型擦除是什么？

我们可以通过下面工具对 ts 语法擦除；esbuild 和 swc 擦除速度快，是因为不检查 ts 语法。

```ts
// fyh/1.ts
const a: number = 1;
console.log(a);
```

```bash
# 方法一
npm i esbuild -g

esbuild fyh/1.ts
# or
esbuild fyh/1.ts -> fyh/1.js

# 方法二：swc
npm i @swc/cli @swc/core -g

npx swc fyh/1.ts
# or
npx swc fyh/1.ts -o fyh/1.js

# 方法三
npm install -g typescript

tsc fyh/1.ts

# 方法四
babel

```

### TypeScript、ES6、ES5 的关系

```
TypeScript ->可在 Deno 直接运行
TypeScript (类型擦除)-> ES6 (转译)-> ES5 (打包)-> 单文件 -> 供浏览器下载
ES6 -> Node.js 12+、Chrome 100
ES5 -> Node.js 10-、IE 11-
```

# 二、如何运行 TypeScript？

#### [TypeScript Playground](https://www.typescriptlang.org/play)

#### 在线编辑器

- [playcode.io](https://playcode.io/typescript)
- [stackblitz](https://stackblitz.com)
- [codesandbox](https://codesandbox.io)

#### 本地编辑 + 浏览器

使用 [vite](https://cn.vitejs.dev/guide/#trying-vite-online) 运行 typescript

```bash
npm create vite@latest my-react-app
```

#### 本地编辑 + Node

```bash
# ts-node
npm install -g ts-node
ts-node fyh/1.ts

# swc-node
npm i @swc-node/register

node -r @swc-node/register fyh/1.ts

# esno
npx esno fyh/1.ts
```

# 三、如何调试 TS?

鼠标移动到报错点，查看报错提示

# 四、推荐书籍

- 编程与类型系统
- Typescript 编程
- 类型和程序设计语言

# 五、数据类型 DataType

### JS 数据类型

```
null undefined
string number boolean
object symbol
object( 含Array、Function、Date... )
```

### TS 数据类型， 上面所有，再加上

```
void、never、enum、unknown、any
再加上自定义类型type、interface
```

### 值/类型

```
值
null undefined true false
1 2 3 4 5 6 7 8 9...
a b c d e ...
{} []
{name: 1} [1,2,3]
new Date() new String() new Number() new RegExp()
(a,b)=> a+b

类型
type number = 1 | 1.1 | 2 | ...
type string = a | b | c | ab ...
type boolean = true | false
type Object = {?} | Array | Function | String | Number | Boolean | RegExp | ...
```

为什么有俩个 number、string、boolean 呢？

### number 42 vs new Number(42)

```
42 : 0000001...

vs

{
  constructor: ...,
  toFixed: ..,
  toString: ...,
  valueOf: function() {
    return 42
  }
}
```

JS 中的 Number String Boolean 只用于包装对象；
正常开发者不用它们，在 TS 里也不用。

# 六、用类型签名和 Record 描述对象

问题：type Object 表示的范围也太大了

```
empty1 = {} empty2 = {}
a1 = {name: 'a1'} b1 = {b: 'b1', c: 'c'}
arr1 = [] arr2 = [1,2,3] arr3 = [1, 'b'] arr4 = [{b: 1}, 1]
f1 = () => 1  f2 = function(){console.log(this.name)} f3 = (a,b) => a + b
date1 = new Date() r1 = /abc+c/ r2 = new RegExp('abc+c')

这些值的类型都是Object
```

所以，我们在 TS 里一般不用 Object

### 如何在 TS 里描述对象的数据类型？

```
对象 = 普通对象(Object) -> 数组对象 Array
                       -> 函数对象 Function
                       -> 正则对象 RegExp
                       -> 日期对象 Date
```

```ts
// 1. 用class / constructor
const a: Array = () => console.log(1); // 错
const a: Date = () => console.log(1); // 错
const a: Function = () => console.log(1); // 正确

// 2. 用type或interface描述
type Person = {
  name: string;
  age: number;
};
interface Person {
  name: string;
  age: number;
}

// 3. 索引签名 number string symbol
type A = {
  [k: string]: number;
};

// 4. 泛型
type A2 = Record<string, number>;
```

结论：由于 Object 不太精确，所以 TS 开发者一般使用索引签名或 Record 泛型来描述普通对象

# 七、用 [] 和 Array 泛型描述数组

```ts
type A = string[]; // 等价于 type A = Array<string>
const a: A = ['a', 'b'];

type N = number[]; // 等价于 type N = Array<number>
const n: N = [23, 0.9];

type D = [string, string, string];
const d: D = ['hello', 'world', 'abc']; // 对
const derror: D = ['hello', 'world']; // 错

type E = [string, number];
const e: E = ['我', 18];

type F = [string[], number[]];
const f: F = [
  ['ni', 'shi', 'shui'],
  [1, 2],
];
```

由于 Array 不太精确，所以 TS 开发者一般用 `Array<?>`或 `string[]`或`[string,number]`来描述数组

# 八、函数对象，该怎么描述？

```ts
// 常用
type FnA = (a: number, b: number) => number;
const a: FnA = (x: number) => {
  return 123;
};
a(1); // 报错

type FnB = (x: string, y: string) => string;

type FnReturnVoid = (s: string) => void;
type FnReturnUndefined = (s: string) => undefined;

const v: FnReturnVoid = (s: string) => {
  console.log(s);
};

const u: FnReturnUndefined = (s: string) => {
  console.log(s);
  return undefined;
};

// this
type Person = { name: string; age: number; sayHi: FnWithThis };
type FnWithThis = (this: Person, name: string) => void;

const sayHi: FnWithThis = function () {
  console.log('hi ' + this.name);
};

const x: Person = { name: 'frank', age: 18, sayHi: sayHi };

x.sayHi('Jack'); // hi frank
sayHi.call(x, 'Jack'); // hi frank
```

结论：由于 Function 不太精确，所以 TS 开发者一般用`() => ?` 来描述函数

# 九、其它对象一般直接用 class 描述

```ts
const d: Date = new Date();
const r: RegExp = /ab+c/;
const r2: RegExp = new RegExp('ab+c');
const m: Map<string, number> = new Map();
m.set('xxx', 1);
const vm: WeakMap<{ name: string }, number> = new WeakMap();
console.log(vm);

const s: Set<{ name: string }> = new Set();
s.add({ name: 'abc' });
const ws: WeakSet<string[]> = new WeakSet();
console.log(ws);
```
