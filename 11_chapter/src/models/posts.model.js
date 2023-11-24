const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    author: { id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, username: String },
    image: { type: String },
    likes: [{ type: String }],
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);

module.exports = { PostModel };
