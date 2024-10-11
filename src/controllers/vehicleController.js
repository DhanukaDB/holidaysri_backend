const vehicleDetails = require("../models/Vehicle");
const Backup = require("../models/Backup");
const nodemailer = require('nodemailer');


// Set up the email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // You can use other services like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS // Your email password or app password
  }
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to: to, // recipient address
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


// Add new Vehicle for system
exports.addNewVehicle = async (req, res) => {
  const {
    vehicleNumber,
    Vehiclecategory,
    contactNumber,
    price,
    nic,
    email,
    gender,
    expDate,
    description,
    images,
    location,
    promoCode,
    driverStatus,
    capacity,
    ac
  } = req.body;

  const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

  try {
    const savedVehicle = await vehicleDetails.findOne({ vehicleNumber: vehicleNumber });

    if (savedVehicle) {
      return res.status(422).json({ error: "Vehicle already exists with that number" });
    }

    const newVehicle = new vehicleDetails({
      vehicleNumber,
      Vehiclecategory,
      contactNumber,
      price,
      nic,
      email,
      gender,
      expDate,
      description,
      images,
      location,
      promoCode,
      driverStatus,
      capacity,
      ac,
      expirationDate
    });

    await newVehicle.save();

    // Send email to the hotel owner
    const emailSubject = "Hotel Added Successfully!";
    const emailText = `Dear ${email},\n\nYour Vehicle ${vehicleNumber} has been successfully added to our system.\nPromo Code: ${promoCode}\nExpiration Date: ${expirationDate}\n\nThank you!`;
    
    // Call the function to send the email
    await sendEmail(email, emailSubject, emailText);

    res.json("Vehicle Added and Email Sent Successfully..!");
  } catch (err) {
    res.status(500).json({ error: "Error adding vehicle details", message: err.message });
  }
};

// Delete existing one
exports.deleteVehicle = async (req, res) => {
  let vehicleNumber = req.params.id;

  try {
    const vehicleToDelete = await vehicleDetails.findById(vehicleNumber);

    if (!vehicleToDelete) {
      return res.status(404).json({ status: "Vehicle not found" });
    }

    const Data = [
      `vehicleNumber: ${vehicleToDelete.vehicleNumber}`,
      `Vehiclecategory: ${vehicleToDelete.Vehiclecategory}`,
      `contactNumber: ${vehicleToDelete.contactNumber}`,
      `price: ${vehicleToDelete.price}`,
      `nic: ${vehicleToDelete.nic}`,
      `email: ${vehicleToDelete.email}`,
      `gender: ${vehicleToDelete.gender}`,
      `expDate: ${vehicleToDelete.expDate}`,
      `description: ${vehicleToDelete.description}`,
      `images: ${vehicleToDelete.images}`,
      `location: ${vehicleToDelete.location}`,
      `promoCode: ${vehicleToDelete.promoCode}`,
      `driverStatus: ${vehicleToDelete.driverStatus}`,
      `capacity: ${vehicleToDelete.capacity}`,
      `ac: ${vehicleToDelete.ac}`
    ];

    const deletedVehicle = new Backup({
      Data,
      originalModel: "Vehicle"
    });

    await deletedVehicle.save();
    await vehicleDetails.findByIdAndDelete(vehicleNumber);

    res.status(200).json({ status: "Deleted Successfully and backed up" });
  } catch (error) {
    res.status(500).json({ status: "Error with Deleting", error: error.message });
  }
};

// Update
exports.updateVehicle = async (req, res) => {
  let id = req.params.id;
  const {
    vehicleNumber,
    Vehiclecategory,
    contactNumber,
    price,
    nic,
    email,
    gender,
    expDate,
    description,
    images,
    location,
    promoCode,
    driverStatus,
    capacity,
    ac
  } = req.body;

  const updateVehicle = {
    vehicleNumber,
    Vehiclecategory,
    contactNumber,
    price,
    nic,
    email,
    gender,
    expDate,
    description,
    images,
    location,
    promoCode,
    driverStatus,
    capacity,
    ac
  };

  try {
    await vehicleDetails.findByIdAndUpdate(id, updateVehicle);
    res.status(200).send({ status: "Vehicle details successfully updated" });
  } catch (err) {
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
};

// View all vehicles
exports.viewVehicle = async (req, res) => {
  try {
    const vehicles = await vehicleDetails.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: "Error fetching vehicles", message: err.message });
  }
};

// View one vehicle
exports.viewOneVehicle = async (req, res) => {
  let vehicleNumber = req.params.id;

  try {
    const vehicle = await vehicleDetails.findById(vehicleNumber);
    if (!vehicle) {
      return res.status(404).json({ status: "Vehicle not found" });
    }
    res.status(200).send({ status: "Vehicle details fetched", vehicle });
  } catch (err) {
    res.status(500).send({ status: "Error with get", error: err.message });
  }
};

// View vehicles by email
exports.viewVehicleByEmail = async (req, res) => {
  const { email } = req.query; // Capture email from query parameter

  try {
    const vehicles = await vehicleDetails.find({ email: email });

    if (vehicles.length === 0) {
      return res.status(404).json({ status: "No vehicles found for this email" });
    }

    res.status(200).json({ status: "Vehicles fetched successfully", vehicles });
  } catch (err) {
    res.status(500).json({ error: "Error fetching vehicles", message: err.message });
  }
};

// This function allows updating the expiration date of an existing vehicle advertisement by id
exports.updateVehicleAddExpiration = async (req, res) => {
  try {
    const { _id, newExpirationDate, userEmail } = req.body;

    // Find the vehicle ad by id
    const vehicleObj = await vehicleDetails.findOne({ _id });

    if (!vehicleObj) {
      return res.status(404).json({ error: 'Vehicle ad not found for this id' });
    }

    // Update the expiration date with the new provided date
    vehicleObj.expirationDate = new Date(newExpirationDate);

    // Save the updated vehicle object
    await vehicleObj.save();

    // Send email notification to the user
    const emailSubject = 'Vehicle Ad Expiration Date Updated';
    const emailText = `Dear user,\n\nThe expiration date for your vehicle ad has been updated to ${newExpirationDate}.\n\nThank you!`;

    await sendEmail(userEmail, emailSubject, emailText); // Send email to the user

    res.status(200).json({ message: 'Vehicle expiration date updated successfully and email sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
