const express = require("express");
const router = express.Router();
const { getGiftsByEmail } = require("../controllers/giftController");

// Route to get gifts by email
router.get("/gifts/:email", getGiftsByEmail);

module.exports = router;
