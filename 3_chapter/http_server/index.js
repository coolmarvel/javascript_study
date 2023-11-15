// http built-in module
const http = require("http");

// port 3000
const port = 3000;

// Using HTTP module than create server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello, World!</h1>");
});

// 서버는 지정된 포트 3000에서 수신 대기하도록 설정됩니다.
// 서버가 준비되면 수신 콜백 함수가 호출됩니다.
server.listen(port, () => {
  console.log("Server running at port", port);
});
