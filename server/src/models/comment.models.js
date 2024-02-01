const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  BlogId: {
    type: String,
    min: 1,
    require: true,
  },
  content: {
    type: String,
    min: 1,
    require: true,
  },
  date: {
    type: String,
    min: 1,
    require: true,
  },
  user: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
