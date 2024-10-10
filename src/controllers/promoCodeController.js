const PromoCode = require("../models/promo_code");
const Earning = require("../models/earnings");
const Order = require("../models/Order");
const ArchivedEarn = require("../models/ArchivedEarns");
const nodemailer = require('nodemailer');

// Generate promo code
exports.generatePromoCode = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if a promo code already exists for the provided email
    let promoCode = await PromoCode.findOne({ email });

    // If a promo code exists and hasn't expired, return it
    if (promoCode && promoCode.expirationDate > new Date()) {
      return res.status(200).send(promoCode);
    }

    // If no promo code exists or it has expired, generate a new one
    const generatedCode = generatePromoCode();

    // Calculate expiration date (1 year from the code generated date)
    const expirationDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    // If a promo code exists but has expired, update it with a new code and expiration date
    if (promoCode) {
      promoCode.code = generatedCode;
      promoCode.expirationDate = expirationDate;
    } else {
      // If no promo code exists, create a new one
      promoCode = new PromoCode({
        email,
        code: generatedCode,
        expirationDate,
      });
    }

    // Save the promo code (new or updated)
    await promoCode.save();

    // Send email notification to the user
    const emailSubject = 'Your New Promo Code';
    const emailText = `Dear user,\n\nYour promo code is: ${generatedCode}.\n\nIt will expire on ${expirationDate.toDateString()}.\n\nThank you!`;
    
    // Call the function to send the email
    await sendEmail(email, emailSubject, emailText);

    res.status(201).send(promoCode);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Apply promo code
exports.applyPromoCode = async (req, res) => {
  try {
    const { promoCode } = req.body; // Accept amount from the request body

    const promoCodeObj = await PromoCode.findOne({ code: promoCode });

    if (!promoCodeObj) {
      return res.status(404).json({ error: 'Invalid promo code' });
    }

    // Check for expiration and active status
    if (promoCodeObj.expirationDate < new Date() || !promoCodeObj.isActive) {
      return res.status(403).json({ error: 'Promo code is expired or inactive' });
    }

    
// Get the email bound to the promo code
    const email = promoCodeObj.email;
    const discountPercentage = promoCodeObj.discountPercentage;
    const code = promoCodeObj.code;

    const earning = new Earning({
      email,
      promoCode,
    });

    // await earning.save();

    res.status(200).json({ email,code });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Save earnings
exports.saveEarnings = async (req, res) => {
  try {
    const { email, amount,orderId, promoCode, } = req.body;

    const earning = new Earning({
      email,
      amount,
      orderId,
      promoCode,
    });

    await earning.save();

    res.status(200).json({ message: 'Earnings saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { email, totalAmount, promoCode, payableAmount, items } = req.body;

    const order = new Order({ email, totalAmount, promoCode, payableAmount, items });
    await order.save();

    res.status(201).send(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Reactivate promo code
exports.reactivatePromoCode = async (req, res) => {
  try {
    const { code, email } = req.body;

    // Find the promo code by code and email
    const promoCodeObj = await PromoCode.findOne({ code, email });

    if (!promoCodeObj) {
      return res.status(404).json({ error: 'Promo code not found for this email' });
    }

    // Get current date and one year ahead
    const currentDate = new Date();
    const oneYearAhead = new Date(currentDate.getTime() + 365 * 24 * 60 * 60 * 1000);

    // If promo code's expiration is greater than one year ahead of current time, reject the update
    if (promoCodeObj.expirationDate > oneYearAhead) {
      return res.status(400).json({ error: 'Promo code expiration cannot be extended by more than one year.' });
    }

    // Extend expiration date by one year from the current expiration date, but ensure it doesn't exceed the one-year limit
    const newExpirationDate = new Date(promoCodeObj.expirationDate.getTime() + 365 * 24 * 60 * 60 * 1000);

    if (newExpirationDate > oneYearAhead) {
      promoCodeObj.expirationDate = oneYearAhead;
    } else {
      promoCodeObj.expirationDate = newExpirationDate;
    }

    promoCodeObj.isActive = true; // Reactivate the promo code

    // Save the updated promo code
    await promoCodeObj.save();

    res.status(200).json({ message: 'Promo code expiration date extended successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Set up the email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // Example: 'gmail', 'SendGrid', etc.
  auth: {
    user: process.env.EMAIL_USER,  // Your email address
    pass: process.env.EMAIL_PASS   // Your email password or app password
  }
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to: to, // recipient address
    subject: subject,
    text: text
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};

// New Controller: Update promo code expiration date by email
// This function allows updating the expiration date of an existing promo code by email
exports.updatePromoCodeExpiration = async (req, res) => {
  try {
    const { email, newExpirationDate } = req.body;

    // Find the promo code by the user's email
    const promoCodeObj = await PromoCode.findOne({ email });

    if (!promoCodeObj) {
      return res.status(404).json({ error: 'Promo code not found for this email' });
    }

    // Update the expiration date with the new provided date (1 year from now)
    promoCodeObj.expirationDate = new Date(newExpirationDate);

    // Save the updated promo code
    await promoCodeObj.save();

   // Send email notification to the user
    const emailSubject = 'Promo Code Expiration Date Updated';
    const emailText = `Dear user,\n\nThe expiration date for your promo code has been updated to ${newExpirationDate}.\n\nThank you!`;
    
    // Call the function to send the email
     await sendEmail(email, emailSubject, emailText);

    res.status(200).json({ message: 'Promo code expiration date updated successfully and email sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function generatePromoCode() {
  const length = 8; // You can adjust the length as needed
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

// View all earnings details
exports.viewEarnings = async (req, res) => {
  try {
    const earnings = await Earning.find();
    res.json(earnings);
  } catch (err) {
    res.status(500).json({ error: "Error fetching earnings details", message: err.message });
  }
};

exports.deleteAndSaveEarns = async (req, res) => {
  const { earns } = req.body;

  try {
    if (earns && earns.length > 0) {
      await ArchivedEarn.insertMany(earns);
    }

    const ids = earns.map((earn) => earn._id);
    await Earning.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Records deleted and saved successfully." });
  } catch (error) {
    console.error("Error deleting and saving records:", error);
    res.status(500).json({ message: "An error occurred while processing." });
  }
};

// View all earnings details
exports.viewArchived = async (req, res) => {
  try {
    const archives = await ArchivedEarn.find();
    res.json(archives);
  } catch (err) {
    res.status(500).json({ error: "Error fetching archived earnings details", message: err.message });
  }
};

// Check if promo code already exists
exports.checkExistingPromoCode = async (req, res) => {
  try {
    const { email } = req.query; // Assuming email is passed as a query parameter

    const promoCodeObj = await PromoCode.findOne({ email });

    if (!promoCodeObj) {
      return res.status(404).json({ message: 'No promo code found for this user.' });
    }

    // Send both the promo code and isActive status in the response
    res.status(200).json({
      promoCode: promoCodeObj.code,
      isActive: promoCodeObj.isActive,
      expirationDate: promoCodeObj.expirationDate
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};