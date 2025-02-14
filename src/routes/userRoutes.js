const express = require("express");
const router = express.Router();

// import  protected-routes middlewares
const {protectedUser} = require("../middlewares/authMiddlewares");


//import controllers
const {
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    allProfiles,
    resetPassword,
    forgotPassword,
    updateContactDetails,
    findUserByEmail,
    updateUserProfileByEmail,

    // getInvoice
} = require("../controllers/userController");

//suser profile routes

router.route("/profile").get(protectedUser,getUserProfile);
router.route("/updateProfile").put(protectedUser,updateUserProfile);
router.route("/deleteProfile").delete(protectedUser,deleteUserProfile);


router.route("/allProfiles").get(allProfiles);
// router.route("/reset-Password/:resetToken").put(protectedUser,resetPassword);
// router.route("/forgotPassword").post(protectedUser, forgotPassword);

router.post("/forgotPassword", forgotPassword);
router.put("/reset-Password/:resetToken", resetPassword);

// Define the route for updating contact details
router.put('/update-contact/:email',updateContactDetails);

router.get("/findByEmail/:email", findUserByEmail);

// Update user profile by email
router.put("/updateUsers/:email", updateUserProfileByEmail);

module.exports = router; 