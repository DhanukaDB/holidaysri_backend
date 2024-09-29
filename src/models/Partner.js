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
      required: true,
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
      required: true,
    },
    password: {
      type: String,
      required: true,
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
    
    // New fields
    age: {
      type: Number,
      
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'], // Enum to restrict possible values
      
    },
    bio: {
      type: String,
      maxlength: 500, // Limit the length of bio
    },
    interests: {
      ttype: String,
      maxlength: 500, // Array of strings to store multiple interests
    },

    // For password reset functionality
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
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
