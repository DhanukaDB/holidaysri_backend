const express = require("express");
const router = express.Router();
const { getDiamondsByEmail } = require("../controllers/diamondContrler");

// Route to get diamonds by email
router.get("/diamonds/:email", getDiamondsByEmail);

module.exports = router;
