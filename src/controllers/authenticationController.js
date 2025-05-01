const Admin = require("../models/Admin");
const User = require("../models/User");
const Guide = require("../models/Guide");
const Partner = require("../models/Partner");
const Agent = require("../models/Agent");
const Seller = require("../models/Seller");
const Coin = require("../models/Coins");
const diamond = require("../models/diamond");
const gem = require("../models/gems");
const hsToken = require("../models/tokens");
const voucher = require("../models/voucher");
const gift = require("../models/gift");
const rewards = require("../models/rewardPoints");
const timeCurrency = require("../models/timeCurency");
const friends = require("../models/friends");
const favorites = require("../models/favorites");
const allFavorites = require("../models/AllFavorite");
const notifications = require("../models/notifications");
const cart = require("../models/cart");
const bankDetails = require("../models/bankDetails");
const saveList = require("../models/saveList");

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


// Register User 

exports.registerUser = async (req, res, next) => {
  const { subscription, role, name, email, contactNumber,countryCode, password, RegisterType } = req.body;

  try {
    // Define additional role-based fields as strings
    let isAgent = "False";
    let isAdvertiser = "False";
    let isGuider = "False";
    let isPartner = "False";

    // Set role-specific flags
    switch (role) {
      case "Agent":
        isAgent = "True";
        break;
      case "Advertiser":
        isAdvertiser = "True";
        break;
      case "Tour Guider":
        isGuider = "True";
        break;
      case "Travel Buddy":
        isPartner = "True";
        break;
      default:
        break;
    }

    // Create user with additional fields
    const user = await User.create({
      subscription,
      role,
      name,
      email,
      contactNumber,
      countryCode,
      password,
      isAgent,
      isAdvertiser,
      isGuider,
      isPartner,
      RegisterType,
    });

    // Save email and initial coins in Coin database
    await Coin.create({
      email: email,
      coins: 0, // Initial coin allocation
    });

    await diamond.create({
      email: email,
      diamonds: 0, // Initial coin allocation
    });

    await gem.create({
      email: email,
      freeGems: 100, // Initial coin allocation
      ActualGems: 0,
    });

    await hsToken.create({
      email: email,
    });

    await voucher.create({
      email: email,
      vouchers: 0, // Initial coin allocation
    });

    await gift.create({
      email: email,
      gifts: 0, // Initial coin allocation
    });

    await rewards.create({
      email: email,
      points: 0, // Initial coin allocation
    });

    await timeCurrency.create({
      email: email,
      timeCurencys: {
        hours: 24, // Pass hours
        minutes: 30, // Pass minutes
      },
    });

    await friends.create({
      email: email, // Initial friends allocation
    });

    await favorites.create({
      email: email, // Initial favorites allocation
    });

    await notifications.create({
      email: email, // Initial notifications allocation
    });

    await allFavorites.create({
      email: email, // Initial All Favorite  allocation
    });

    await cart.create({
      email: email, // Initial cart allocation
    });

    await bankDetails.create({
      email: email, // Initial bank Details allocation
    });

    await saveList.create({
      email: email, // Initial save List allocation
    });
    

    // Send token for successful registration
    sendToken(user, 200, res);
  } catch (error) {
    console.error("Error during user registration:", error);

    // If user creation succeeds but coin creation fails, ensure consistency
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        error: "User already exists or duplicate email.",
      });
    } else {
      res.status(500).json({
        success: false,
        error: "User registration failed. Please try again later.",
      });
    }
  }
};

exports.registerAdmin = async (req, res, next) => {
  const { email, contactNumber, password } = req.body;

  try {
    const admin = await Admin.create({
      email,
      contactNumber,
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

  const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

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
      profileImage,
      expirationDate,
    });

    // Prepare the email content
    const subject = 'Guide Registration Successful';
    const message = `Dear ${name},\n\nYour guide registration has been completed successfully!\n\nThank you for registering with us. You now have access to the platform for 30 days as a subscribed member.\n\nBest regards,\nYour Company Team`;

    // Send email notification to the user
    await sendEmail(email, subject, message);

    sendToken1(guide, 201, res, email);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error occurred in register guide: " + error.message,
    });
  }
};


exports.registerPartner = async (req, res, next) => {
  const { subscription, role, name, subrole, nic, email, contactNumber, password, location,country, gender, age, bio, interest, partnerProfileImage } = req.body;

  const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

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
      country,
      gender,
      age,
      bio,
      interest,
      partnerProfileImage,
      expirationDate,
    });

    // Prepare the email content
    const subject = 'Travel Partner Registration Successful';
    const message = `Dear ${name},\n\nYour Travel Partner registration has been completed successfully!\n\nThank you for registering with us. You now have access to the platform for 30 days as a subscribed member.\n\nBest regards,\nYour Company Team`;

    // Send email notification to the user
    await sendEmail(email, subject, message);

    sendToken3(partner, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error occurred in registerPartner: " + error,
    });
  }
};





exports.registerAgent = async (req, res, next) => {
  const {role,subrole,name,nic,passport,email,contactNumber,password,promoCode, image,country } = req.body;

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
            image,
            country
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