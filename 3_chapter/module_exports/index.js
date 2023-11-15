// 상수도 exports 가능
module.exports.A = 1;

// 이런 식으로도 export 가능
module.exports.encrypt = function encrypt(data) {
  return "encrypted data";
};

// module 생략해도 가능
exports.someFunction = function someFunction() {};

function send(url, data) {
  const encryptedData = encrypt(data);
  console.log(`${encryptedData} is being sent to ${url}`);
}
module.exports = {
  send, // send: send
};

// 이 함수를 default로 exports 한다면 이렇게도 가능
module.exports = function read() {
  return decrypt("data");
};

// const request = require('./request');
// const response = require('./response');
const { send } = require("./request");
const { read } = require("./response");

function makeRequest(url, data) {
  // 요청 보내기
  send(url);
  // 데이터를 return
  return read(data);
}
