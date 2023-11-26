const methodOverride = require("method-override");
const session = require("cookie-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const express = require("express");
const config = require("config");
const path = require("path");
require("dotenv").config();

const app = express();

const serverConfig = config.get("server");
const port = serverConfig.port;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const { COOKIE_ENCRYPTION_KEY, MONGO_URI } = process.env;

app.use(session({ name: "cookie-session-name", keys: [COOKIE_ENCRYPTION_KEY] }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) req.session.regenerate = (cb) => cb();
  if (req.session && !req.session.save) req.session.save = (cb) => cb();

  next();
});

app.use((req, res, next) => {
  res.locals.error = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.currentUser = req.user;

  next();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || "Error Occured");
});

app.use("/", require("./routes/main.router"));
app.use("/auth", require("./routes/users.router"));
app.use("/posts", require("./routes/posts.router"));

// mongoose.set("strictQuery", false);
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("mongodb connected"))
//   .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
