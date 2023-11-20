const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  // writeHead는 한 번만 호출되어야 하며 end()가 호출되기 전에 호출되어야 합니다.
  // 상태 코드와 응답 헤더를 클라이언트에 보냅니다.
  // res.writeHead(200, { "Content-Type": "text/plain" });
  res.writeHead(200, { "Content-Type": "application/json" });

  // 데이터가 로드되었음을 서버에 알립니다.
  // res.end("Hello!");
  res.end(JSON.stringify({ a: "a", b: "b" }));
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
// 127.0.0.1 -> localhost
