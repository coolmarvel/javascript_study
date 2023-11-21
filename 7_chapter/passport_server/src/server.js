const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
require("dotenv").config();

const User = require("./models/users.model");

const app = express();
const port = 3000;

const { MONGO_USERNAME, MONGO_PASSWORD, COOKIE_SESSION_KEY } = process.env;

app.use(cookieSession({ name: "cookie-passport", keys: [COOKIE_SESSION_KEY] }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");
app.use(express.json());

// register regenerate & save after the cookie-session middleware initialization
app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }

  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb();
    };
  }

  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/login", (req, res, next) => {
  res.render("login");
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      console.log("no user found");
      return res.send({ msg: info });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      else res.redirect("/");
    });
  })(req, res, next);
});

app.get("/signup", (req, res, next) => {
  res.render("signup");
});

app.post("/signup", async (req, res, next) => {
  const user = new User(req.body);
  console.log(req.body); // email password

  try {
    await user.save(); // database save
    return res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
  }
});

mongoose
  .connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@test.vi6echp.mongodb.net/`)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
