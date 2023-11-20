// const string1 = "Hello";
// const string2 = 'Hello';
// 큰 따옴표 작은 따옴표 중 취향의 차이로 선택적으로 사용하면 된다.
// const string3 = `Hello ${string1} ?!`;
// 백틱은 선택이라는 개념보다는 보관이라는 개념으로 접근해야함.
// console.log(string3);

// const number = 123;
// console.log(number + 1);

// const pi = 3.14;
// console.log(pi);
// const float1 = 0.14; // 정수부분이 0이면 0을 생략한 .14도 가능
// console.log(float1);

// console.log(typeof (number + undefined));
// console.log(typeof pi);

const a = 0.1;
const b = 0.2;

console.log(a + b); // 0.30000000000000004 Number
console.log(Number(a + b).toFixed(1)); // 0.3 String
