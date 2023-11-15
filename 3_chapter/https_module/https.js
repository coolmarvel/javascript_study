const request = require("./request");
const response = require("./response");

function makeRequest(url, data) {
  // 요청 보내기
  request.send(url);
  // 데이터를 return 하기
  return response.read();
}

const responseData = makeRequest("https://naver.com");
console.log("responseData", responseData);
