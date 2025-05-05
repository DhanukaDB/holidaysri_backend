const express = require('express');
const router = express.Router();
const liveRideController = require('../controllers/newLiveRideController');

// Create new Live Ride Advertisement
router.post('/', liveRideController.createLiveRide);

// Get all Live Rides
router.get('/', liveRideController.getAllLiveRides);

// Get single Live Ride by ID
router.get('/:id', liveRideController.getLiveRideById);

// Update Live Ride
router.put('/:id', liveRideController.updateLiveRide);

// Delete Live Ride
router.delete('/:id', liveRideController.deleteLiveRide);

// Add rating to Live Ride
router.post('/:id/ratings', liveRideController.addRating);


module.exports = router;