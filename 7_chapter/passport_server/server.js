const passport = require("passport");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
require("dotenv").config();

const User = require("./models/users.model");

const app = express();
const port = 3000;

const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/login", (req, res, next) => {
  res.render("login");
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, lnfo) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      console.log("no user found");
      return res.send({ msg: info });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      else res.redirect("/");
    });
  })(req, rex, next);
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
