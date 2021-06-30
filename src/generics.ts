// 泛型简单用法
function echo<T>(arg: T): T {
  return arg;
}
const str: string = 'str';
const result = echo(str);
const result2: string = echo(true); // 报错

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
const result3 = swap(['string', 123]);

// 约束泛型
function echoWithArr<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}
const arrs = echoWithArr([1, 2, 3]);

// 只要你传入参数有length 属性，即可通过校验
interface IWithLength {
  length: number;
}
function echoWithLength<T extends IWithLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}
const str3 = echoWithLength('abc');
const obj = echoWithLength({ length: 10 });
const arr3 = echoWithLength([1, 2, 3]);
const num = echoWithLength(12); // 报错

// 泛型在类和接口中的使用
class Queue<T> {
  private data = [];
  push(item: T) {
    return this.data.push(item);
  }
  pop(): T {
    return this.data.shift();
  }
}
const queue = new Queue<number>();
queue.push(1); // 传入数字
queue.push('str'); // 报错，不能传入字符
console.log(queue.pop().toFixed()); // 会报错，字符没有数字的方法toFixed
console.log(queue.pop().toFixed());

interface KeyPair<T, U> {
  key: T;
  value: U;
}
let kp1: KeyPair<number, string> = { key: 1, value: 'string' };
let kp2: KeyPair<string, number> = { key: 'str', value: 2 };

let arr4: number[] = [1, 2, 3];
let arr5: Array<number> = [1, 2, 3];
