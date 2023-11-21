const passport = require("passport");
const User = require("../models/users.model");
const KakaoStrategy = require("passport-kakao").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// req.login(user)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Client => session => request
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

// local strategy
const localStrategyConfig = new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {
  User.findOne({ email: email.toLocaleLowerCase() }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { msg: `Email ${email} not found.` });

    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (isMatch) return done(null, user);

      return done(null, false, { msg: "Invalid email or password." });
    });
  });
});

passport.use("local", localStrategyConfig);

// google strategy
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const googleStrategyConfig = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["email", "profile"],
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }, (err, existingUser) => {
      if (err) return done(err);

      if (existingUser) return done(null, existingUser);
      else {
        const user = new User();
        user.email = profile.emails[0].value;
        user.googleId = profile.id;
        user.save((err) => {
          if (err) return done(err);
          else done(null, user);
        });
      }
    });
  }
);

passport.use("google", googleStrategyConfig);

// kakao strategy
const { KAKAO_API_KEY } = process.env;
const kakaoStrategyConfig = new KakaoStrategy(
  {
    clientID: KAKAO_API_KEY,
    callbackURL: "/auth/kakao/callback",
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ kakoId: profile.id }, (err, existingUser) => {
      if (err) return done(err);

      if (existingUser) return done(null, existingUser);
      else {
        const user = new User();
        user.kakaoId = profile.id;
        user.email = profile._json.kako_account.email;
        user.save((err) => {
          if (err) return done(err);
          done(null, user);
        });
      }
    });
  }
);

passport.use("kakao", kakaoStrategyConfig);
