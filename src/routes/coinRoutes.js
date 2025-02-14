const express = require("express");
const router = express.Router();
const { getCoinsByEmail, updateCoinsByEmail } = require("../controllers/coinController");

// Route to get coins by email
router.get("/coins/:email", getCoinsByEmail);

// Update coins by email
router.put("/updateCoins/:email", updateCoinsByEmail);

module.exports = router;
