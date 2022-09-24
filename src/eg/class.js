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
