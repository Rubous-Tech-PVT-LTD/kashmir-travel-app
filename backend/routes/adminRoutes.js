const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const itineraryController = require('../controllers/itineraryController');
const reviewController = require('../controllers/reviewController');
const inquiryController = require('../controllers/inquiryController');
const settingsController = require('../controllers/settingsController');
const { requireAdminAuth } = require('../middleware/adminAuth');

// Auth
router.post('/login', adminController.login);
router.post('/logout', requireAdminAuth, adminController.logout);
router.get('/me', requireAdminAuth, adminController.getProfile);

// Admin itinerary management
router.get('/itineraries', requireAdminAuth, itineraryController.getAllItineraries);
router.get('/itineraries/:id', requireAdminAuth, itineraryController.getItinerary);
router.post('/itineraries', requireAdminAuth, itineraryController.createItinerary);
router.put('/itineraries/:id', requireAdminAuth, itineraryController.updateItinerary);
router.delete('/itineraries/:id', requireAdminAuth, itineraryController.deleteItinerary);
router.post('/itineraries/:id/days', requireAdminAuth, itineraryController.addDay);
router.put('/itineraries/:id/days/:dayIndex', requireAdminAuth, itineraryController.updateDay);
router.delete('/itineraries/:id/days/:dayIndex', requireAdminAuth, itineraryController.deleteDay);

// Admin review moderation
router.get('/reviews', requireAdminAuth, reviewController.getReviews);
router.delete('/reviews/:id', requireAdminAuth, reviewController.deleteReview);

// Admin inquiries
router.get('/inquiries', requireAdminAuth, inquiryController.getAllInquiries);

// Admin settings
router.get('/settings', requireAdminAuth, settingsController.getSettings);
router.put('/settings', requireAdminAuth, settingsController.updateSettings);

module.exports = router;
