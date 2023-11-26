const { CommentModel } = require("../models/comments.model");
const { PostModel } = require("../models/posts.model");
const { UserModel } = require("../models/users.model");

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return res.redirec("/posts");

  next();
}

function checkPostOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    PostModel.findById(req.params.id, (err, post) => {
      if (err || !post) {
        req.flash("error", "포스트가 없거나 에러가 발생했습니다.");
        res.redirect("back");
      } else {
        if (post.author.id.equals(req.user._id)) {
          req.post = post;
          next();
        } else {
          req.flash("error", "권한이 없습니다.");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "로그인을 먼저 해주세요.");
    res.redirect("/login");
  }
}

function checkCommentOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    CommentModel.findById(req.params.commentId, (err, comment) => {
      if (err || !comment) {
        req.flash("error", "댓글을 찾는 도중에 에러가 발생했습니다.");
        res.redirect("back");
      } else {
        if (comment.author.id.equals(req.user._id)) {
          req.comment = comment;
          next();
        } else {
          req.flash("error", "권한이 없습니다.");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "로그인을 해주세요.");
    res.redirect("/login");
  }
}

function checkIsMe(req, res, next) {
  if (req.isAuthenticated()) {
    UserModel.findById(req.params.id, (err, user) => {
      if (err || !user) {
        req.flash("error", "유저를 찾는데 에러가 발생했습니다.");
        res.redirect("/profile/" + req.params.id);
      } else {
        if (user._id.equals(req.user._id)) next();
        else {
          req.flash("error", "권한이 없습니다.");
          res.redirect("/profile/" + req.params.id);
        }
      }
    });
  }
}

module.exports = { checkIsMe, checkCommentOwnership, checkAuthenticated, checkNotAuthenticated, checkPostOwnership };
