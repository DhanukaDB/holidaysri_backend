const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema(
    {
      vehicleNumber: String,
      Vehiclecategory: String,
      contactNumber: String,
      price: Number,
      nic: String,
      email: String,
      gender: String, 
      description: String,
      location:String,
      promoCode: String,
      driverStatus: String,
      capacity: Number,
      ac: Boolean,
      expirationDate: { type: Date, required: true },
      images: {
        type: [String], // Array of strings to store image URLs
        validate: {
            validator: function (v) {
                return v.length <= 6; // Validate that the array length is at most 6
            },
            message: props => `${props.value} exceeds the limit of 6 images per location!`
        }
    },
    },{ timestamps: true });
  
  const VehicleDetails = mongoose.model('Vehicle', VehicleSchema);
  
  module.exports = VehicleDetails;