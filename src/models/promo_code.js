// models/PromoCode.js
const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, unique: true, required: true },
  expirationDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true }, // Add isActive field
  type: { type: String, required: true },
}, { timestamps: true });

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);

module.exports = PromoCode;