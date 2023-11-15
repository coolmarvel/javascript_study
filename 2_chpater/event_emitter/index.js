const EventEmitter = require("events");

const celebrity = new EventEmitter();
// 위 객체는 on 및 emit 메서드를 노출합니다.

// Observer1dl celebrity를 구독중
// update post event가 발생하면 console을 출력하게 listener를 등록함.
// celebrity.on("update post", () => {
//   console.log("This post is so awesome!");
//   // on은 event가 trigger될 때 실행될 콜백 함수를 추가하는데 사용
// });

// Observer2가 celebrity를 구독중
// celebrity.on("update post", () => {
//   console.log("I like this post!");
// });

// celebrity가 update post event를 발생(emit)시킴.
// celebrity.emit("update post");
// emit은 event를 trigger하는데 사용됨.

celebrity.on("update post", (type) => {
  console.log(`I like this ${type} post!`);
});

// celebrity가 update post 이벤트를 발생(emit) 시킴
celebrity.emit("update post", "image");

process.on("beforeExit", (code) => {
  console.log("Process beforeExit event with code: ", code);
});

process.on("exit", (code) => {
  console.log("Process exit event with code: ", code);
});
