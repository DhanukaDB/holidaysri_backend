const mongoose = require('mongoose');

const foodAdvertisementSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    default: "Food Advertisement"
  },
  foodName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true,
    validate: [arrayLimit, '{PATH} must have at least 1 image and maximum 4'],
  },
  category: {
    type: String,
    required: true,
    enum: ['Home Made', 'Restaurant', 'Street Food', 'Bakery', 'Cafe', 'Fast Food', 'Fine Dining', 'Dessert']
  },
  type: {
    type: [String],
    required: true,
    validate: [arrayMinLength, '{PATH} must have at least 2 types']
  },
  
  // Location Information
  location: {
    city: {
      type: String,
      required: true
    },
    province: {
      type: String,
      required: true
    }
  },
  
  // Contact Information
  contact: {
    phone: {
      type: String,
      required: true
    },
    email: String,
    facebook: String,
    whatsapp: String,
    mapUrl: String
  },
  
  // Business Options
  delivery: {
    type: Boolean,
    default: false
  },
  priceRange: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  dineIn: Boolean,
  takeAway: Boolean,
  
  adsTimeFrame: {
    type: String,
    enum: ['Daily', 'Monthly'],
    required: true
  },
  // Agent Options
  agentOptions: {
    openForAgent: {
      type: Boolean,
      default: false
    },
    discountRate: Number,
    earnRate: Number
  },
  // Additional Fields
  promocodeUsed: String, // Will be added in next page
  expirationDate: Date, // Will be calculated in controller
  isActive: {
    type: Boolean,
    default: true
  },
  ratings: [{
    userEmail: {
      type: String,
    },
    rating: {
      type: Number, 
      min: 1,
      max: 5,
    }
  }],
  feedback: [{
    userEmail: {
      type: String,
    },
    comment: {
      type: String, 
    }
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  boostPoints: {
    type: Number,
    default: 0
  },
  userEmail: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Validator functions
function arrayLimit(val) {
  return val.length > 0 && val.length <= 4;
}

function arrayMinLength(val) {
  return val.length >= 2;
}

const FoodAdvertisement = mongoose.model('FoodAdvertisement', foodAdvertisementSchema);

module.exports = FoodAdvertisement;