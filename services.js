const express = require('express');
const router = express.Router();
const servicesController = require('./servicesController');

router.get('/', servicesController.getServices);

module.exports = router;  