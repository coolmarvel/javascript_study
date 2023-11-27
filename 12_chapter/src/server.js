const express = require("express");
const app = express();

require("dotenv").config();
const path = require("path");
const config = require("config");
const passport = require("passport");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");

const server_config = config.get("server");
const port = server_config.port;

const { COOKIE_ENCRYPTION_KEY, MONGO_URI } = process.env;

// app.use(
//   session({
//     secret: "session_secret",
//     name: "shop-app-cookie",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { httpOnly: true, secure: false },
//   })
// );
app.use(cookieParser());
app.use(
  cookieSession({
    name: "cookie-session",
    keys: [COOKIE_ENCRYPTION_KEY],
  })
);
app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) req.session.regenerate = (cb) => cb();
  if (req.session && !req.session.save) req.session.save = (cb) => cb();

  next();
});

app.use(flash());
app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || "에러가 발생했습니다.");
});

app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.currentUser = req.user;
  next();
  ``;
});

// Routes in here
app.use("/", require("./routes"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
