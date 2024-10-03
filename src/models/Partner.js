const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const PartnerSchema = new Schema(
  {
    subscription: {
      type: String,
      default: "regular",
    },
    role: {
      type: String,
      default: "partner",
    },
    name: {
      type: String,
    },
    subrole: {
      type: String,
      required: true, // Corrected from "require"
    },
    nic: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    contactNumber: {
      type: Number,
      required: true, // Corrected from "require"
    },
    password: {
      type: String,
      required: true, // Corrected from "require"
    },
    location: {
      type: String,
    },
    country: {
      type: String,
    },
    partnerProfileImage: {
      type: String,
    },
    age: {
      type: String, // new
    },
    gender: {
      type: String, // new
    },
    bio: {
      type: String, // new
    },
    interest: {
      type: String, // new
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true, // Enable timestamps
  }
);

// Pre-save hook to hash password before saving
PartnerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
PartnerSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate JWT token
PartnerSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Partner = mongoose.model("Partner", PartnerSchema);
module.exports = Partner;
