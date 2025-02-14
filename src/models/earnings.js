// models/earning.js
const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  buyeremail: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  promoCode: {
    type: String,
    required: true,
  },
  promoCodeOwner: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  withdrawed: {
    type: String,
    default: "no", // Default value set to "no"
  },
}, { timestamps: true });

const Earning = mongoose.model('Earning', earningSchema);

module.exports = Earning;
