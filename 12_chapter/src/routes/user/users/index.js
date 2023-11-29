const router = require("express").Router();

const passport = require("passport");

const { User } = require("../../../models/users.model");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.send({ msg: info });

    req.logIn(user, (err) => {
      if (err) return next(err);

      res.redirect("/products");
    });
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);

    res.redirect("/login");
  });
});

router.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.redirect("/login");
  } catch (error) {
    console.error(error);
  }
});

router.get("/google", passport.authenticate("google"));

router.get(
  "/gogle/callback",
  passport.authenticate("google", {
    successReturnToOrRedirect: "/products",
    failureRedirect: "/login",
  })
);

module.exports = router;
