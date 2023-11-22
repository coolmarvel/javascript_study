const app = require("express")();

// app.get("*", (req, res, next) => {
//   throw new Error("woops");
//   // 이렇게 이 미들웨어에 에러가 발생하면 express는
//   // 이 에러를 에러 처리기(Handler)로 보냅니다.
// });

// app.get("*", (req, res, next) => {
//   console.log("this willl not print");
//   // 위에 에러가 발생했기 때문에 에러 처리기로 바로 가야 하기 때문에 이 미들웨어는 생략됩니다.
//   // 왜냐하면 이 미들웨어는 에러 처리기(Error Handler)가 아니기 때문입니다.
// });

// app.use((error, req, res, next) => {
//   res.send({ message: error.message });
//   // 에러 처리기는 이렇게 4개의 인자가 필요합니다.
//   // 그래서 첫 번째 미들웨어에서 발생한 에러 메시지를 이곳에서 처리해줍니다.
// });

app.get("*", (req, res, next) => {
  setImmediate(() => {
    throw next(new Error("woops"));
  });
});

app.use((error, req, res, next) => {
  res.send({ message: error.message });
});

app.listen(3000);
