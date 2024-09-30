const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const realTimeSchema = new Schema({

    realTimeID: {
        type: String,
    },
    vehicleID: {
        type: String,
    },
    vehicleOwnerName: {
        type: String,
    },
    images: {
        type: [String], // Array of strings to store image URLs
        validate: {
          validator: function (v) {
            return v.length <= 2; // Validate that the array length is at most 6
          },
          message: props => `${props.value} exceeds the limit of 6 images per location!`
        }
      },
    phoneNumber: {
        type: Number,
    },
    email: {
        type: String,
    },
    Route: {
        type: String,
    },
    Description: {
        type: String,
    },
    Subscription: {
        type: String,
    },
    Maximum: {
        type: Number,
    },
    Availability: {
        type: Number,
    },
    CurrentLocation: {
        type: String,
    },
    Status: {
        type: String,
    },
    price: {
        type: String,
    },
    rideDate: {
        type: String,
    },
    rideTime: {
        type: String,
    },
    ApxTime: {
        type: Number,
    },

   
}, { timestamps: true }); // Adding { timestamps: true } here

const RealTime = mongoose.model("RealTime", realTimeSchema);
module.exports = RealTime;

