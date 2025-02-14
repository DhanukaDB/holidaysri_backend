const express = require("express");
const router = express.Router();
const { getPoints } = require("../controllers/rewardPiontsController"); // Adjust the path

// Route to get reward points for a specific user by email
router.get("/rewards/:email", getPoints);

module.exports = router;
