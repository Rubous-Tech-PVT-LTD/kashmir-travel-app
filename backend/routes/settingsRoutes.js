const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

// Get global settings
router.get('/', settingsController.getSettings);

// Update global settings
router.put('/', settingsController.updateSettings);

module.exports = router;
