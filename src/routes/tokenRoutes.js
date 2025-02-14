const express = require("express");
const router = express.Router();
const { getAllTokens } = require("../controllers/tokenController"); // Adjust the path

// Route to get all tokens for a specific user
router.get("/tokens/:email", getAllTokens);

module.exports = router;
