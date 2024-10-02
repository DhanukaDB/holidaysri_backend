const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({


  hotelName: {
    type: String,
  },

  category: {
    type: String
  },

  email: {
    type: String
  },

  location: {
    type: String,
  },

  description: {
    type: String,
  },

  price: {
    type: String
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

  googleMap: {
    type: String
  },

  whatsappNumber: {
    type: String
  },

  fb: {
    type: String
  },

  contactNumber: {
    type: String
  },

  webUrl: {
    type: String
  },

  fullboardPrice: {
    type: Number,
  },
  halfboardPrice: {
    type: Number,
  },
  liquor: {
    type: Boolean,
  },
  smoke: {
    type: Boolean,
  },
  roomType: {
    type: String,
  },
  roomCapacity: {
    type: Number,
  },
  parking: {
    type: Boolean,
  },
  internet: {
    type: Boolean,
  },
  bbqFacilities: {
    type: Boolean,
  },
  chef: {
    type: Boolean,
  },
  activities: {
    type: String,
  },
  cctv: {
    type: Boolean,
  },
  promoCode: {
    type: String,
  },
  expirationDate: { type: Date, required: true },

}, { timestamps: true });

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;

  
