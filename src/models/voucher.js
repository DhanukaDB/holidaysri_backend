const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  vouchers: {
    type: Number,
    required: true,
    min: [0, "vouchers cannot be negative"],
    default: 0,
  },
  features: [
    {
      voucherName: { type: String },
      feature: { type: String },
      quantity: { type: Number, min: 0 },
    },
  ],
});

const voucher = mongoose.model("voucher", voucherSchema);

module.exports = voucher;
