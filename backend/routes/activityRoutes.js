const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.get('/', activityController.getAllActivities);
router.get('/:slug', activityController.getActivityBySlug);

module.exports = router;
