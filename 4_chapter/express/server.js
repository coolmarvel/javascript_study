const express = require("express"); // Express 모듈 불러오기

// Constants
const PORT = 8080; // Express 서버를 위한 포트 설정
const HOST = "0.0.0.0"; // 호스트 지정

const users = [
  { id: 0, name: "Jack" },
  { id: 1, name: "Jennifer" },
];

// App
const app = express(); // 새로운 Express App 생성

app.get("/", (req, res) => {
  // "/" 이 경로로 요청이 오면 Hello World를 결과값으로 전달
  res.send("Hello World");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const user = users[userId];

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "No User Found" });
  }
});

app.listen(PORT, HOST); // 해당 포트와 호스트에서 HTTP 서버를 시작
console.log(`Running on http://${HOST}:${PORT}`);
