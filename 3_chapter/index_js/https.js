const lib = require("./lib");

function makeRequest(url, data) {
  // 요청 보내기
  lib.requeset.send(url);

  // 데이터 return 하기
  return lib.response.read(data);
}

const lib = require("./lib");
function makeRequest(url, data) {
  // 요청 보내기
  lib.send(url);

  // 데이터 return 하기
  return lib.read(data);
}

const { send, read } = require("./lib");
function makeRequest(url, data) {
  // 요청 보내기
  send(url);

  // 데이터 return 하기
  return read(data);
}
