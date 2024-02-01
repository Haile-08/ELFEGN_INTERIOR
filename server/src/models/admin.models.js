const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
  password: {
    type: String,
    min: 8,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
