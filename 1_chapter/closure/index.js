function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log(`Outer Variable: ${outerVariable}`);
    console.log(`Inner Variable: ${innerVariable}`);
  };
}

const newFunction = outerFunction("outside");
// 함수가 함수를 리턴함.
// 그래서 newFunction 변수는 함수임.
newFunction("inside");

// let a = "a";
// function functionB() {
//   let c = "c";
//   console.log(a, b, c);
// }

// function functionA() {
//   let b = "b";
//   console.log(a, b);
//   functionB();
// }
// functionA(); // ReferenceError: b is not defined

let a = "a";
function functionA() {
  function functionB() {
    let c = "c";
    console.log(a, b, c);
  }

  let b = "b";
  console.log(a, b);
  functionB();
}
functionA();
