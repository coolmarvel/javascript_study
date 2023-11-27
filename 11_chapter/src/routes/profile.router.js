const router = require("express").Router({ mergeParams: true });

const { checkAuthenticated } = require("../middlewares/auth");

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

module.exports = router;
