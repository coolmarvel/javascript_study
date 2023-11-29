const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { User } = require("../models/users.model");

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => User.findById(id).then((user) => done(null, user)));

const localStrategyConfig = new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {
  User.findOne({ email: email.toLocaleLowerCase() }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { msg: `Email ${email} not found.` });

    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (isMatch) return done(null, user);

      return done(null, false, { msg: "Invalid email or password" });
    });
  });
});
passport.use("local", localStrategyConfig);
