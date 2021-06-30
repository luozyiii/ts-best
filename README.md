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
