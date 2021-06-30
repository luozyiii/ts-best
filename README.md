# ts-best

Typescript 最佳入门

### 使用 cnpm 全局安装 typescript

```javascript
// 卸载cnpm （旧版本cnpm安装不了，so只能重装cnpm）
sudo npm uninstall cnpm -g
// 安装cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
// 安装ts
cnpm install -g typescript
```

### 简单入门

```javascript
// test.ts
// 运行ts命令, 同级目录生成test.js
tsc src/test.ts
// 查看test.js文件
cat src/test.js

// 纯运行
ts-node src/test.ts
```

### 原始数据类型和 any

```javascript
// basic-types.ts
let isDone: boolean = false;
// isDone = 123 // 会报错
let age: number = 18;
let firstName: string = 'leslie';
let message: string = `hello ${firstName}`;

let u: undefined = undefined;
let n: null = null;

let num: number = undefined;

let notSure: any = 123;
notSure = 'hi';
notSure.name = 'san';
notSure.getName();
```

### 数组和元组

```javascript
// array-and-tuple.ts
// 数组
let arrOfNumber: number[] = [1, 3, 5];
arrOfNumber.push(90);
// arrOfNumber.push('hi') // 报错

function test() {
  console.log(arguments);
}

// 元组tuple
let user: [string, number] = ['hi', 123];
user.push(20);
```

### Interface 接口

- 对对象的形状（shape）进行描述
- Duck Typing（鸭子类型）

```javascript
// interface.ts
interface Person {
  readonly id: number; // 只读
  name: string;
  age: number;
  like?: string; // 可选
}

let leslie:Person = {
  id: 1,
  name: 'leslie',
  age: 18,
}

leslie.id = 2 // 报错
```

### Function 函数

```javascript
// ?: 可选（得放最后面）
function add(x: number, y: number, z?: number): number {
  if (typeof z === 'number') {
    return x + y + z;
  } else {
    return x + y;
  }
}

add(1, 2);
add(1, 2, 3, '123'); // 报错

let add2: (x: number, y: number, z?: number) => number = add;

interface ISum {
  (x: number, y: number, z?: number): number;
}
let add3: ISum = add; // 等价于add2
```

### 类型推论、联合类型和类型断言

```javascript
// 类型推论 type inference
let str = 'str';
str = 123; // 报错

// 联合类型 union types
let numberOrString: number | string;
numberOrString.toString();

// 类型断言 as
function getLength(input: string | number): number {
  const str = input as string;
  if (str.length) {
    return str.length;
  } else {
    const number = input as number;
    return number.toString().length;
  }
}

// type guard
function getLength2(input: string | number): number {
  if (typeof input === 'string') {
    return input.length;
  } else {
    return input.toString().length;
  }
}

```

### class 类

- 类(Class)：定义了一切事物的抽象特点
- 对象(Object)：类的实例
- 面向对象(OOP)：三大特性：封装、继承、多态

```javascript
// 封装
class Animal {
  constructor(name) {
    this.name = name;
  }
  run() {
    return `${this.name} is running`;
  }
}
const snake = new Animal('leslie');
console.log(snake.run());

// 继承
class Dog extends Animal {
  bark() {
    return `${this.name} is barking`;
  }
}
const dog = new Dog('dog');
console.log(dog.bark());

// 多态:重写了构造函数、run方法
class Cat extends Animal {
  static categories = ['mammal'];
  constructor(name) {
    super(name);
    console.log(this.name);
  }
  run() {
    return `Meow, ${super.run()}`;
  }
}
const maomao = new Cat('maomao');
console.log(maomao.run());
```

### Typescript 中的类

- Public: 修饰的属性或方法是共有的
- Private： 修饰的属性或方法是私有的
- Protected：修饰的属性或方法是受保护的
- Readonly: 属性只读

### 类和接口

```javascript
interface Radio {
  switchRadio(trigger: boolean): void;
}
interface Battery {
  checkBatteryStatus(): void;
}
interface RadioWithBattery extends Radio {
  checkBatteryStatus(): void;
}

class Car implements Radio {
  switchRadio(trigger: boolean) {}
}
class Cellphone implements Radio, Battery {
  switchRadio(trigger: boolean) {}
  checkBatteryStatus() {}
}
class Cellphone2 implements RadioWithBattery {
  switchRadio(trigger: boolean) {}
  checkBatteryStatus() {}
}
```

### 枚举（Enum）

```javascript
// 运行
ts-node src/enums.ts

// 数字枚举
enum Direction {
  Up,
  Down,
  Left,
  Rihgt,
}
console.log(Direction.Up); // 0
console.log(Direction[0]); // Up

enum Direction2 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

const value = 'UP';
if (value === Direction2.Up) {
  console.log('go up!');
}

// 常量枚举：可以提升性能
const enum Direction3 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
if (value === Direction3.Up) {
  console.log('go up!');
}

```
