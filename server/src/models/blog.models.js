const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    min: 1,
    require: true,
  },
  summary: {
    type: String,
    min: 1,
    require: true,
  },
  author: {
    type: String,
    min: 1,
    require: true,
  },
  image: {
    type: String,
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
});

module.exports = mongoose.model("Blog", blogSchema);
