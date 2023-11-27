const router = require("express").Router({ mergeParams: true });

const { checkAuthenticated, checkIsMe } = require("../middlewares/auth");

const { PostModel } = require("../models/posts.model");
const { UserModel } = require("../models/users.model");

router.get("/", checkAuthenticated, (req, res) => {
  PostModel.find({ "author.id": req.params.id })
    .populate("comments")
    .sort({ createdAt: -1 })
    .exec((err, posts) => {
      if (err) {
        req.flash("error", "게시물을 가져오는데 실패했습니다.");
        res.redirect("back");
      } else {
        UserModel.findById(req.params.id, (err, user) => {
          if (err || !user) {
            req.flash("error", "없는 유저 입니다.");
            res.redirect("back");
          } else {
            res.render("profile", { posts: posts, user: user });
          }
        });
      }
    });
});

router.get("/edit", checkIsMe, (req, res) => {
  res.render("profile/edit", { user: req.user });
});

router.put("/", checkIsMe, (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err || !user) {
      req.flash("error", "유저 데이터를 업데이트하는데 에러가 발생했습니다.");
      res.redirect("back");
    } else {
      req.flash("success", "유저 데이터를 업데이트하는데 성공했습니다.");
      res.redirect("/profile/" + req.params.id);
    }
  });
});

module.exports = router;
