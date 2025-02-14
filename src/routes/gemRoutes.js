const express = require("express");
const router = express.Router();
const { getAllGems } = require("../controllers/gemContraller"); // Adjust the path

// Route to get all gems for a specific user
router.get("/gems/:email", getAllGems);

module.exports = router;
