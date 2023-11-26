const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const { PostModel } = require("../models/posts.model");

const { checkAuthenticated, checkNotAuthenticated, checkPostOwnership } = require("../middlewares/auth");

const storageEngine = multer.diskStorage({
  destination: (req, file, callback) => callback(null, path.join(__dirname, "../public/assets/images")),
  filename: (req, file, callback) => callback(null, file.originalname),
});

const upload = multer({ storage: storageEngine }).single("image");

router.get("/", checkAuthenticated, (req, res) => {
  PostModel.find()
    .populate("comments")
    .sort({ createdAt: -1 })
    .exec((err, posts) => {
      if (err) console.log(err);
      else res.render("posts", { posts: posts, currentUser: req.user });
    });
});

router.post("/", checkAuthenticated, upload, (req, res, next) => {
  let desc = req.body.desc;
  let image = req.file ? req.file.filename : "";

  PostModel.create({ image: image, description: desc, author: { id: req.user._id, username: req.user.username } }, (err, _) => {
    if (err) {
      req.flash("error", "포스트 생성 실패");
      res.redirect("back");
    } else {
      req.flash("success", "포스트 생성 성공");
      res.redirect("back");
    }
  });
});

router.get("/:id/edit", checkPostOwnership, (req, res) => {});

router.put("/:id", checkPostOwnership, (req, res) => {});

router.delete("/:id", checkPostOwnership, (req, res) => {});

module.exports = router;
