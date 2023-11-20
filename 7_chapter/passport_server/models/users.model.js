const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  // 일반 로그인
  email: { type: String, trim: true, unique: true },
  password: { type: String, minLength: 5 },
  // 구글 로그인
  googleId: { type: String, unique: true, sparse: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
