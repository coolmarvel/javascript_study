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

// Middleware
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method} ${req.url}`);
  next();

  const diffTime = Date.now() - start;
  console.log(`${req.method} ${req.url} ${diffTime}ms`);
  // 메인 task를 처리한 뒤, next() 뒷 부분을 호출합니다.
});

app.use(express.json());

// Get Router
app.get("/", (req, res) => {
  res.send({ a: "a" });
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

app.get("/some_html", (req, res) => {
  res.send("<p>some html</p>");
});

// Post Router
app.post("/products", (req, res) => {
  console.log("req.body : ", req.body);
});

app.post("/users", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Missing user name" });
  }
  const newUser = { name: req.body.name, id: users.length };

  users.push(newUser);

  res.json(newUser);
});

app.listen(PORT, HOST); // 해당 포트와 호스트에서 HTTP 서버를 시작
console.log(`Running on http://${HOST}:${PORT}`);

/**
 * res.json() 소드 코드
 *
 * res.json = function json(obj) {
 *  var val = obj;
 *
 *  // 생략...
 *
 *  // settings
 *  var app = this.app;
 *  var escape = app.get('json escape');
 *  var replacer = app.get('json replace');
 *  var spaces = app.get('json spaces');
 *  var body = stringify(val, replacer, spaces, escape);
 *
 *  // content-type
 *  if (!this.get('Content-Type')) {
 *   this.set('Content-Type', 'application/json');
 *  }
 *
 *  return this.send(body);
 * }
 */

/**
 * res.send = function send(body) {
  var chunk = body;

  // ...

  switch (typeof chunk) {
    case "string":
      if (!this.get("Content-Type")) {
        this.type("html");
      }
      break;

    case "boolean":
    case "number":
    case "object":
      if (chunk === null) {
        chunk = "";
      } else if (Buffer.isBuffer(chunk)) {
        if (!this.get("Content-Type")) {
          this.type("bin");
        }
      } else {
        return this.json(chunk);
      }
    default:
      break;
  }

  return this;
};
 */
