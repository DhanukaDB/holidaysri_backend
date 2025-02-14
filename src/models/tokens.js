const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  sand5Tokens: {
    type: Number,
    required: true,
    min: [0, "tokens cannot be negative"],
    default: 0,
  },
  leaf10Tokens: {
    type: Number,
    required: true,
    min: [0, "tokens cannot be negative"],
    default: 0,
  },
  forest15Tokens: {
    type: Number,
    required: true,
    min: [0, "tokens cannot be negative"],
    default: 0,
  },
  ocean25Tokens: {
    type: Number,
    required: true,
    min: [0, "tokens cannot be negative"],
    default: 0,
  },
  mint50Tokens: {
    type: Number,
    required: true,
    min: [0, "tokens cannot be negative"],
    default: 0,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

tokenSchema.virtual("allTokens").get(function () {
  return this.sand5Tokens + this.leaf10Tokens + this.forest15Tokens + this.ocean25Tokens + this.mint50Tokens;
});

const token = mongoose.model("token", tokenSchema);

module.exports = token;
