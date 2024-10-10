const realTimeDetails = require("../models/RealTime");
const Backup = require("../models/Backup");
const nodemailer = require('nodemailer');

// Set up the email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS  // Your password or app password
  }
});

// Function to send an email
const sendRideAddEmail = async (to, dailyOrMonth, expirationDate) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Ride Added Successfully',
    text: `Dear user,\n\nYour ride advertisement has been added successfully.\n\nHere are the details:\n\n` +
          `Subscription Type: ${dailyOrMonth}\n` +
          `Expiration Date: ${new Date(expirationDate).toDateString()}\n\nThank you for using our service!`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Ride add email sent successfully');
  } catch (error) {
    console.error('Error sending ride add email:', error);
    throw error;
  }
};

// Add new Vehicle for system
exports.addNewRealTime = async (req, res) => {
  const {
    realTimeID,
    vehicleID,
    vehicleOwnerName,
    images,
    phoneNumber,
    email,
    Route,
    Description,
    Subscription,
    Maximum,
    Availability,
    CurrentLocation,
    Status,
    price,
    rideDate,
    rideTime,
    ApxTime,
    DailyOrMonth,
    expirationDate
  } = req.body;

  try {
    const savedRealTime = await realTimeDetails.findOne({ vehicleID: vehicleID });

    // if (savedRealTime) {
    //   return res.status(422).json({ error: "Vehicle already exists with that ID" });
    // }

    const newRealTime = new realTimeDetails({
      realTimeID,
      vehicleID,
      vehicleOwnerName,
      images,
      phoneNumber,
      email,
      Route,
      Description,
      Subscription,
      Maximum,
      Availability,
      CurrentLocation,
      Status,
      price,
      rideDate,
      rideTime,
      ApxTime,
      DailyOrMonth,
      expirationDate
    });

      // const userEmail = newRealTime.email; //now send the email to relevant User
      // await sendRideAddEmail(userEmail);

    await newRealTime.save();

     // Send the email to the user
    await sendRideAddEmail(email, DailyOrMonth, expirationDate);

    res.json("RealTime Advertisement Added and Email Sent");
  } catch (err) {
    res.status(500).json({ error: "Error adding real-time details", message: err.message });
  }
};

// Delete existing one
exports.deleteRealTime = async (req, res) => {
  let realTimeID = req.params.id;

  try {
    const realTimeToDelete = await realTimeDetails.findById(realTimeID);

    if (!realTimeToDelete) {
      return res.status(404).json({ status: "Real-time details not found" });
    }

    const Data = [
      `realTimeID: ${realTimeToDelete.realTimeID}`,
      `vehicleID: ${realTimeToDelete.vehicleID}`,
      `vehicleOwnerName: ${realTimeToDelete.vehicleOwnerName}`,
      `images: ${Array.isArray(realTimeToDelete.images) ? realTimeToDelete.images.join(', ') : realTimeToDelete.images}`,
      `phoneNumber: ${realTimeToDelete.phoneNumber}`,
      `email: ${realTimeToDelete.email}`,
      `Route: ${realTimeToDelete.Route}`,
      `Description: ${realTimeToDelete.Description}`,
      `Maximum: ${realTimeToDelete.Maximum}`,
      `Availability: ${realTimeToDelete.Availability}`,
      `CurrentLocation: ${realTimeToDelete.CurrentLocation}`,
      `Status: ${realTimeToDelete.Status}`,
      `price: ${realTimeToDelete.price}`,
      `rideDate: ${realTimeToDelete.rideDate}`,
      `rideTime: ${realTimeToDelete.rideTime}`
    ];

    const deletedRealTime = new Backup({
      Data,
      originalModel: "RealTime"
    });

    await deletedRealTime.save();
    await realTimeDetails.findByIdAndDelete(realTimeID);

    res.status(200).json({ status: "Deleted Successfully and backed up" });
  } catch (error) {
    res.status(500).json({ status: "Error with Deleting", error: error.message });
  }
};

// Update
exports.updateRealTime = async (req, res) => {
  let id = req.params.id;
  const {
    realTimeID,
    vehicleID,
    vehicleOwnerName,
    images,
    phoneNumber,
    email,
    Route,
    Description,
    Subscription,
    Maximum,
    Availability,
    CurrentLocation,
    Status,
    price,
    rideDate,
    rideTime
  } = req.body;

  const updateRealTime = {
    realTimeID,
    vehicleID,
    vehicleOwnerName,
    images,
    phoneNumber,
    email,
    Route,
    Description,
    Subscription,
    Maximum,
    Availability,
    CurrentLocation,
    Status,
    price,
    rideDate,
    rideTime
  };

  try {
    await realTimeDetails.findByIdAndUpdate(id, updateRealTime);
    res.status(200).send({ status: "Real-time details successfully updated" });
  } catch (err) {
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
};

// View all real-time details
exports.viewRealTime = async (req, res) => {
  try {
    const realTimes = await realTimeDetails.find();
    res.json(realTimes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching real-time details", message: err.message });
  }
};

// View one real-time detail
exports.viewOneRealTime = async (req, res) => {
  let realTimeNumber = req.params.id;

  try {
    const realTime = await realTimeDetails.findById(realTimeNumber);
    if (!realTime) {
      return res.status(404).json({ status: "Real-time details not found" });
    }
    res.status(200).send({ status: "Real-time details fetched", realTime });
  } catch (err) {
    res.status(500).send({ status: "Error with get", error: err.message });
  }
};

// View one real-time detail by owner's name
exports.viewOneRealTimeByName = async (req, res) => {
  const personName = req.params.vehicleOwnerName;

  try {
    const realTime = await realTimeDetails.findOne({ vehicleOwnerName: personName });
    if (realTime) {
      res.status(200).json({ status: "success", realTime });
    } else {
      res.status(404).json({ status: "error", message: "Person not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
