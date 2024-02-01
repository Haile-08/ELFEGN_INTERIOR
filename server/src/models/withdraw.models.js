const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const withdrawSchema = new Schema({
  account_name: {
    type: String,
    min: 1,
    require: true,
  },
  account_number: {
    type: String,
    min: 1,
    require: true,
  },
  amount: {
    type: Number,
    min: 1,
  },
  beneficiary_name: {
    type: String,
    min: 1,
    require: true,
  },
  reference: {
    type: String,
    require: true,
  },
  bank_code: {
    type: String,
    require: true,
  },
  bank_name: {
    type: String,
    require: true,
  },
  Approved: {
    type: Boolean,
    min: 1,
    require: true,
  },
  Decline: {
    type: Boolean,
    min: 1,
    require: true,
  },
  success: {
    type: Boolean,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  seller_id: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("withdraw", withdrawSchema);
