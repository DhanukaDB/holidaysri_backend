// routes/promocodeRoutes.js
const express = require('express');
const router = express.Router();
const promocodeController = require('../controllers/NewPromocodeController');

router.post('/add', promocodeController.addPromocode);
router.get('/all', promocodeController.getAllPromocodes);
router.get('/:email', promocodeController.findPromocodeByEmail);
router.put('/update-earns', promocodeController.updateEarns);
router.put('/update-expiration', promocodeController.updateExpiration);
router.post('/check-exists', promocodeController.checkPromocodeExists);

module.exports = router;
