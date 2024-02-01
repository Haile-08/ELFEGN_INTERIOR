const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    min: 1,
  },
  image: {
    type: String,
    min: 1,
  },
  category: {
    type: String,
    min: 1,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
    min: 1,
  },
  star: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,  
  },
  date: {
    type: String,
    min: 1,
  },
  number_reviewed: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
