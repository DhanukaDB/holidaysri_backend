// models/Favorite.js
const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    favorites: {
        type: [String],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);