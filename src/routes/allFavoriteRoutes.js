const express = require("express");
const { addFavorite } = require("../controllers/allFavoriteController");
const { getFavoritesByEmail } = require("../controllers/allFavoriteController");
const router = express.Router();

router.post("/add-favorite", addFavorite);

// Route to get all favorites by user email
router.get("/user/:userEmail", getFavoritesByEmail);

module.exports = router;
