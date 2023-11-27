const router = require("express").Router();

const { checkAuthenticated, checkNotAuthenticated } = require("../middleware/auth");

router.get("/", (req, res) => {
  res.redirect("/products");
});

router.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("auth/login");
});

router.get("/signup", checkNotAuthenticated, (req, res) => {
  res.render("auth/signup");
});

const adminRouter = require("./admin");
const userRouter = require("./user");

router.use("/", adminRouter);
router.use("/", userRouter);

module.exports = router;
