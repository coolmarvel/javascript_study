const path = require("path");

function getPost(req, res) {
  // path.join은 여러 세그먼트를 하나의 경로로 결합
  // res.sendFile(path.join(__dirname, "..", "public", "images", "profile.png")); // __dirname은 현재 실행하는 파일의 절대 경로

  res.render("index", { imageTitle: "It is a forest" });
}

module.exports = { getPost };
