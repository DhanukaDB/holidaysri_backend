const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;


const UserSchema = new Schema({

  role: {
    type: String,
    default:"user",

  },
 
  name :{
    type: String,
    require: true
},

  email :{
    type: String,
    unique: true,
    require: true
   },
   
  contactNumber : {
    type: Number,
    require: true
},

isSubscribed : {
  type: String,
  default: 'Not subscribed'
},

  password: {
    type: String,
    require: true
 },

  resetPasswordToken : String,
  resetPasswordExpire : Date,

  
})

//pre save runs before save data on Mongodb
UserSchema.pre("save", async function (next) {
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
UserSchema.methods.matchPasswords = async function (password) {
      return await bcrypt.compare(password, this.password); //password refers to user providing one and this.password refers to one that get from db
    };

UserSchema.methods.getSignedToken = function () {
      return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
    };


const User = mongoose.model("User", UserSchema);
module.exports = User;