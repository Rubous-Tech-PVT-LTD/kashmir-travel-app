const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const adminController = require('../controllers/adminController');
const itineraryController = require('../controllers/itineraryController');
const hotelController = require('../controllers/hotelController');
const carRentalController = require('../controllers/carRentalController');
const reviewController = require('../controllers/reviewController');
const inquiryController = require('../controllers/inquiryController');
const settingsController = require('../controllers/settingsController');
const activityController = require('../controllers/activityController');
const blogController = require('../controllers/blogController');
const { requireAdminAuth } = require('../middleware/adminAuth');

// Strict rate limit for login to prevent brute-force attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
});

// General rate limit for authenticated admin endpoints
const adminLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please slow down.' },
});

// Auth
router.post('/login', loginLimiter, adminController.login);
router.post('/logout', requireAdminAuth, adminLimiter, adminController.logout);
router.get('/me', requireAdminAuth, adminLimiter, adminController.getProfile);

// Admin itinerary management
router.get('/itineraries', requireAdminAuth, adminLimiter, itineraryController.getAllItineraries);
router.get('/itineraries/:id', requireAdminAuth, adminLimiter, itineraryController.getItinerary);
router.post('/itineraries', requireAdminAuth, adminLimiter, itineraryController.createItinerary);
router.put('/itineraries/:id', requireAdminAuth, adminLimiter, itineraryController.updateItinerary);
router.delete('/itineraries/:id', requireAdminAuth, adminLimiter, itineraryController.deleteItinerary);
router.post('/itineraries/:id/days', requireAdminAuth, adminLimiter, itineraryController.addDay);
router.put('/itineraries/:id/days/:dayIndex', requireAdminAuth, adminLimiter, itineraryController.updateDay);
router.delete('/itineraries/:id/days/:dayIndex', requireAdminAuth, adminLimiter, itineraryController.deleteDay);
router.get('/itineraries/:id/gallery', requireAdminAuth, adminLimiter, itineraryController.getGallery);
router.post('/itineraries/:id/gallery', requireAdminAuth, adminLimiter, itineraryController.addGalleryImages);
router.put('/itineraries/:id/gallery/:imageIndex', requireAdminAuth, adminLimiter, itineraryController.updateGalleryImage);
router.delete('/itineraries/:id/gallery/:imageIndex', requireAdminAuth, adminLimiter, itineraryController.deleteGalleryImage);

// Admin hotel management
router.get('/hotels', requireAdminAuth, adminLimiter, hotelController.getAllHotels);
router.post('/hotels', requireAdminAuth, adminLimiter, hotelController.createHotel);
router.put('/hotels/:id', requireAdminAuth, adminLimiter, hotelController.updateHotel);
router.delete('/hotels/:id', requireAdminAuth, adminLimiter, hotelController.deleteHotel);

// Admin car rental management
router.get('/car-rentals', requireAdminAuth, adminLimiter, carRentalController.getAllCarRentals);
router.post('/car-rentals', requireAdminAuth, adminLimiter, carRentalController.createCarRental);
router.put('/car-rentals/:id', requireAdminAuth, adminLimiter, carRentalController.updateCarRental);
router.delete('/car-rentals/:id', requireAdminAuth, adminLimiter, carRentalController.deleteCarRental);

// Admin review moderation
router.get('/reviews', requireAdminAuth, adminLimiter, reviewController.getReviews);
router.delete('/reviews/:id', requireAdminAuth, adminLimiter, reviewController.deleteReview);

// Admin inquiries
router.get('/inquiries', requireAdminAuth, adminLimiter, inquiryController.getAllInquiries);

// Admin settings
router.get('/settings', requireAdminAuth, adminLimiter, settingsController.getSettings);
router.put('/settings', requireAdminAuth, adminLimiter, settingsController.updateSettings);

// Admin activities management
router.get('/activities', requireAdminAuth, adminLimiter, activityController.getAllActivities);
router.post('/activities', requireAdminAuth, adminLimiter, activityController.createActivity);
router.put('/activities/:slug', requireAdminAuth, adminLimiter, activityController.updateActivity);
router.delete('/activities/:slug', requireAdminAuth, adminLimiter, activityController.deleteActivity);

// Admin blog management
router.get('/blogs', requireAdminAuth, adminLimiter, blogController.getAllBlogs);
router.post('/blogs', requireAdminAuth, adminLimiter, blogController.createBlog);
router.put('/blogs/:id', requireAdminAuth, adminLimiter, blogController.updateBlog);
router.delete('/blogs/:id', requireAdminAuth, adminLimiter, blogController.deleteBlog);

module.exports = router;
