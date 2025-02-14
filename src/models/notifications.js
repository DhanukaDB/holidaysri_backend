// models/Notification.js
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    notifications: {
        type: [String],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);