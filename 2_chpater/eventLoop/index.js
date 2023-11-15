const fs = require("fs");

// Work No.1
function someAsyncOperation(callback) {
  // Assume this takes 95ms 50 complete
  fs.readFile("/path/to/file", callback); 
  
  // 1. 파일을 읽는데 95ms 소요
}

const timeoutScheduled = Date.now();

// Work No.2
setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);

  // 3. poll phase 처리 후 timer phase로 와서 타이머의 임계값 도달한 것을 확인 후 콜백 함수 실행
  // 예약 중인 타이머와 실행중인 콜백 사이의 총 지연이 105ms임을 알 수 있다.
  // 그래서 100ms이 아닌 105ms 후에 실행됨
}, 100);

// do someAsyncOperation which takes 95ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();

  // do someting that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do noting
  }

  // 2. fs.readFile()은 파일 읽기를 완료하고 완료하는데
  // 10ms가 소요되는 콜백이 poll queue에 추가되고 실행
});
