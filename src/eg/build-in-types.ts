// global objects
const a: Array<number> = [1, 2, 3];
const date = new Date();
date.getTime();
const reg = /abc/;
reg.test('abc');

// build-in object
Math.pow(2, 2);

// DOM and BOM
let body = document.body;
let allLis = document.querySelectorAll('li');
allLis.keys();

document.addEventListener('click', (e) => {
  e.preventDefault();
});

// Utility Types
interface IPerson {
  name: string;
  age: number;
}
let leslie: IPerson = { name: 'leslie', age: 18 };
type IPartial = Partial<IPerson>; // 可选Partial
let leslie2: IPartial = { name: 'leslie2' };
type IOmit = Omit<IPerson, 'name'>; // 忽略 name
let leslie3: IOmit = { age: 18 };
