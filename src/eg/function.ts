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
