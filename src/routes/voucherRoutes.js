const express = require("express");
const router = express.Router();
const { getVouchers } = require("../controllers/voucherController"); // Adjust the path

// Route to get vouchers for a specific user by email
router.get("/vouchers/:email", getVouchers);

module.exports = router;
