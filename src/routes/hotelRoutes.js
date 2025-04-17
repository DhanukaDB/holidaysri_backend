const router = require("express").Router();

const {addNewHotel,viewHotels,viewOneHotel, updateHotel,deleteHotel,viewHotelByLocation, updateHotelAddExpiration, addFeedback, addRating, addBookingToRoom} = require ('../controllers/HotelController.js')

//add new Hotel 
router.post("/add", addNewHotel);

//view all Hotels
router.get("/", viewHotels);

//update existing Hotel
 router.put("/updateHotel/:id",updateHotel);

//delete existing one
 router.delete("/delete/:id",deleteHotel);

//view one Hotel
router.get("/get/:id", viewOneHotel);

//view one Hotel
router.get("/getlocation/:locationid", viewHotelByLocation);

// Update hotel add expiration date
router.put("/hotel-update-expiredate", updateHotelAddExpiration);

//add new comment 
router.post("/:id/feedback", addFeedback);

//add new rating 
router.post("/:id/rating", addRating);

//book a room
router.put('/:hotelId/rooms/:roomIndex/bookedDates', addBookingToRoom);

module.exports = router;