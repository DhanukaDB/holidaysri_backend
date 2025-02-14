// routes/friendRoutes.js
const express = require('express');
const router = express.Router();
const { addFriend, checkFriend, getAllFriends } = require('../controllers/friendsController');

// Route to add a friend
router.post('/add-friend', addFriend);

// Route to check if a friend exists
router.post('/check-friend', checkFriend);

// New route for fetching all friends of a user
router.get('/getAllFriends', getAllFriends);

module.exports = router;