const mongoose = require("mongoose");

const saveListSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  saveItems: [{
    itemId: String,
    category: String,
    itemName: String,
    url: { type: String },
  }]
}, { timestamps: true });

module.exports = mongoose.model('saveList', saveListSchema);
