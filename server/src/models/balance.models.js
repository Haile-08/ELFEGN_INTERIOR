const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BalanceSchema = new Schema({
  user_id: {
    type: String,
    min: 1,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Balance", BalanceSchema);
