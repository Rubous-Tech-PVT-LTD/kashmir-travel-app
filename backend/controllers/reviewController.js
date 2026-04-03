const Review = require('../models/Review');

// Get all reviews for an itinerary
exports.getReviews = async (req, res) => {
  try {
    const { itineraryId, reviewType } = req.query;
    
    const filter = { itineraryId };
    if (reviewType) {
      filter.reviewType = reviewType;
    }

    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
};

// Create review
exports.createReview = async (req, res) => {
  try {
    const { itineraryId, reviewType, name, rating, comment } = req.body;

    if (!itineraryId || !name || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const review = new Review({
      itineraryId,
      reviewType: reviewType || 'trip',
      name,
      rating,
      comment
    });

    await review.save();
    
    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating review',
      error: error.message
    });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      message: 'Review deleted successfully',
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting review',
      error: error.message
    });
  }
};
