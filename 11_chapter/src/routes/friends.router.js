const router = require("express").Router();

const { checkAuthenticated } = require("../middlewares/auth");

const { UserModel } = require("../models/users.model");

router.get("/", checkAuthenticated, (req, res) => {
  UserModel.find({}, (err, users) => {
    if (err) {
      req.flash("error", "유저를 가져오는데 에러가 발생했습니다.");
      res.redirect("/posts");
    } else {
      res.render("friends", { users: users });
    }
  });
});

module.exports = router;
