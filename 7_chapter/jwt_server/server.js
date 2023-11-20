const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const posts = [
  { username: "John", title: "Post 1" },
  { username: "Jennifer", title: "Post 2" },
];

const express = require("express");
const app = express();

app.use(express.json());
app.use(cookieParser());

// middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"]; // Bearer ...
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  // verify 메소드를 이용하면 sign 메소드를 이용해서 token을 만들 때 넣어줬던 user 정보를 가져오게 됩니다.
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }

    req.user = user;
    next(); // next()를 이용해 다음으로 이동할 수 있습니다.
  });
}

let refreshTokens = [];
app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  // accessToken 유효시간 짧게
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });

  // refreshToken 유효시간 길게
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
  refreshTokens.push(refreshToken);

  // refreshToken은 쿠키에 저장하지만 주로 httpOnly 옵션을 줘서 javascript를 이용해서 탈취하거나 조작할 수 없게 만듭니다. (XSS Cross Site Scripting 공격)
  res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

  // accessToken은 cookie나 localstorage , 메모리에 저장할 수 있습니다. (let accessToken = accessToken)
  res.json({ accessToken: accessToken });
});

app.get("/posts", authMiddleware, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.get("/refresh", (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  // refreshToken은 cookie에 담겨있기에 쿠키에서 가져오게됩니다.
  const refreshToken = cookies.jwt;
  if (!refreshTokens.includes(refreshToken)) {
    // 원래는 데이터베이스에서 refreshToken을 찾아야하지만
    // 현재 메모리에 refreshToken을 넣어놨기에 거기에 같은게 있는지 찾기
    return res.sendStatus(403);
  }

  // refreshToken을 verify한 후에 유효한 것이라면 다시 accessToken을 생성해서 json으로 보내줍니다.
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    } else {
      const accessToken = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });

      res.json({ accessToken });
    }
  });
});

app.listen(3000, () => {
  console.log(`listening on http://localhost:3000`);
});
