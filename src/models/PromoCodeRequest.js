const mongoose = require('mongoose');

// Define the schema
const PromoCodeRequestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,  // Full Name is required
  },
  reason: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  requestStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'], // Status options
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const PromoCodeRequest = mongoose.model('PromoCodeRequest', PromoCodeRequestSchema);

module.exports = PromoCodeRequest;
