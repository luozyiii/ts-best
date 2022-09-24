// 类型推论 type inference
let str = 'str';
str = 123; // 报错

// 联合类型 union types
let numberOrString: number | string;
numberOrString.toString();

// 类型断言 as
function getLength(input: string | number): number {
  const str = input as string;
  if (str.length) {
    return str.length;
  } else {
    const number = input as number;
    return number.toString().length;
  }
}

// type guard
function getLength2(input: string | number): number {
  if (typeof input === 'string') {
    return input.length;
  } else {
    return input.toString().length;
  }
}
