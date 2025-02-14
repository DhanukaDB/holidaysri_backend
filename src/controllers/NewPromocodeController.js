// controllers/promocodeController.js
const NewPromocode = require('../models/NewPromocode');


exports.addPromocode = async (req, res) => {
    const { userEmail, promocodeType, promocode } = req.body;

    // Validate input
    if (!userEmail || !promocodeType || !promocode) {
        return res.status(400).json({ error: 'All fields are required: userEmail, promocodeType, promocode' });
    }

    try {
        // Check if the promocode already exists
        const existingPromocode = await NewPromocode.findOne({ promocode });
        if (existingPromocode) {
            return res.status(400).json({ error: 'Promocode already exists' });
        }

        // Create a new promocode
        const newPromocode = new NewPromocode({
            userEmail,
            promocodeType,
            promocode,
        });

        // Save to the database
        await newPromocode.save();

        res.status(201).json({
            message: 'Promocode added successfully',
            promocode: newPromocode,
        });
    } catch (error) {
        console.error('Error adding promocode:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllPromocodes = async (req, res) => {
    try {
        const promocodes = await NewPromocode.find();
        res.status(200).json(promocodes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findPromocodeByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const promocodes = await NewPromocode.find({ userEmail: email });
        res.status(200).json(promocodes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEarns = async (req, res) => {
    try {
        const { promocode, earns } = req.body;
        const updated = await NewPromocode.findOneAndUpdate(
            { promocode },
            { $inc: { earns: earns } }, // Increment the existing earns value
            { new: true } // Return the updated document
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateExpiration = async (req, res) => {
    try {
        const { promocode } = req.body;
        const newExpiration = new Date();
        newExpiration.setFullYear(newExpiration.getFullYear() + 1);

        const updated = await NewPromocode.findOneAndUpdate(
            { promocode },
            { expirationDate: newExpiration },
            { new: true }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.checkPromocodeExists = async (req, res) => {
    try {
        const { promocode } = req.body;
        const exists = await NewPromocode.findOne({ promocode });

        if (exists) {
            // Check if promo code is active and not expired
            const currentDate = new Date();
            if (!exists.isActive) {
                return res.status(400).json({ exists: false, message: 'This Promocode Currently in an inactive Status!' });
            }
            if (exists.expirationDate < currentDate) {
                return res.status(400).json({ exists: false, message: 'This Promocode is expired.' });
            }

            // Include userEmail in the success response
            return res.status(200).json({ 
                exists: true, 
                message: 'Promo code is valid.', 
                userEmail: exists.userEmail,
                promocodeType: exists.promocodeType,
            });
        } else {
            return res.status(404).json({ exists: false, message: 'Invalid Promocode! Try with a valid one.' });
        }
    } catch (error) {
        console.error('Error in checkPromocodeExists:', error);
        return res.status(500).json({ exists: false, message: 'Something went wrong. Please try again later.' });
    }
};



