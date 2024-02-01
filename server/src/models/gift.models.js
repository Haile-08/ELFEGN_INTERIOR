const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const giftSchema = new Schema({
  seller_id: {
    type: String,
    min: 1,
  },
  gift_name: {
    type: String,
    min: 1,
  },
  gift_image: {
    type: String,
    min: 1,
  },
  gift_category: {
    type: String,
    min: 1,
  },
  gift_price: {
    type: Number,
  },
  gift_description: {
    type: String,
    min: 1,
  },
  gift_star: {
    type: Number,
    default: 0,
  },
  gift_client: {
    type: String,
    min: 1,
  },
  gift_location: {
    type: String,
    min: 1,
  },
  gift_status: {
    type: Boolean,
  },
  gift_date: {
    type: String,
    min: 1,
  },
  number_reviewed: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Gift", giftSchema);
