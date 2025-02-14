// models/NewPromocode.js
const mongoose = require('mongoose');

const newPromocodeSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        unique: true,
    },
    promocodeType: {
        type: String,
        required: true
    },
    promocode: {
        type: String,
        required: true,
        unique: true
    },
    earns: {
        type: Number,
        default: 0
    },
    expirationDate: {
        type: Date,
        default: () => {
            let date = new Date();
            date.setFullYear(date.getFullYear() + 1);
            return date;
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    advertise: {
        type: String,
        default: "off"
    },
    sell: {
        type: String,
        default: "off"
    },
    boostPoints: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('NewPromocode', newPromocodeSchema);
