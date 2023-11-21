const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require("mongoose");
const express = require("express");
const config = require("config");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config();

const serverConfig = config.get("server");

const mainRouter = require("./routes/main.router");
const usersRouter = require("./routes/users.router");

const app = express();
const port = serverConfig.port;

const { MONGO_USERNAME, MONGO_PASSWORD, COOKIE_SESSION_KEY } = process.env;

app.use(cookieSession({ name: "cookie-session", keys: [COOKIE_SESSION_KEY] }));
app.use("/static", express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");
app.use(express.json());
app.use(helmet());

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

app.use("/", mainRouter);
app.use("/auth", usersRouter);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose
  .connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@test.vi6echp.mongodb.net/`)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
