const jwt = require("jsonwebtoken");
require("dotenv").config();

const posts = [
  { username: "John", title: "Post 1" },
  { username: "Jennifer", title: "Post 2" },
];

const express = require("express");
const app = express();

app.use(express.json());

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  res.json({ accessToken: accessToken });
});

app.get("/posts", authMiddleware, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

// middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"]; // Bearer ...
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  // verify 메소드를 이용하면 sign 메소드를 이용해서 token을 만들 때 넣어줬던 user 정보를 가져오게 됩니다.
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);

    req.user = user;
    next(); // next()를 이용해 다음으로 이동할 수 있습니다.
  });
}

app.listen(3000, () => {
  console.log(`listening on http://localhost:3000`);
});
