const mongoose = require("mongoose");

const giftSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  gifts: {
    type: Number,
    required: true,
    min: [0, "gifts cannot be negative"],
    default: 0,
  },
  features: [
    {
      giftName: { type: String },
      feature: { type: String },
      quantity: { type: Number, min: 0 },
    },
  ],
});

const gift = mongoose.model("gift", giftSchema);

module.exports = gift;
