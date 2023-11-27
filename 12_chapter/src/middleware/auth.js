const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/products");
  next();
};

const checkAdmin = (req, res, next) => {
  if (req.isAuthenticated() && res.locals.currentUser.admin === 1) next();
  else {
    req.flash("error", "관리자로 로그인하세요.");
    res.redirect("back");
  }
};

module.exports = { checkAuthenticated, checkNotAuthenticated, checkAdmin };
