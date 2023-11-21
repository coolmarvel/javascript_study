const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  // 일반 로그인
  email: { type: String, trim: true, unique: true },
  password: { type: String, minLength: 5 },
  // 구글 로그인
  googleId: { type: String, unique: true, sparse: true },
  // 카카오 로인
  kakaoId: { type: String, unique: true, sparse: true },
});

const saltRounds = 10;
userSchema.pre("save", (next) => {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else next();
});

userSchema.methods.comparePassword = (plainPassword, cb) => {
  // bcrypt compare
  // plain password => client, this.password => database에 있는 password
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
