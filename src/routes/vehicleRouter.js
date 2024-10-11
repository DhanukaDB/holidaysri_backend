const express = require('express');
const { addNewVehicle, viewVehicle, viewOneVehicle, deleteVehicle, updateVehicle, viewVehicleByEmail,updateVehicleAddExpiration } = require('../controllers/vehicleController');

const router = express.Router();

// Add new vehicle
router.post("/add", addNewVehicle);

// Delete existing one
router.delete("/delete/:id", deleteVehicle);

// Update existing vehicle
router.put("/update/:id", updateVehicle);

// View vehicle by email (this route should come before "/:id")
router.get("/vehicle", viewVehicleByEmail);

// View all vehicles
router.get("/", viewVehicle);

// View one vehicle by ID
router.get("/:id", viewOneVehicle);

// View one vehicle by ID
router.put("/vehicle-update-expiredate", updateVehicleAddExpiration);

module.exports = router;
