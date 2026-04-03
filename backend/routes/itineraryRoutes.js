const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

// Get all itineraries
router.get('/', itineraryController.getAllItineraries);

// Get single itinerary
router.get('/:id', itineraryController.getItinerary);

// Create itinerary
router.post('/', itineraryController.createItinerary);

// Update itinerary
router.put('/:id', itineraryController.updateItinerary);

// Delete itinerary
router.delete('/:id', itineraryController.deleteItinerary);

// Add day to itinerary
router.post('/:id/days', itineraryController.addDay);

// Update day in itinerary
router.put('/:id/days/:dayIndex', itineraryController.updateDay);

// Delete day from itinerary
router.delete('/:id/days/:dayIndex', itineraryController.deleteDay);

module.exports = router;
