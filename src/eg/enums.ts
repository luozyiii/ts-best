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
