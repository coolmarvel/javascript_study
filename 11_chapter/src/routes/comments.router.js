const router = require("express").Router({ mergeParams: true });

const { PostModel } = require("../models/posts.model");
const { CommentModel } = require("../models/comments.model");

const { checkAuthenticated, checkCommentOwnership } = require("../middlewares/auth");

router.post("/", checkAuthenticated, (req, res) => {
  PostModel.findById(req.params.id, (err, post) => {
    if (err || !post) {
      req.flash("error", "댓글을 생성 중 포스트를 찾지 못했거나 에러가 발생했습니다.");
      res.redirect("back");
    } else {
      CommentModel.create(req.body, (err, comment) => {
        if (err) {
          req.flash("error", "댓글을 생성 중 에러가 발생했습니다.");
          res.redirect("back");
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();

          post.comments.push(comment);
          post.save();
          req.flash("success", "댓글이 잘 생성되었습니다.");
          res.redirect("back");
        }
      });
    }
  });
});

module.exports = router;
