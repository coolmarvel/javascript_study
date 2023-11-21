const router = require("express").Router();
const passport = require("passport");

const User = require("../models/users.model");
const sendMail = require("../mail/mail_template");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.send({ msg: info });

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  })(req, res, next);
});

router.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    sendMail("to-email", "to-name", "welcome");
    res.redirect("/login");
  } catch (error) {
    console.error(error);
  }
});

router.post("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);

    res.redirect("/login");
  });
});

router.get("/google", passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = router;
