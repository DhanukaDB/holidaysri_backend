const express = require("express");
const router = express.Router();

// import  protected-routes middlewares
const {protectedGuide} = require("../middlewares/authMiddlewares");


//import controllers
const {
    getGuideProfile,
    updateGuideProfile,
    deleteGuideProfile,
    allGuideProfiles,
    resetPassword,
    forgotPassword,
    updateGuiderExpiration,

    // getInvoice
} = require("../controllers/guideController");

//suser profile routes

router.route("/guideprofile").get(protectedGuide,getGuideProfile);
router.route("/updateguideProfile").put(protectedGuide,updateGuideProfile);
router.route("/deleteguideProfile").delete(protectedGuide,deleteGuideProfile);
router.route("/allGuideProfiles").get(allGuideProfiles);
router.post("/forgotPassword", forgotPassword);
router.put("/reset-Password/:resetToken", resetPassword);

router.put("/guider-update-expiredate", updateGuiderExpiration);

module.exports = router; 