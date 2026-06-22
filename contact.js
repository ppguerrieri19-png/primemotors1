const express = require('express');
const router = express.Router();

const contactController = require('./contactController');

router.post('/', contactController.submitContact);

module.exports = router;