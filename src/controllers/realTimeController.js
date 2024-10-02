const realTimeDetails = require("../models/RealTime");
const Backup = require("../models/Backup");
// const { sendRideAddEmail} = require('../utils/email')

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
    res.json("RealTime Advertisement Added");
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
