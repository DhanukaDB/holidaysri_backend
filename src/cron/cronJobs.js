// cronJobs.js
const cron = require('node-cron');
const Hotel = require('../models/Hotel');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Set up the email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // E.g., 'gmail'
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: to, // Recipient address
    subject: subject,
    text: text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response); // Success logging
  } catch (error) {
    console.error("Error sending email: ", error); // Error logging
    throw error; // Throw the error to handle it in the calling function
  }
};

// Scheduled task to check for expired hotels daily at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Checking for expired hotels...');
  try {
    const currentDate = new Date();
    const expiredHotels = await Hotel.find({ expirationDate: { $lte: currentDate } });

    for (const hotel of expiredHotels) {
      const emailSubject = 'Your Hotel Advertisement has Expired';
      const emailText = `Dear user,\n\nYour hotel advertisement "${hotel.hotelName}" has expired. Please consider renewing it.`;
      
      // Send email notification
      await sendEmail(hotel.email, emailSubject, emailText);
    }

    console.log(`Sent notifications for ${expiredHotels.length} expired hotels.`);
  } catch (error) {
    console.error('Error checking expired hotels:', error);
  }
});

// Scheduled task to check for hotels expiring within the next 3 days
cron.schedule('0 0 * * *', async () => {
    console.log('Checking for hotels expiring soon...');
    try {
      const currentDate = new Date();
      const threeDaysLater = new Date(currentDate);
      threeDaysLater.setDate(currentDate.getDate() + 3);
  
      const soonToExpireHotels = await Hotel.find({ expirationDate: { $gt: currentDate, $lt: threeDaysLater } });
  
      for (const hotel of soonToExpireHotels) {
        const emailSubject = 'Your Hotel Advertisement is Expiring Soon';
        const emailText = `Dear user,\n\nYour hotel advertisement "${hotel.hotelName}" is set to expire on ${new Date(hotel.expirationDate).toLocaleDateString()}. Please consider renewing it.`;
        
        // Send email notification
        await sendEmail(hotel.email, emailSubject, emailText);
      }
  
      console.log(`Sent notifications for ${soonToExpireHotels.length} hotels expiring soon.`);
    } catch (error) {
      console.error('Error checking hotels expiring soon:', error);
    }
  });

module.exports = {}; // Export if you need to extend functionality later
