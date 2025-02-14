const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  subscription: {
    type:String,
    default: "regular", // this fro commercial Partners
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
    type: String,
  },
  countryCode: {
    type: String,
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

  isAdvertiser: {
    type: String,
    default: 'false',
  },
  isAgent: {
    type: String,
    default: 'false',
  },
  isGuider: {
    type: String,
    default: 'false',
  },
  isPartner: {
    type: String,
    default: 'false',
  },
  ProfilePicture: {
    type: String,
    default: "https://res.cloudinary.com/dqdcmluxj/image/upload/v1734344642/pngtree-vector-edit-profile-icon-png-image_780604-removebg-preview_mxn5im.webp", // Default can be an empty string or a placeholder URL
  },
  RegisterType: {
    type: String,
    required: true,
  },
  AditionalContact: {
    type: String,
    default: "",
  },
  recidentAddress: {
    type: String,
    default: "",
  },
  shippingAddress: {
    type: String,
    default: "",
  },
  NicOrPassport: {
    type: String,
    default: "",
  },
  Country: {
    type: String,
    default: "",
  },
  ProfileStatus: {
    type: String,
    default: "notCompleted",
  },
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

const User = mongoose.model("User", UserSchema);
module.exports = User;
