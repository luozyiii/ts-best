// 函数的交集会得到并集
type A = {
  method: (a: number) => void;
};

type B = {
  method: (s: string) => void;
} & A;

const b: B = {
  method: (n) => {
    console.log(n); // n is number or string
  },
};

export {};
