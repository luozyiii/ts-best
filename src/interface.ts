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