// console.log("1"); // sync(동기)

// setTimeout(() => {
//   console.log("2"); // async(비동기)
// }, 3000);

// console.log("3"); // sync(동기)

// setTimeout(() => {
//   console.log("1");
// }, 1000);
// console.log("2");

// function B() {
//   setTimeout(() => {
//     console.log("B-1...");
//   }, 1500);
// }

// function A() {
//   console.log("A-1...");
//   B();
//   console.log("A-2...");
// }

// A();

function foo() {
  foo();
}
foo();

// RangeError: Maximum call stack size exceeded
