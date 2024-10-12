// cronJobs.js
const cron = require('node-cron');
const Hotel = require('../models/Hotel');
const PromoCode = require("../models/promo_code");
const realTimeDetails = require("../models/RealTime");
const Guider = require("../models/Guide");
const vehicleDetails = require("../models/Vehicle");
const Partner = require('../models/Partner');

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
cron.schedule('0 0,12 * * *', async () => {
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
cron.schedule('0 0,12 * * *', async () => {
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

  // Cron job to send emails for expired promo codes
cron.schedule('0 0,12 * * *', async () => {
    try {
      console.log('Running daily expired promo code check...');
  
      // Find all promo codes that have expired
      const expiredPromoCodes = await PromoCode.find({ expirationDate: { $lt: new Date()}});
  
      if (expiredPromoCodes.length > 0) {
        for (let promoCode of expiredPromoCodes) {
          // Send email to the user informing them that their promo code has expired
          const emailSubject = 'Promo Code Expired';
          const emailText = `Dear user,\n\nYour promo code ${promoCode.code} has expired on ${promoCode.expirationDate.toDateString()}.\n\nThank you!`;
  
          await sendEmail(promoCode.email, emailSubject, emailText);
  
          await promoCode.save();
        }
      }
    } catch (error) {
      console.error("Error in expired promo code cron job:", error.message);
    }
  });
  
  // Cron job to send emails for promo codes expiring within 3 days
  cron.schedule('0 0,12 * * *', async () => {
    try {
      console.log('Running daily soon-to-expire promo code check...');
  
      // Find promo codes that will expire within 3 days
      const threeDaysFromNow = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  
      const soonToExpirePromoCodes = await PromoCode.find({
        expirationDate: { $gte: new Date(), $lte: threeDaysFromNow },
        isActive: true
      });
  
      if (soonToExpirePromoCodes.length > 0) {
        for (let promoCode of soonToExpirePromoCodes) {
          // Send email to the user informing them that their promo code is about to expire
          const emailSubject = 'Promo Code Expiring Soon';
          const emailText = `Dear user,\n\nYour promo code ${promoCode.code} is expiring soon on ${promoCode.expirationDate.toDateString()}.\n\nThank you!`;
  
          await sendEmail(promoCode.email, emailSubject, emailText);
        }
      }
    } catch (error) {
      console.error("Error in soon-to-expire promo code cron job:", error.message);
    }
  });


  // Cron job to send emails when real-time advertisements expire
cron.schedule('0 0,12 * * *', async () => {
    try {
        console.log('Checking for expired real-time advertisements...');

        const expiredRides = await realTimeDetails.find({
            expirationDate: { $lt: new Date() },
        });

        if (expiredRides.length > 0) {
            for (let ride of expiredRides) {
                const emailSubject = 'Your Ride Advertisement Has Expired';
                const emailText = `Dear user,\n\nYour ride advertisement for vehicle ${ride.vehicleID} has expired on ${ride.expirationDate.toDateString()}.\n\nPlease renew your advertisement or contact support for more information.`;

                await sendEmail(ride.email, emailSubject, emailText);

                await ride.save();
            }
        }

        console.log(`Sent expiration notifications for ${expiredRides.length} expired rides.`);
    } catch (error) {
        console.error('Error in expired real-time advertisement cron job:', error.message);
    }
});

// Cron job to send emails for real-time advertisements expiring within 3 days and where DailyOrMonth = 'Monthly'
cron.schedule('0 0,12 * * *', async () => {
    try {
        console.log('Running daily check for soon-to-expire Monthly ride advertisements...');

        // Get the current date and the date 3 days from now
        const currentDate = new Date();
        const threeDaysFromNow = new Date(currentDate);
        threeDaysFromNow.setDate(currentDate.getDate() + 3);

        // Find rides (realTimeDetails) that are Monthly and will expire within 3 days
        const soonToExpireMonthlyRides = await realTimeDetails.find({
            DailyOrMonth: 'Monthly', // Only select rides with Monthly subscription
            expirationDate: { $gte: currentDate, $lte: threeDaysFromNow } // Expiring in the next 3 days
        });

        // Send emails to users with rides expiring soon
        if (soonToExpireMonthlyRides.length > 0) {
            for (let ride of soonToExpireMonthlyRides) {
                const emailSubject = 'Your Monthly Ride Advertisement is Expiring Soon';
                const emailText = `Dear user,\n\nYour monthly ride advertisement for vehicle ${ride.vehicleID} is expiring soon on ${new Date(ride.expirationDate).toDateString()}.\n\nPlease renew your advertisement or contact support for more details.\n\nThank you for using our service!`;

                // Send the email notification
                await sendEmail(ride.email, emailSubject, emailText);
            }
        }

        console.log(`Sent notifications for ${soonToExpireMonthlyRides.length} monthly rides expiring soon.`);
    } catch (error) {
        console.error("Error in soon-to-expire monthly ride cron job:", error.message);
    }
});

// Cron job for sending email notifications for expired vehicles
cron.schedule('0 0,12 * * *', async () => { // Every day at midnight
    try {
      const expiredVehicles = await vehicleDetails.find({
        expirationDate: { $lt: new Date() }
      });
  
      if (expiredVehicles.length > 0) {
        const emailsToSend = [...new Set(expiredVehicles.map(vehicle => vehicle.email))]; // Unique emails
  
        emailsToSend.forEach(async (email) => {
          const emailSubject = 'Expired Vehicle Notifications';
          const emailText = `Dear user,\n\nYour vehicle ad(s) have expired. Please check your account for further details.\n\nThank you!`;
          await sendEmail(email, emailSubject, emailText);
        });
  
        console.log(`Expired vehicle notifications sent to ${emailsToSend.length} users.`);
      }
    } catch (error) {
      console.error("Error sending expired vehicle notifications:", error);
    }
  });
  
  // Cron job for sending email notifications for vehicles expiring soon (within 3 days)
  cron.schedule('0 0,12 * * *', async () => { // Every day at midnight
    try {
      const soonExpiringVehicles = await vehicleDetails.find({
        expirationDate: { $gte: new Date(), $lt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) } // Expiring within 3 days
      });
  
      if (soonExpiringVehicles.length > 0) {
        const emailsToSend = [...new Set(soonExpiringVehicles.map(vehicle => vehicle.email))]; // Unique emails
  
        emailsToSend.forEach(async (email) => {
          const emailSubject = 'Vehicle Expiration Reminder';
          const emailText = `Dear user,\n\nYour vehicle ad(s) are about to expire within the next 3 days. Please take necessary actions to extend their validity.\n\nThank you!`;
          await sendEmail(email, emailSubject, emailText);
        });
  
        console.log(`Soon expiring vehicle notifications sent to ${emailsToSend.length} users.`);
      }
    } catch (error) {
      console.error("Error sending soon expiring vehicle notifications:", error);
    }
  });


  // Cron job to send emails when partner' subscriptions have expired
cron.schedule('0 0,12 * * *', async () => { 
    try {
        console.log('Checking for expired guides...');
        const expiredGuides = await Partner.find({
            expirationDate: { $lt: new Date() },
        });

        if (expiredGuides.length > 0) {
            for (let guide of expiredGuides) {
                const emailSubject = 'Your Travel Partner Subscription Has Expired';
                const emailText = `Dear ${guide.name},\n\nYour guide subscription has expired. Please renew it to continue using our services.`;
                await sendEmail(guide.email, emailSubject, emailText);
            }
        }

        console.log(`Sent notifications for ${expiredGuides.length} expired guides.`);
    } catch (error) {
        console.error('Error in expired guide cron job:', error.message);
    }
});

// Cron job to send reminder emails for partner expiring within 3 days
cron.schedule('0 0,12 * * *', async () => { 
    try {
        console.log('Checking for guides expiring within 3 days...');
        const currentDate = new Date();
        const threeDaysLater = new Date();
        threeDaysLater.setDate(currentDate.getDate() + 3);

        const soonToExpireGuides = await Partner.find({
            expirationDate: { $gte: currentDate, $lte: threeDaysLater },
        });

        if (soonToExpireGuides.length > 0) {
            for (let guide of soonToExpireGuides) {
                const emailSubject = 'Your Travel Partner Subscription is Expiring Soon';
                const emailText = `Dear ${guide.name},\n\nYour guide subscription is set to expire on ${guide.expirationDate.toDateString()}. Please renew your subscription to continue enjoying our services.`;
                await sendEmail(guide.email, emailSubject, emailText);
            }
        }

        console.log(`Sent notifications for ${soonToExpireGuides.length} guides expiring soon.`);
    } catch (error) {
        console.error('Error in soon-to-expire guide cron job:', error.message);
    }
});


  // Cron job to send emails when Guider' subscriptions have expired
  cron.schedule('0 0,12 * * *', async () => { 
    try {
        console.log('Checking for expired guides...');
        const expiredGuides = await Guider.find({
            expirationDate: { $lt: new Date() },
        });

        if (expiredGuides.length > 0) {
            for (let guide of expiredGuides) {
                const emailSubject = 'Your Guide Subscription Has Expired';
                const emailText = `Dear ${guide.name},\n\nYour guide subscription has expired. Please renew it to continue using our services.`;
                await sendEmail(guide.email, emailSubject, emailText);
            }
        }

        console.log(`Sent notifications for ${expiredGuides.length} expired guides.`);
    } catch (error) {
        console.error('Error in expired guide cron job:', error.message);
    }
});

// Cron job to send reminder emails for Guider expiring within 3 days
cron.schedule('0 0,12 * * *', async () => { 
    try {
        console.log('Checking for guides expiring within 3 days...');
        const currentDate = new Date();
        const threeDaysLater = new Date();
        threeDaysLater.setDate(currentDate.getDate() + 3);

        const soonToExpireGuides = await Guider.find({
            expirationDate: { $gte: currentDate, $lte: threeDaysLater },
        });

        if (soonToExpireGuides.length > 0) {
            for (let guide of soonToExpireGuides) {
                const emailSubject = 'Your Guide Subscription is Expiring Soon';
                const emailText = `Dear ${guide.name},\n\nYour guide subscription is set to expire on ${guide.expirationDate.toDateString()}. Please renew your subscription to continue enjoying our services.`;
                await sendEmail(guide.email, emailSubject, emailText);
            }
        }

        console.log(`Sent notifications for ${soonToExpireGuides.length} guides expiring soon.`);
    } catch (error) {
        console.error('Error in soon-to-expire guide cron job:', error.message);
    }
});


module.exports = {}; // Export if you need to extend functionality later
