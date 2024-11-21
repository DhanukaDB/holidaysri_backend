const express = require('express');
const router = express.Router();
const { createPromoCodeRequest, getAllPromoCodeRequests, updatePromoCodeRequestStatus } = require('../controllers/createPromoCodeRequestConroller'); // Import the controller

// POST endpoint for form submission
router.post('/reqfreeprocode', createPromoCodeRequest);

router.get('/getAllReqProCode', getAllPromoCodeRequests);

router.put('/promo-code-requests/:id', updatePromoCodeRequestStatus);

module.exports = router;
