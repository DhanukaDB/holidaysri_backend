const mongoose = require("mongoose");

const diamondSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], // Email validation
  },
  diamonds: {
    type: Number,
    required: true,
    min: [0, "diamonds cannot be negative"], // Ensures diamonds are non-negative
    default: 0, // Default value if not provided
  },
});

const diamond = mongoose.model("diamond", diamondSchema);

module.exports = diamond;
