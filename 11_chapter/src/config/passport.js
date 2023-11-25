const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { UserModel } = require("../models/users.model");

// req.login(user)
passport.serializeUser((user, done) => done(null, user.id));

// client -> session -> request
passport.deserializeUser((id, done) => UserModel.findById(id).then((user) => done(null, user)));

const localStrategyConfig = new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {
  UserModel.findOne({ email: email.toLocaleLowerCase() }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { msg: `Email ${email} not found` });

    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (isMatch) return done(null, user);

      return done(null, false, { msg: "Invalid email or password." });
    });
  });
});
passport.use("local", localStrategyConfig);

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const googleStrategyConfig = new GoogleStrategy(
  { clientID: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET, scope: ["email", "profile"] },
  (accessToken, refreshToken, profile, done) => {
    UserModel.findOne({ googleId: profile.id }, (err, existingUser) => {
      if (err) return done(err);

      if (existingUser) return done(null, existingUser);
      else {
        const user = new UserModel();
        user.email = profile.emails[0].value;
        user.googleId = profile.id;
        user.username = profile.displayName;
        user.firstName = profile.name.givenName;
        user.lastName = profile.name.familyName;
        user.save((err) => {
          if (err) return done(err);
          done(null, user);
        });
      }
    });
  }
);
passport.use("google", googleStrategyConfig);
