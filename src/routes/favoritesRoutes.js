// routes/favoriteRoutes.js
const express = require('express');
const router = express.Router();
const { addFavorite, checkFavorite, getFavorites } = require('../controllers/favoritesController');

// Route to add a favorite item
router.post('/add-favorite', addFavorite);

// Route to check if an item exists in favorites
router.post('/check-favorite', checkFavorite);

// New route for fetching all favorites of a user
router.get('/getFavorites', getFavorites);

module.exports = router;