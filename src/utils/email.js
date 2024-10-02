const nodemailer = require('nodemailer');

// Create a transporter using Gmail or another service
const transporter = nodemailer.createTransport({
    
  service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
});

// Function to send email
const sendRideAddedEmail = async (userEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: userEmail, // Receiver's email address
    subject: 'Live Ride Added Successfully', // Subject line
    text: 'Your live ride has been added successfully to the platform!', // Plain text body
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendRideAddedEmail };
