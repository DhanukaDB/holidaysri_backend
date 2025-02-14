const mongoose = require("mongoose");

const rewardsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], // Email validation
  },
  points: {
    type: Number,
    required: true,
    min: [0, "Reward Points cannot be negative"], // Ensures rewardss are non-negative
    default: 0, // Default value if not provided
  },
});

const rewards = mongoose.model("rewards", rewardsSchema);

module.exports = rewards;
