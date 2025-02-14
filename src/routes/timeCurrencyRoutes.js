const express = require("express");
const router = express.Router();
const { getTimeCurrency } = require("../controllers/timeCurrencyController"); // Adjust the path

// Route to get time currency by email
router.get("/timeCurency/:email", getTimeCurrency);

module.exports = router;
