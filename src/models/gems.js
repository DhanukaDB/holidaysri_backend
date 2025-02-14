const mongoose = require("mongoose");

const gemSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  freeGems: {
    type: Number,
    required: true,
    min: [0, "gems cannot be negative"],
    default: 0,
  },
  ActualGems: {
    type: Number,
    required: true,
    min: [0, "gems cannot be negative"],
    default: 0,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

gemSchema.virtual("allGems").get(function () {
  return this.freeGems + this.ActualGems;
});

const gem = mongoose.model("gem", gemSchema);

module.exports = gem;
