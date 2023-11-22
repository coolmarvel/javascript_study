const path = require("path");

const getPost = (req, res) => {
  res.render("posts", { templateName: "post" });
};

module.exports = getPost;
