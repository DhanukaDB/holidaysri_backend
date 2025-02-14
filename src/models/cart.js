const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  cartItems: [{
    itemId: String,
    quantity: { type: Number, default: 1 },
    price: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
