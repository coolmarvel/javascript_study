function decrypt(data) {
  return "decrypted data";
}

function read() {
  return decrypt("data");
}

console.log("We are in the response module");

module.exports = { read };

const { read } = require(".");
