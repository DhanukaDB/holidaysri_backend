const mongoose = require('mongoose');

const paymentActivitySchema = new mongoose.Schema({
    itemID: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    item: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    buyeremail: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    discountedAmount: {
        type: Number,
        
    },
    promoCode: {
        type: String,
        
    },
    promoCodeOwner: {
        type: String,
        
    },
    forEarns: {
        type: Number,
        
    },
}, { timestamps: true });

const PaymentActivity = mongoose.model('PaymentActivity', paymentActivitySchema);

module.exports = PaymentActivity;
