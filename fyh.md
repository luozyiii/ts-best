# TS = JS + 类型系统

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

# 十、any 和 unknown 的区别， never 是什么

```ts
// unknown 未知集，开始不知道类型，后面断言 自己确定类型
const a: unknown = ajax.get('/api/user');
const b = a as number; // 将 a 断言成 number

// any 全集， 任意类型都可以，尽可能别用

// never 空集： 用于类型推断
type A = string | number | boolean;
const a: A = 'hello' as any;

if (typeof a === 'string') {
  a.split('');
} else if (typeof a === 'number') {
  a.toFixed();
} else if (typeof a === 'boolean') {
  a.valueOf();
} else {
  // never
  a.toString(); // 报错
  console.log('mei le');
}
```

# 十一、何时用 enum, 何时不用

```ts
// 基本用法
enum A {
  todo = 0, // 逗号分隔, 后面不赋值，自动加1
  done,
  archived,
  deleted,
}
let status = 0;
status = A.todo;
status = A.done;
console.log(status);

export {};

// 前端权限 例：文章的读写
enum Permission {
  None = 0, // 0000
  Read = 1 << 0, // 0001
  Write = 1 << 1, // 0010
  Delete = 1 << 2, // 0100
  Manage = Read | Write | Delete, // 0111
}

type User = {
  permission: Permission;
};

const user: User = {
  permission: 0b0010, // 写权限
};

if (canWrite(user.permission)) {
  console.log('拥有写权限');
}

if (canManage(user.permission)) {
  console.log('拥有管理权限');
}

function canWrite(p: Permission) {
  // 若 a & b === b; 则 a 有 b 的所有
  return (p & Permission.Write) === Permission.Write;
}
function canManage(p: Permission) {
  return (p & Permission.Manage) === Permission.Manage;
}
```

```ts
// 不用的时候
enum Fruit {
  apple = 'apple',
  banana = 'banana',
}
let f: Fruit = Fruit.apple;
f = Fruit.banana;
console.log(f);

// 上下两种含义几乎一致，推荐下面用法

type Fruit = 'apple' | 'banana';
let f: Fruit = 'apple';
f = 'banana';
console.log(f);
```

结论： 当 number 时， 使用 enum； string 时，不使用 enum；other 时，也不使用 enum。

# 十二、type 与 interface 区别

### 什么时候用 type？几乎都可以用

类型别名 type Alias： 给其他类型取个名字; type 并不是新建一个类型，只是别名

```ts
type Name = string;
type FalseLike = 0 | '' | null | undefined | false;
type Point = { x: number; y: number };
type Points = Point[];
type Line = [Point, Point];
type Cricle = { conter: Point; radius: number };
type Fn = (a: number, b: number) => number;
// 带有属性的函数 的声明
type FnWithProps = {
  (a: number, b: number): number;
  prop1: number;
};
const fn: FnWithProps = (x, y) => {
  return x + y;
};
fn.prop1 = 1;
```

### 什么时候用 interface？

声明接口，描述`对象`的属性

```ts
interface Data {
  [k: string]: string;
}
interface Point {
  x: number;
  y: number;
}
interface X {
  age: number;
}
// 数组带属性
interface Points extends Array<Point>, X {
  name: string;
}
// 等价于
type Points2 = Array<Point> & {
  name: string;
} & X;

interface Fn {
  (x: number, y: number): number;
}
interface Date2 extends Date {}
```

### type 不可重新赋值， interface 自动合并

```ts
// file1.ts
interface X {
  name: string;
}
interface X {
  age: number;
}
const x: X = {
  name: 'hi',
  age: 10,
};
```

```ts
// custom.d.ts
// 拓展axios
import { AxiosRequestConfig } from 'axios';
declare module 'axios' {
  export interface AxiosRequestConfig {
    _autoLoading?: boolean;
    _mock?: string;
  }
}

// 拓展String
declare global {
  interface String {
    padZero(length: string): void;
  }
}
const s = 'hello';
s.padZero('hi');
```

### type vs interface

- 区别 1 :interface 只是`描述对象`，type 则描述所有数据
- 区别 2: type 只是 `别名`，interface 则是类型声明
- 区别 3: 对外 API 尽量用 interface， 方便拓展，对内尽量用 type，防止代码分散

# 十三、纠错 - void

有时松，有时紧

```ts
type Fn = () => void;

const fn: Fn = () => {
  return 'xx'; // 不报错
};

const a = fn();
console.log((a as any).toString());

function f(a: number): void {
  return 123; // 报错
}

const f2 = function (): void {
  return 1; // 报错
};
```

# 十四、联合类型 => 类型收窄

`JS` 可以对`值`进行加减运算，如果把 TS 的类型系统当作一门语言；`TS`可以对`类型`进行各种`运算`。

### 联合类型（并集）

```ts
type A1 = number;
type B1 = string;
type C1 = A1 | B1;
const c1: C1 = 40;

type A2 = { name: string };
type B2 = { age: number };
type C2 = A2 | B2;
const c2: C2 = {
  name: 'leslie',
  age: 18,
};

// 提示：
// type A2 = {name: string}
// 表示name为string的所有对象
// 但不要错误地以为这些对象只有name 一个key;
// 比如对象 {name: 'hi', age: 18}也是A 类型的；
// 即A类型的对象可以有age，也可以没有age

// 同理
// type B2 = { age: number }
// 表示 age为number的对象，
// 这些对象的name 可以为空，也可以不为空
```

### 如何使用联合类型？ - 类型收窄

```ts
// 既不能把 a 当作number
// 也不能把 a 当作string
// 那么，怎么使用 a 变量呢
// 答：想办法把类型区分开(类型收窄)
const f1 = (a: number | string) => {
  a.toFixed(); // 报错

  // 使用 typeof 区分类型
  if (typeof a === 'number') {
    a.toFixed();
  } else {
    a.split(',');
  }
};
```

typeof 有局限性:用于简单类型 string, number, boolean...简单类型

```ts
// 使用 instanceof 区分类型
const f1 = (a: Date | Date[]) => {
  if (a instanceof Date) {
    a.toISOString();
  } else if (a instanceof Array) {
    a[0].toISOString();
  } else {
    throw new Error('never no this');
  }
};
// instanceof 的局限性
// 1、不支持 string, number, boolean...简单类型
// 2、不支持TS独有类型

// 2、不支持TS独有类型
type Person = {
  name: string;
};
const fn1 = (a: Person | Person[]) => {
  if (a instanceof Person) {
    // 报错：“Person”仅表示类型，但在此处却作为值使用。
  } else {
    throw new Error('never no this');
  }
};

// 使用in收窄类型， 只适用于部分对象
type Person = {
  name: string;
};
type Animal = {
  x: string;
};
const fn1 = (a: Person | Animal) => {
  if ('name' in a) {
    a;
  } else if ('x' in a) {
    a;
  } else {
    a;
  }
};

// 使用JS中判断类型的函数来区分
const f1 = (a: string | string[]) => {
  if (Array.isArray(a)) {
    a.join('\n').toString();
    // 此处 a 的类型 是 string[]
  } else if (typeof a === 'string') {
    parseFloat(a).toFixed(2);
  } else {
    throw new Error('never no this');
  }
};

// 使用逻辑收窄类型
const f1 = (a?: string[]) => {
  if (a) {
    a; // string[]
  } else {
    a; // undefined
  }
};
const f2 = (a: string | number) => {
  a = 1;
  a; // number
};
const f3 = (x: string | number, y: string | boolean) => {
  if (x === y) {
    x; // string
    y; // string
  } else {
    x; // string | number
    y; // string | boolean
  }
};
```

以上所有的收窄都是通过 JavaScript 实现，众所周知、JS 类型系统很垃圾；有没有区分类型的万全之法

### 类型谓词/类型判断 is

```ts
type Rect = {
  height: number;
  width: number;
};
type Circle = {
  center: [number, number];
  radius: number;
};

const f1 = (a: Rect | Circle) => {
  if (isRect(a)) {
    a; // Rect
  } else if (isCircle(a)) {
    a; // Circle
  }
};

function isRect(x: Rect | Circle): x is Rect {
  return 'width' in x && 'height' in x;
}

function isCircle(x: Rect | Circle): x is Circle {
  return 'center' in x && 'radius' in x;
}
```

### 如何使用联合类型？ 用 a.kind 区分 a 的类型

```ts
// 既不能把 a 当作number
// 也不能把 a 当作string
// 那么，怎么使用 a 变量呢
// 答：想办法把类型区分开(类型收窄)
const f1 = (a: number | string) => {};

// 这代码看起来很傻，简单问题复杂化
type A = { kind: 'string'; value: string };
type B = { kind: 'number'; value: number };

const f1 = (a: A | B) => {
  if (a.kind === 'string') {
    a;
  } else {
    a;
  }
};
f1({ kind: 'string', value: 'hi' });

// 再看另一个示例
type Circle = { kind: 'Circle'; center: [number, number] };
type Square = { kind: 'Square'; sideLength: number };
type Shape = Circle | Square;
const f1 = (a: string | number | Shape) => {
  if (typeof a === 'string') {
    a; // string;
  } else if (typeof a === 'number') {
    a; // string;
  } else if (a.kind === 'Circle') {
    a; // Circle
  } else {
    a; // Square
  }
};

// 要求 T = A | B | C | D | ...
// 1、A、B、C、D...有相同属性的kind或其它
// 2、kind 类型是简单类型
// 3、各类型的kind 可区分
// 则称 T 为 可辨别联合
// 一句话总结：同名、可辨别的 简单类型的 key
```

优点：让`复杂类型`的收窄变成`简单类型`的对比

# 十五、法外狂徒 - any

any = 所有类型（除了 never/unknow/any/void）的联合吗？为什么？（反证法）

```ts
const f1 = (a: number | string) => {
  a.split(','); // 报错
};
const f2 = (a: any) => {
  a.split(',');
  a.join('');
  a.toFixed(2);
};
```

any = 法外狂徒，TS `绝大部分`规则对 any 不生效

```ts
const f2 = (a: any) => {
  const b: never = a; // 报错
};
```

# 十六、重新看待 unknown

什么 = 所有类型（除了 never/unknow/any/void）的集合？为什么

```ts
// type any = noErrorType
// unknown = 所有类型联合
const f1 = (a: unknown) => {
  if (typeof a === 'string') {
    a.toString(); // string
  } else if (a instanceof Date) {
    a; // Date
  }
  if (typeof a === 'number') {
    a; // number
  }
};
```

# 十七、交叉类型（交集）

```ts
type A = string & number;
const a: A; // never

type 有左手的人 = {
  left: string;
};
type 有右手的人 = {
  right: string;
};

// 声明的时候严格，再赋值会报错
const a: 有左手的人 = {
  left: '1m8',
  right: 'ss', // 报错
};

const b = {
  left: '1m8',
  right: 'xx',
};
// 先初始化再赋值，没那么严格
const c: 有左手的人 = b; // 这个时候不报错

// 接口也有交集
interface ColorFul {
  color: string;
}

interface Circle {
  radius: number;
}

type ColorFulCircle = ColorFul & Circle;

// 交集模拟继承
type Person = {
  name: string;
  age: number;
};

type User = Person & {
  id: number;
  email: string;
};

const u: User = {
  name: 'aa',
  age: 20,
  id: 1,
  email: 'aa@gmail.com',
};

export {};
```

### 交叉类型的特殊场景

```ts
// 属性冲突，未报错
type Person = {
  name: string;
  age: number;
  id: number;
};

type User = Person & {
  id: string;
  email: string;
};

const u: User = {
  id: 1, // 报错
  name: 'hi',
  age: 18,
  email: 'hi@hello.com',
};

const u2: User = {
  name: 'hi2',
  age: 18,
  email: 'hi2@hello.com',
}; // 也报错， 缺少 id

// 欺骗自己: 断言
const u3: User = {
  name: 'hi2',
  age: 18,
  email: 'hi2@hello.com',
  id: 1 as never,
};

export {};
```

```ts
// 属性冲突，未报错
type Person = {
  name: string;
  age: number;
  id: 'A';
};

type User = Person & {
  id: 'B';
  email: string;
};

const u: User = {
  id: 1,
  name: 'hi',
  age: 18,
  email: 'hi@hello.com',
}; // 报错，type User = never

const u2: User = {
  id: 1, // 报错
  name: 'hi',
  age: 18,
  email: 'hi@hello.com',
} as never;

export {};
```

```ts
// interface 属性冲突，报错
interface Person {
  name: string;
  age: number;
}

interface User extends Person {
  name: number;
  age: string;
}
// 报错 接口“User”错误扩展接口“Person”。

export type { User };
```

```ts
// 函数的交集会得到并集
type A = {
  method: (a: number) => void;
};

type B = {
  method: (s: string) => void;
} & A;

const b: B = {
  method: (n) => {
    console.log(n); // n is number or string
  },
};

export {};
```

结论：交叉类型常用于有交集的类型 A、B；如果 A、B 无交集，可能得到 never、也可能只是属性 never.
