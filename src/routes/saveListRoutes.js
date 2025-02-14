const express = require("express");
const { addItemToSaveList } = require("../controllers/saveListController");
const { getSaveListByEmail } = require("../controllers/saveListController");
const router = express.Router();

router.post("/add-item", addItemToSaveList);

// Route to get save list by user email
router.get("/user/:userEmail", getSaveListByEmail);

module.exports = router;
