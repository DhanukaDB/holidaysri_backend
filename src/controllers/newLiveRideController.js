const LiveRide = require('../models/LiveRidesNew');

// Create new Live Ride Advertisement
exports.createLiveRide = async (req, res) => {
    try {
        const formData = req.body;
        
        // Calculate expiration date based on adsTimeFrame
        const currentDate = new Date();
        let expirationDate;
        
        if (formData.adsTimeFrame === 'Monthly') {
            expirationDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        } else { // Daily
            expirationDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        }

        // Create new Live Ride with additional fields
        const liveRideData = {
            ...formData,
            expirationDate,
            isActive: true,
            isVerified: false,
            boostPoints: 0,
            ratings: [],
            feedback: []
        };

        const newLiveRide = await LiveRide.create(liveRideData);

        res.status(201).json({
            success: true,
            message: 'Live Ride advertisement created successfully',
            data: newLiveRide
        });
    } catch (error) {
        console.error('Error creating Live Ride:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create Live Ride advertisement',
            error: error.message
        });
    }
};

// Get all Live Rides
exports.getAllLiveRides = async (req, res) => {
    try {
        const liveRides = await LiveRide.find();
        res.status(200).json({
            success: true,
            data: liveRides
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch Live Rides',
            error: error.message
        });
    }
};

// Get single Live Ride by ID
exports.getLiveRideById = async (req, res) => {
    try {
        const liveRide = await LiveRide.findById(req.params.id);
        if (!liveRide) {
            return res.status(404).json({
                success: false,
                message: 'Live Ride not found'
            });
        }
        res.status(200).json({
            success: true,
            data: liveRide
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch Live Ride',
            error: error.message
        });
    }
};

// Update Live Ride (for updating promocodeUsed, isActive, etc.)
exports.updateLiveRide = async (req, res) => {
    try {
        const updatedLiveRide = await LiveRide.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedLiveRide) {
            return res.status(404).json({
                success: false,
                message: 'Live Ride not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Live Ride updated successfully',
            data: updatedLiveRide
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update Live Ride',
            error: error.message
        });
    }
};

// Delete Live Ride
exports.deleteLiveRide = async (req, res) => {
    try {
        const liveRide = await LiveRide.findByIdAndDelete(req.params.id);
        if (!liveRide) {
            return res.status(404).json({
                success: false,
                message: 'Live Ride not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Live Ride deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete Live Ride',
            error: error.message
        });
    }
};

// Add rating to Live Ride
exports.addRating = async (req, res) => {
    try {
        const { userEmail, rating } = req.body;
        
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }
        
        const liveRide = await LiveRide.findByIdAndUpdate(
            req.params.id,
            { $push: { ratings: { userEmail, rating } } },
            { new: true }
        );
        
        if (!liveRide) {
            return res.status(404).json({
                success: false,
                message: 'Live Ride not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Rating added successfully',
            data: liveRide
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add rating',
            error: error.message
        });
    }
};

