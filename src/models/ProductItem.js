const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productItemSchema = new Schema ({

    productId : {
        type: String
    },

    category: {
        type:String
    },

    title: {
        type: String
    },

    description: {
        type: String
    },

    price: {
        type: String
    },

    location: {
        type: String
    },

    date: {
        type: Date
    },

    image: {
        type: String
    },

    contactNumber: {
        type: String
    },

})
const ProductItem = mongoose.model("ProductItem", productItemSchema);
module.exports = ProductItem;