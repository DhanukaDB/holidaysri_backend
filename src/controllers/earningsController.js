const Earning = require('../models/earnings');

// Create a new earning entry
exports.createEarning = async (req, res) => {
    try {
        const newEarning = new Earning(req.body);
        const savedEarning = await newEarning.save();
        res.status(201).json(savedEarning);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all earnings
exports.getAllEarnings = async (req, res) => {
    try {
        const earnings = await Earning.find();
        res.status(200).json(earnings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single earning by ID
exports.getEarningById = async (req, res) => {
    try {
        const earning = await Earning.findById(req.params.id);
        if (!earning) {
            return res.status(404).json({ message: 'Earning not found' });
        }
        res.status(200).json(earning);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an earning by ID
exports.updateEarning = async (req, res) => {
    try {
        const updatedEarning = await Earning.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedEarning) {
            return res.status(404).json({ message: 'Earning not found' });
        }
        res.status(200).json(updatedEarning);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an earning by ID
exports.deleteEarning = async (req, res) => {
    try {
        const deletedEarning = await Earning.findByIdAndDelete(req.params.id);
        if (!deletedEarning) {
            return res.status(404).json({ message: 'Earning not found' });
        }
        res.status(200).json({ message: 'Earning deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
