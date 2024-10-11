const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;


const GuideSchema = new Schema({
  
  subscription: {
    type:String,
    default: "regular",
  },
  role: {
      type: String,
      default: "guide",
  },
  name: {
      type: String,
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
      required: true
  },
  password: {
      type: String,
      required: true
  },
  
  location: {
      type: String,
      required: true
  },

  certificateImage: {
    type: String
  },

  profileImage: {
    type: String
  },

  experience:{
    type: String
  },
  expirationDate: { type: Date, required: true },
  
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, {
  timestamps: true // Enable timestamps
});

//pre save runs before save data on Mongodb
GuideSchema.pre("save", async function (next) {
      //checking whether the password isModified
      if (!this.isModified("password")) {
        next();
      }
    
      //hash password before passing it to db save query through the model
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt); //this.password reffers to password that contains within request object
    
      next();
    });

//to compare hashed passwords in login scenarios
GuideSchema.methods.matchPasswords = async function (password) {
      return await bcrypt.compare(password, this.password); //password refers to user providing one and this.password refers to one that get from db
    };

GuideSchema.methods.getSignedToken = function () {
      return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
    };


const Guide = mongoose.model("Guide", GuideSchema);
module.exports = Guide;