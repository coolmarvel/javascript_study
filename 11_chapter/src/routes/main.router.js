const router = require("express").Router();

const { checkAuthenticated, checkNotAuthenticated } = require("../middlewares/auth");

router.get("/", checkAuthenticated, (req, res) => {
  res.redirect("/posts");
});

router.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("/auth/login");
});

router.get("/signup", checkNotAuthenticated, (req, res) => {
  res.render("/auth/signup");
});

module.exports = router;
