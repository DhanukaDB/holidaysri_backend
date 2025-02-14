const User = require("../models/User");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

//fetch suser profile
exports.getUserProfile = async (req,res) =>{
    try{
        if(!req.user) {
            res.status(422).json({
                success:false,
                desc:"Can not find the user - please check again",

            });
        }else {
            res.status(200).send({
                suser:req.user,
            });
        }
    }catch(error) {
        res.status(500).json({
            success:false,
            desc:"Error in getUserProfile controller - "+error,
        });
    }
};

//update cutomer profile
exports.updateUserProfile = async (req,res) => {
    const {name,email,contactNumber,isSubscribed,password} = req.body;

    try{
        const newData = {
            name,
            email,
            contactNumber,
            isSubscribed,
            password
        };

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            newData,
            {
                new:true,
                upsert:false,
                omitUndefined:true
            }
        );
        res.status(200).send({
            success:true,
            desc: "user update successfully",
            updatedUser,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            desc:"Error in updating user profile controller " +error,
        });
    }
};

//delete suser profile
exports.deleteUserProfile = async(req,res) =>{

    if (!mongoose.Types.ObjectId.isValid(req.user._id))
        return res.status(404).send(`No user with id: ${req.user._id}`);

    try {
        await User.findByIdAndRemove(req.user._id);
        const deletedUser = await DeletedUserModel.create({
            userID:req.user._id
        });
       
        res.status(200).send({
            success: true,
            desc: "user deleted successfully",
            deletedUser,

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in delete User Profile controller-" + error,
        });
    }


};


exports.allProfiles =  (req,res) =>{
    
    User.find().then((Users) => {
        res.json(Users)

    }).catch((err) => {
      
    })
    
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 Minutes

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        to: user.email,
        subject: "Password reset token",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email sent" });
    } catch (err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res.status(500).json({ msg: "Email could not be sent" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Token" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ success: true, data: "Password updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};



// Update contactNumber and countryCode by Email
exports.updateContactDetails = async (req, res) => {
  try {
    const { email } = req.params; // Email passed in as a route parameter
    const { contactNumber, countryCode } = req.body; // New details from the request body

    // Check if both fields are provided
    if (!contactNumber || !countryCode) {
      return res.status(400).json({
        success: false,
        message: "Both contactNumber and countryCode are required",
      });
    }

    // Find user by email and update the fields
    const updatedUser = await User.findOneAndUpdate(
      { email }, // Filter: find the user by email
      { $set: { contactNumber, countryCode } }, // Update the fields
      { new: true, runValidators: true } // Options: return updated document and run schema validations
    );

    // If no user found
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found with the provided email",
      });
    }

    // Success response
    res.status(200).json({
      success: true,
      message: "Contact details updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating contact details:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Exported function to find user by email
exports.findUserByEmail = async (req, res) => {
  try {
    const { email } = req.params; // Extract email from route parameters

    // Validate email
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Find user by email (exclude password using projection)
    const user = await User.findOne({ email }).select("-password -__v");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Return all user fields (password excluded)
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error finding user by email:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.updateUserProfileByEmail = async (req, res) => {
  const { email } = req.params; // Extract email from URL parameters
  const updateData = req.body;  // Extract fields to update from request body

  try {
    // Find the user by email and update their profile
    const updatedUser = await User.findOneAndUpdate(
      { email },             // Filter to find user by email
      { $set: updateData },  // Update fields with provided data
      { new: true, runValidators: true } // Return updated document and run validators
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found with the provided email.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while updating the profile. Please try again later.",
    });
  }
};
