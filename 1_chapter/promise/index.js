/**
 * Promise 객체는 new 키워드와 생성자를 사용해 만듭니다.
 * 생성자는 매개변수로 "실행 함수"를 받습니다.
 * 이 함수는 매개 변수로 두 가지 함수를 받아야 하는데,
 * 첫 번째 함수(resolve)는 비동기 작업을 성공적으로 완료해 결과를 값으로 반활할 때 호출해야 하고,
 * 두 번째 함수(reject)는 작업이 실패하여 오류의 원인을 반화할 때 호출하면 됩니다.
 * 두 번째 함수는 주로 오류 객체를 받습니다.
 */

const myFirstPromise = new Promise((resolve, reject) => {
  // do something asynchronous which eventually calls either
  //
  // resolve(value)           // fulfilled
  // or
  // reject("failure reason") // rejected
});

function fetchData() {
  return new Promise((resolve, reject) => {
    const success = true;
    if (success) {
      resolve("success");
    } else {
      reject("failure");
    }
  });
}

fetchData()
  .then((result) => {
    console.log(result); // success
  })
  .then((error) => {
    console.log(error); // undefined
  });

// myPromise
//   .then((result) => {
//     console.log(result);                   // resolve
//   })
//   .catch((error) => {
//     console.log(error);                    // reject
//   })
//   .finally(() => {
//     console.log("---all process done---"); // last finally
//   });

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response1) => response1.json())
  .then((json) => console.log(json))
  .then(() => fetch("https://jsonplaceholder.typicode.com/todos/2"))
  .then((response2) => response2.json())
  .then((json) => console.log(json))
  .catch((err) => console.log(err))
  .finally(() => console.log("---all process done---"));

// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 3000, "foo");
// });

// Promise.all([promise1, promise2, promise3]).then((values) => {
//   console.log(values); // [ 3, 42, 'foo' ]
// });

const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value); // Both resolve, but promise2 is faster -> "two"
});
