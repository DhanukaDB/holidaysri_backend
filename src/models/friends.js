// models/Friend.js
const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    friends: {
        type: [String],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Friend', friendSchema);