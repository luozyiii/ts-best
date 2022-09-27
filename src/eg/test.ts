type Circle = { kind: 'Circle'; center: [number, number] };
type Square = { kind: 'Square'; sideLength: number };
type Shape = Circle | Square;
const f1 = (a: string | number | Shape) => {
  if (typeof a === 'string') {
    a; // string;
  } else if (typeof a === 'number') {
    a; // string;
  } else if (a.kind === 'Circle') {
    a; // Circle
  } else {
    a; // Square
  }
};
export {};
