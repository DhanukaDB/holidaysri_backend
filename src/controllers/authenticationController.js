const Admin = require("../models/Admin");
const User = require("../models/User");
const Guide = require("../models/Guide");
const Partner = require("../models/Partner");
const Agent = require("../models/Agent");
const Seller = require("../models/Seller");
const sendEmail = require('../utils/sendEmail'); // Utility to send email


exports.registerUser = async (req, res, next) => {
  const { subscription,role,name, email, contactNumber, password } = req.body;
 
  try {
    const user = await User.create({
      subscription,
      role,
      name,
      email,
      contactNumber,
      password,
    });
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "User registration failed. Please try again later.",
    });
  }
};

exports.registerAdmin = async (req, res, next) => {
  const { email, phoneno, password } = req.body;

  try {
    const admin = await Admin.create({
      email,
      phoneno,
      password,
    });
    sendToken2(admin, 201, res);
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in registersuser" + error,
    });
  }
};

exports.registerGuide = async (req, res, next) => {
  const { subscription, role, name, nic, email, contactNumber, password, location, certificateImage, experience, profileImage } = req.body;

  if (subscription !== "subscribed") {
    return res.status(400).json({
      success: false,
      error: "Subscription status must be 'subscribed' to register.",
    });
  }

  try {
    const guide = await Guide.create({
      subscription,
      role,
      name,
      nic,
      email,
      contactNumber,
      password,
      location,
      certificateImage,
      experience,
      profileImage
    });
    sendToken1(guide, 201, res, email);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error occurred in register guide: " + error.message,
    });
  }
};


exports.registerPartner = async (req, res, next) => {
  const { subscription, role, name, subrole, nic, email, contactNumber, password, location, profileImage } = req.body;

  // Validate subscription
  if (subscription !== "subscribed") {
    return res.status(400).json({
      success: false,
      error: "Subscription must be 'subscribed'.",
    });
  }

  try {
    const partner = await Partner.create({
      subscription,
      role,
      name,
      subrole,
      nic,
      email,
      contactNumber,
      password,
      location,
      profileImage,
      subscription,
    });
    sendToken3(partner, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error occurred in registerPartner: " + error,
    });
  }
};





exports.registerAgent = async (req, res, next) => {
  const {role,subrole,name,nic,passport,email,contactNumber,password,promoCode, image } = req.body;

  try {
    const agent = await Agent.create({
            role,
            subrole,
            name,
            nic,
            passport,
            email,
            contactNumber,
            password,
            promoCode,
            image
    });
    sendToken4(agent, 201, res);
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in registers agent" + error,
    });
  }
};





exports.registerSeller = async (req, res, next) => {
  const {role,name, email,contactNumber,password} = req.body;

  try {
    const seller = await Seller.create({
            role,
            name,
            email,
            contactNumber,
            password
    });
    sendToken5(seller, 201, res);
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in registers Seller" + error,
    });
  }
};




exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      desc: "Provide email and password",
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials, please try again",
      });
    }

    sendToken(user, 200, res, email);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      desc: "Provide email, password, and role",
    });
  }

  try {
    const admin = await Admin.findOne({ email: email }).select("+password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await admin.matchPasswords(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials - Please check again",
      });
    }

    // If everything is successful, send the response with the token
    sendToken2(admin, 200, res, email);
  } catch (error) {
    // If an error occurs during the process, handle it properly
    console.error("Error logging in admin:", error);
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred",
    });
  }
};

exports.guideLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      desc: "Provide email and password",
    });
  }

  try {
    const guide = await Guide.findOne({ email }).select("+password");

    if (!guide) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await guide.matchPasswords(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials, please try again",
      });
    }

    sendToken1(guide, 200, res, email); // Pass email to the sendToken1 function
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.partnerLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      desc: "Provide email and password",
    });
  }

  try {
    const partner = await Partner.findOne({ email }).select("+password");

    if (!partner) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await partner.matchPasswords(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials, please try again",
      });
    }

    sendToken3(partner, 200, res, email);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};







exports.agentLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      desc: "Provide email and password",
    });
  }

  try {
    const agent = await Agent.findOne({ email }).select("+password");

    if (!agent) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await agent.matchPasswords(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials, please try again",
      });
    }

    sendToken4(agent, 200, res, email);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};




exports.sellerLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      desc: "Provide email and password",
    });
  }

  try {
    const seller = await Seller.findOne({ email }).select("+password");

    if (!seller) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await seller.matchPasswords(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials, please try again",
      });
    }

    sendToken5(seller, 200, res, email);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, error: 'No user found with that email' });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();

    // Save token to the database
    await user.save();

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/passwordreset/${resetToken}`;

    // Send email
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to this link to reset your password:</p>
      <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
    `;

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: message
    });

    res.status(200).json({ success: true, data: 'Email sent' });

  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(500).json({ success: false, error: 'Email could not be sent' });
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid Token' });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ success: true, data: 'Password Reset Success' });

  } catch (error) {
    res.status(500).json({ success: false, error: 'Could not reset password' });
  }
};


const sendToken = (user, statusCode, res, email) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token, user, email });
};

const sendToken1 = (guide, statusCode, res, email) => {
  const token = guide.getSignedToken();
  res.status(statusCode).json({ success: true, token, guide, email }); // Include email in the response
};

const sendToken2 = (admin, statusCode, res, email) => {
  const token = admin.getSignedToken();
  res.status(statusCode).json({ sucess: true, token, admin, email });
};

const sendToken3 = (partner, statusCode, res, email) => {
  const token = partner.getSignedToken();
  res.status(statusCode).json({ sucess: true, token, partner, email });
};


const sendToken4 = (agent, statusCode, res, email) => {
  const token = agent.getSignedToken();
  res.status(statusCode).json({ sucess: true, token, agent, email });
};



const sendToken5 = (seller, statusCode, res, email) => {
  const token = seller.getSignedToken();
  res.status(statusCode).json({ sucess: true, token, seller, email });
};

