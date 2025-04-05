const PaymentActivity = require('../models/paymentActivity');

exports.createPaymentActivity = async (req, res) => {
    try {
        const {
            itemID,
            quantity,
            item,
            category,
            buyeremail,
            amount,
            discountedAmount,
            promoCode,
            promoCodeOwner,
            forEarns,
            currency,
        } = req.body;

        // Create a new payment activity
        const paymentActivity = new PaymentActivity({
            itemID,
            quantity,
            item,
            category,
            buyeremail,
            amount,
            discountedAmount,  // Optional
            promoCode,         // Optional
            promoCodeOwner,    // Optional
            forEarns,
            currency,
        });

        // Save the payment activity to the database
        const savedActivity = await paymentActivity.save();

        // Respond with the created payment activity
        res.status(201).json(savedActivity);
    } catch (error) {
        // Handle errors
        res.status(400).json({ message: error.message });
    }
};
