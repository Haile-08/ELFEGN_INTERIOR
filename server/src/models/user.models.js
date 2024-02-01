const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    min: 1,
  },
  lastName: {
    type: String,
    min: 1,
  },
  country: {
    type: String,
    min: 1,
  },
  city: {
    type: String,
    min: 1,
  },
  street: {
    type: String,
    min: 1,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: 8,
  },
  date: {
    type: String,
    min: 1,
  },
  bank_name: {
    type: String,
    min: 1,
  },
  account_name: {
    type: String,
    min: 1,
  },
  account_number: {
    type: Number,
    min: 1,
  },
  is_a_buyer: {
    type: Boolean,
  },
  phone_number: {
    type: String,
  },
  image: {
    type: String,
  },
  rated_gifts: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
