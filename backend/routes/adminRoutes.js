const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const itineraryController = require('../controllers/itineraryController');
const hotelController = require('../controllers/hotelController');
const carRentalController = require('../controllers/carRentalController');
const reviewController = require('../controllers/reviewController');
const inquiryController = require('../controllers/inquiryController');
const settingsController = require('../controllers/settingsController');
const activityController = require('../controllers/activityController');
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

// Admin hotel management
router.get('/hotels', requireAdminAuth, hotelController.getAllHotels);
router.post('/hotels', requireAdminAuth, hotelController.createHotel);
router.put('/hotels/:id', requireAdminAuth, hotelController.updateHotel);
router.delete('/hotels/:id', requireAdminAuth, hotelController.deleteHotel);

// Admin car rental management
router.get('/car-rentals', requireAdminAuth, carRentalController.getAllCarRentals);
router.post('/car-rentals', requireAdminAuth, carRentalController.createCarRental);
router.put('/car-rentals/:id', requireAdminAuth, carRentalController.updateCarRental);
router.delete('/car-rentals/:id', requireAdminAuth, carRentalController.deleteCarRental);

// Admin review moderation
router.get('/reviews', requireAdminAuth, reviewController.getReviews);
router.delete('/reviews/:id', requireAdminAuth, reviewController.deleteReview);

// Admin inquiries
router.get('/inquiries', requireAdminAuth, inquiryController.getAllInquiries);

// Admin settings
router.get('/settings', requireAdminAuth, settingsController.getSettings);
router.put('/settings', requireAdminAuth, settingsController.updateSettings);

// Admin activities management
router.get('/activities', requireAdminAuth, activityController.getAllActivities);
// Slug-based updates (controller still supports numeric ids for backward compatibility)
router.put('/activities/:slug', requireAdminAuth, activityController.updateActivity);

module.exports = router;
