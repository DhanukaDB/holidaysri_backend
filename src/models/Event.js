const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  
    eventName: {
        type: String,
    },
    email: {
        type: String,
    },
    contactNo: {
        type: String,
    },
    date: {
        type: String,
    },
    ticketPrice: {
        type: String,
    },
    maximumCrowd: {
        type: String,
    },
    eventLocation: {
        type: String,
    },
    description: {
        type: String,
    },
    images: {
        type: [String], // Array of strings to store image URLs
        validate: {
            validator: function (v) {
                return v.length <= 6; // Validate that the array length is at most 6
            },
            message: props => `${props.value} exceeds the limit of 6 images per location!`
        }
    },

    expirationDate: { type: Date, required: true },

   
}, { timestamps: true }); // Adding { timestamps: true } here

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

