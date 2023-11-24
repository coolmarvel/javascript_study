const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, minLength: 5 },
    googleId: { type: String, unique: true, sparse: true },
    kakaoId: { type: String, unique: true, sparse: true },
    username: { type: String, required: true, trim: true },
    firstName: { type: String, default: "First Name" },
    lastName: { type: String, default: "Last Name" },
    bio: { type: String, default: "데이터 없음" },
    hometown: { type: String, default: "데이터 없음" },
    workspace: { type: String, default: "데이터 없음" },
    education: { type: String, default: "데이터 없음" },
    contact: { type: String, default: "데이터 없음" },
    friends: [{ type: String }],
    friendsRequests: [{ type: String }],
  },
  { timestamps: true }
);

const saltRounds = 10;
userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return enxt(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = (plainPassword, cb) => {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
