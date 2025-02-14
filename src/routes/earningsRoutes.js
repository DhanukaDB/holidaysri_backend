const express = require('express');
const router = express.Router();
const earningsController = require('../controllers/earningsController');

router.post('/addEarn', earningsController.createEarning);
router.get('/allEarns', earningsController.getAllEarnings);
router.get('/getEarn/:id', earningsController.getEarningById);
router.put('/updateEarn/:id', earningsController.updateEarning);
router.delete('/deleteEarn/:id', earningsController.deleteEarning);

module.exports = router;
