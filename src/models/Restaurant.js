const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    restaurantName: {
        type: String,
        required: true
    },
    categoryType: {
        type: String,
        required: false
    },
    location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        province: { type: String, required: true },
        mapUrl: { type: String, required: true },
      },
      contactInfo: {
        email: { type: String, required: true },
        contactNumber: { type: String, required: true },
        whatsappNumber: { type: String },
        facebookUrl: { type: String },
        websiteUrl: { type: String },
      },
    openTime: {
        type: String,
        required: true
    },
    closeTime: {
        type: String,
        required: true
    },
    images: {
        type: [String], // Array of strings to store image URLs
        validate: {
            validator: function(v) {
                return v.length <= 6; // Validate that the array length is at most 6
            },
            message: props => `${props.value} exceeds the limit of 6 images per restaurant!`
        },
        required: false
    },
    menuPDF: {
        type: String, // URL to the uploaded PDF menu
        required: false
    },
    diningOptions: {
        type: [String], // e.g., ["Dine-in", "Takeout", "Delivery"]
        required: false
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Temporarily Closed'],
        default: 'Active'
    },
    websiteUrl: {
        type: String,
        required: false
    },
    facebookUrl: {
        type: String,
        required: false
    },
    promoCode: { type: String },
    expirationDate: {
      type: Date,
      default: () => {
          let date = new Date();
          date.setFullYear(date.getFullYear() + 1);
          return date;
      }
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
        forWhat: {
          type: String, 
      },
        comment: {
            type: String, 
        }
      }],
    description: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;