const express = require('express');
const router = express.Router();
const paymentActivityController = require('../controllers/paymentActivityController');

router.post('/payment-activities', paymentActivityController.createPaymentActivity);

module.exports = router;
