const express = require("express");
const router = express.Router();

// import  protected-routes middlewares
const {protectedPartner} = require("../middlewares/authMiddlewares");


//import controllers
const {
    getPartnerProfile,
    updatePartnerProfile,
    deletePartnerProfile,
    allPartnerProfiles,
    resetPassword,
    forgotPassword,
    updatePartnerExpiration,

    // getInvoice
} = require("../controllers/partnerController");

//suser profile routes

router.route("/partnerprofile").get(protectedPartner,getPartnerProfile);
router.route("/updatepartnerProfile").put(protectedPartner,updatePartnerProfile);
router.route("/deletepartnerProfile").delete(protectedPartner,deletePartnerProfile);
router.route("/allPartnerProfiles").get(allPartnerProfiles);
router.post("/forgotPassword", forgotPassword);
router.put("/reset-Password/:resetToken", resetPassword);

router.put("/partner-update-expiredate", updatePartnerExpiration);

module.exports = router; 