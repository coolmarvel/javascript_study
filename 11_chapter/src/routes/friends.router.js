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

router.put("/:id/add-friend", checkAuthenticated, (req, res) => {
  UserModel.findById(req.params.id, (err, user) => {
    if (err || !user) {
      req.flash("error", "유저를 찾지 못했습니다.");
      res.redirect("/friends");
    } else {
      console.log("req.user._id", [req.user._id]);
      UserModel.findByIdAndUpdate(user._id, { friendsRequests: user.friendsRequests.concat([req.user._id]) }, (err, _) => {
        if (err) res.redirect("back");
        else res.redirect("back");
      });
    }
  });
});

router.put("/:firstId/remove-friend-request/:secondId", checkAuthenticated, (req, res) => {
  UserModel.findById(req.params.firstId, (err, user) => {
    if (err || !user) {
      req.flash("error", "유저를 찾지 못했습니다.");
      res.redirect("back");
    } else {
      const filteredFriendsRequests = user.friendsRequests.filter((friendId) => friendId !== req.params.secondId);

      UserModel.findByIdAndUpdate(user._id, { friendsRequests: filteredFriendsRequests }, (err, _) => {
        if (err) {
          req.flash("error", "친구 요청 취소를 하는데 에러가 났습니다.");
        } else {
          req.flash("success", "친구 요청 취소를 성공했습니다.");
        }

        res.redirect("back");
      });
    }
  });
});

router.put("/:id/accept-friend-request", checkAuthenticated, (req, res) => {
  UserModel.findById(req.params.id, (err, senderUser) => {
    if (err || !senderUser) {
      req.flash("error", "유저를 찾지 못했습니다.");
      res.redirect("back");
    } else {
      UserModel.findByIdAndUpdate(senderUser._id, { friends: senderUser.friends.concat([req.user._id]) }, (err, _) => {
        if (err) {
          req.flash("error", "친구 추가하는데 실패했습니다.");
          res.redirect("back");
        } else {
          UserModel.findByIdAndUpdate(
            req.user._id,
            {
              friends: req.user.friends.concat([senderUser._id]),
              friendsRequests: req.user.friendsRequests.filter((friendId) => friendId !== senderUser._id.toString()),
            },
            (err, _) => {
              if (err) {
                req.flash("error", "친구 추가하는데 실패했습니다.");
                res.redirect("back");
              } else {
                req.flash("success", "친구 추가를 성공했습니다.");
                res.redirect("back");
              }
            }
          );
        }
      });
    }
  });
});

router.put("/:id/remove-friend", checkAuthenticated, (req, res) => {
  UserModel.findById(req.params.id, (err, user) => {
    if (err || !user) {
      req.flash("error", "유저를 찾는데 실패했습니다.");
      res.redirect("back");
    } else {
      UserModel.findByIdAndUpdate(user._id, { friends: user.friends.filter((friendId) => friendId !== req.user._id.toString()) }, (err, _) => {
        if (err) {
          req.flash("error", "친구 삭제하는데 실패했습니다.");
          res.redirect("back");
        } else {
          user.findByIdAndUpdate(req.user._id, { friends: req.user.friends.filter(friendId >= friendId !== req.params.id.toString()) }, (err, _) => {
            if (err) {
              req.flash("error", "친구 삭제하는데 실패했습니다.");
            } else {
              req.flash("success", "친구 삭제하는데 성공했습니다.");
            }

            res.redirect("back");
          });
        }
      });
    }
  });
});

module.exports = router;
