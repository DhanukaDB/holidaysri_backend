const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  categoryType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
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
  contact: {
    phone: {
      type: String,
      required: true
    },
    email: String,
    facebook: String,
    website: String,
    whatsapp: String,
    mapUrl: {
      type: String,
      required: true
    }
  },
  delivery: {
    type: Boolean,
    default: false
  },
  available: {
    type: Boolean,
    default: true
  },
  operatingHours: {
    openTime: {
      type: String,
      required: true
    },
    closeTime: {
      type: String,
      required: true
    }
  },
  diningOptions: [{
    type: String,
    required: true
  }],
  menuFile: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Temporarily Closed'],
    default: 'Active'
  },
  agentOptions: {
    isAgentOption: {
      type: Boolean,
      default: false
    },
    discountRate: Number,
    earnRate: Number
  },
  promocodeUsed: {
    type: String,
    default: null
  },
  expirationDate: {
    type: Date,
    required: true
  },
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
    },
    createdAt: {
      type: Date,
      default: Date.now
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
  },
  adsTimeFrame: {
    type: String,
    enum: ['Monthly', 'Daily'],
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);