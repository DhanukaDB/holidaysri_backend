const router = require("express").Router();

const {addNewLocation,viewLocations,viewOneLocation, updateLocation,deleteLocation, addFeedback, addRating, getLocationIdByName } = require ('../controllers/LocationController.js')

//add new Location 
router.post("/add", addNewLocation);

//view all Locations
router.get("/", viewLocations);

//update existing Location
 router.put("/updateLocation/:id",updateLocation);

//delete existing one
 router.delete("/delete/:id",deleteLocation);

//view one Location
router.get("/get/:id", viewOneLocation);

//add new comment 
router.post("/:id/feedback", addFeedback);

//add new rating 
router.post("/:id/rating", addRating);

//view one Location by location name
router.get("/locationGetbyName", getLocationIdByName);



module.exports = router;