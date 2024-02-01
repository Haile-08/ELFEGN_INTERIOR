const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  GiftId: {
    type: String,
    min: 1,
    require: true,
  },
  BuyerId: {
    type: String,
    min: 1,
    require: true,
  },
  SellerId: {
    type: String,
    min: 1,
  },
  amount: {
    type: Number,
  },
  GiftPrice: {
    type: Number,
    min: 1,
  },
  tx_ref: {
    type: String,
    require: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  GiftImage: {
    type: String,
    require: true,
  },
  GiftName: {
    type: String,
    min: 1,
    require: true,
  },
  OrderDate: {
    type: String,
    min: 1,
    require: true,
  },
  OrderActive: {
    type: Boolean,
    min: 1,
    require: true,
  },
  OrderDelivered: {
    type: Boolean,
    min: 1,
    require: true,
  },
});

module.exports = mongoose.model("order", orderSchema);
