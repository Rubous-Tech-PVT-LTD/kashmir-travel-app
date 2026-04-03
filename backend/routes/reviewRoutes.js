const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Get all reviews with filters
router.get('/', reviewController.getReviews);

// Create review
router.post('/', reviewController.createReview);

// Delete review
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
