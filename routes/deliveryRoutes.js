const express = require('express');
const router = express.Router();
const { confirmDelivery } = require('../controllers/deliveryController');

router.post('/confirm', confirmDelivery);

module.exports = router;