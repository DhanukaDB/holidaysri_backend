const express = require('express');
const router = express.Router();
const foodAdvertisementController = require('../controllers/newFoodControler');

// Create a new food advertisement
router.post('/', foodAdvertisementController.createFoodAdvertisement);

// Get all food advertisements
router.get('/', foodAdvertisementController.getAllFoodAdvertisements);

// Get single food advertisement by ID
router.get('/:id', foodAdvertisementController.getFoodAdvertisementById);

// Update food advertisement
router.put('/:id', foodAdvertisementController.updateFoodAdvertisement);

// Delete food advertisement (soft delete)
router.delete('/:id', foodAdvertisementController.deleteFoodAdvertisement);

// Add rating to food advertisement
router.post('/:id/ratings', foodAdvertisementController.addRating);

// Add feedback to food advertisement
router.post('/:id/feedback', foodAdvertisementController.addFeedback);

module.exports = router;