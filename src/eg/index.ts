import './test';

type Person = { name: string; age: number; sayHi: FnWithThis };
type FnWithThis = (this: Person, name: string) => void;

const sayHi: FnWithThis = function (rename: string) {
  console.log('hi ' + this.name + ' ' + rename);
};

const x: Person = { name: 'frank', age: 18, sayHi: sayHi };

x.sayHi('Jack'); // hi frank
sayHi.call(x, 'Jack2'); // hi frank
