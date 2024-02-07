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
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    min: 1,
  },
  password: {
    type: String,
    min: 8,
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
