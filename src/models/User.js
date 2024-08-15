const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  subscription: {
    type:String,
    default: "regular",
  },
  role: {
    type: String,
    default: "user",
  },
  name: {
    type: String,
    required: true, // Corrected from "require"
  },
  email: {
    type: String,
    unique: true,
    required: true, // Corrected from "require"
  },
  contactNumber: {
    type: Number,
    required: true, // Corrected from "require"
  },
  isSubscribed: {
    type: String,
    default: 'Not subscribed',
  },
  password: {
    type: String,
    required: true, // Corrected from "require"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, {
  timestamps: true // Enable timestamps
});

// Pre-save hook to hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate JWT token
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//reset
UserSchema.methods.getResetPasswordToken = function() {
  // Generate a token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash the token and set it to resetPasswordToken field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set token expiration time (e.g., 1 hour)
  this.resetPasswordExpire = Date.now() + 3600000; // 1 hour

  return resetToken;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
