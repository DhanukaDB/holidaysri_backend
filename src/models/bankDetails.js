const mongoose = require('mongoose');

const bankDetailsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    validContact: {
        type: String,
        default: "",
    },
    accountUserName: {
        type: String,
        default: "",
    },
    bank: {
        type: String,
        default: "",
    },
    branch: {
        type: String,
        default: "",
    },
    accountNumber: {
        type: String,
        default: "",
    },
    billingAddress: {
        type: String,
        default: "",
    },

}, { timestamps: true });

const BankDetails = mongoose.model('BankDetails', bankDetailsSchema);

module.exports = BankDetails;
