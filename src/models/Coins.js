const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], // Email validation
  },
  coins: {
    type: Number,
    required: true,
    min: [0, "Coins cannot be negative"], // Ensures coins are non-negative
    default: 0, // Default value if not provided
  },
});

const Coin = mongoose.model("Coin", coinSchema);

module.exports = Coin;
