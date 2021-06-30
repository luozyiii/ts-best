// 封装
class Animal2 {
  name: string;
  constructor(name) {
    this.name = name;
  }
  run() {
    return `${this.name} is running`;
  }
}
const snake2 = new Animal2('leslie');
console.log(snake2.run());

// 继承
class Dog2 extends Animal2 {
  bark() {
    return `${this.name} is barking`;
  }
}
const dog2 = new Dog2('dog');
console.log(dog2.bark());

// 多态:重写了构造函数、run方法
class Cat2 extends Animal2 {
  static categories = ['mammal'];
  constructor(name) {
    super(name);
    console.log(this.name);
  }
  run() {
    return `Meow, ${super.run()}`;
  }
}
const maomao2 = new Cat2('maomao2');
console.log(maomao2.run());
