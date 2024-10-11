const Guide = require("../models/Guide");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require('nodemailer');


// Set up the email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS  // Your password or app-specific password
  }
});

// Reusable function to send email
const sendEmail = async (to, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    throw error;
  }
};

//fetch suser profile
exports.getGuideProfile = async (req,res) =>{
    try{
        if(!req.guide) {
            res.status(422).json({
                success:false,
                desc:"Can not find the guide - please check again",

            });
        }else {
            res.status(200).send({
                guide:req.guide,
            });
        }
    }catch(error) {
        res.status(500).json({
            success:false,
            desc:"Error in getGuideProfile controller - "+error,
        });
    }
};

//update cutomer profile
exports.updateGuideProfile = async (req,res) => {
    const {Name,Email,contactNumber,password, location} = req.body;

    try{
        const newData = {
            Name,
            Email,
            contactNumber,
            password,
            location
        };

        const updatedGuide = await Guide.findByIdAndUpdate(
            req.guide.id,
            newData,
            {
                new:true,
                upsert:false,
                omitUndefined:true
            }
        );
        res.status(200).send({
            success:true,
            desc: "Guide update successfully",
            updatedGuide,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            desc:"Error in updating guide profile controller " +error,
        });
    }
};

//delete suser profile
exports.deleteGuideProfile = async(req,res) =>{

    if (!mongoose.Types.ObjectId.isValid(req.guide._id))
        return res.status(404).send(`No user with id: ${req.guide._id}`);

    try {
        await Guide.findByIdAndRemove(req.guide._id);
        const deletedGuide = await DeletedGuideModel.create({
            guideID:req.guide._id
        });
       
        res.status(200).send({
            success: true,
            desc: "guide deleted successfully",
            deletedUser,

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in delete Guide Profile controller-" + error,
        });
    }


};


exports.allGuideProfiles =  (req,res) =>{
    
    Guide.find().then((Guides) => {
        res.json(Guides)

    }).catch((err) => {
      
    })
    
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const guide = await Guide.findOne({ email });

    if (!guide) {
      return res.status(404).json({ msg: "guide not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    guide.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    guide.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 Minutes

    await guide.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: guide.email,
      subject: "Password reset token",
      text: message,
    });

    return res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    guide.resetPasswordToken = undefined;
    guide.resetPasswordExpire = undefined;
    await guide.save();
    return res.status(500).json({ msg: "Email could not be sent" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const guide = await Guide.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!guide) {
      return res.status(400).json({ msg: "Invalid Token" });
    }

    guide.password = req.body.password;
    guide.resetPasswordToken = undefined;
    guide.resetPasswordExpire = undefined;

    await guide.save();

    return res.status(200).json({ success: true, data: "Password updated" });
  } catch (err) {
    return res.status(500).send("Server error");
  }
};

// This function allows updating the expiration date of an existing guider Profile by id
exports.updateGuiderExpiration = async (req, res) => {
  try {
    const { _id, newExpirationDate, userEmail } = req.body;

    // Find the vehicle ad by id
    const guiderObj = await Guide.findOne({ _id });

    if (!guiderObj) {
      return res.status(404).json({ error: 'guider not found for this id' });
    }

    // Update the expiration date with the new provided date
    guiderObj.expirationDate = new Date(newExpirationDate);

    // Save the updated vehicle object
    await guiderObj.save();

    // Send email notification to the user
    const emailSubject = 'Guider Profile Expiration Date Updated';
    const emailText = `Dear Guider,\n\nThe expiration date for your Guider Profile has been updated to ${newExpirationDate}.\n\nThank you!`;

    await sendEmail(userEmail, emailSubject, emailText); // Send email to the user

    res.status(200).json({ message: 'Vehicle expiration date updated successfully and email sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};