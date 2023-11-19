const express = require("express"); // Express 모듈 불러오기
const path = require("path");

// Constants
const PORT = 8080; // Express 서버를 위한 포트 설정
const HOST = "0.0.0.0"; // 호스트 지정

const usersRouter = require("./routes/users.router");
const postsRouter = require("./routes/posts.router");

// App
const app = express(); // 새로운 Express App 생성

// 특정 엔진을 템플릿 엔진으로 사용하기 위한 설정
app.set("view engine", "hbs");
// view 파일들이 모여있는 폴더를 명시
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method} ${req.url}`);
  next();

  const diffTime = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${diffTime}ms`);
  // 메인 task를 처리한 뒤, next() 뒷 부분을 호출합니다.
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

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
