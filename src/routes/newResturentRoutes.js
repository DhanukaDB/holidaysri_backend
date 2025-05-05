const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/newResturentController');

// Create new restaurant advertisement
router.post('/', restaurantController.createRestaurant);

// Get all restaurants
router.get('/', restaurantController.getAllRestaurants);

// Get single restaurant by ID
router.get('/:id', restaurantController.getRestaurantById);

// Update restaurant
router.put('/:id', restaurantController.updateRestaurant);

// Delete restaurant
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;