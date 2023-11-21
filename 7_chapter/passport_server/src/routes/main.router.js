const router = require("express").Router();

const { checkNotAuthenticated, checkAuthenticated } = require("../middleware/auth");

router.get("/", checkAuthenticated, (req, res, next) => {
  res.render("index");
});

router.get("/login", checkNotAuthenticated, (req, res, next) => {
  res.render("login");
});

router.get("/signup", checkNotAuthenticated, (req, res, next) => {
  res.render("signup");
});

module.exports = router;
