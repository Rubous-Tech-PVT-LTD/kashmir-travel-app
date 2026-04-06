const Hotel = require('../models/Hotel')

exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({}).sort({ id: 1 })

    res.json({
      success: true,
      data: hotels,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hotels',
      error: error.message,
    })
  }
}

exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ id: Number(req.params.id) })

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found',
      })
    }

    res.json({
      success: true,
      data: hotel,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hotel',
      error: error.message,
    })
  }
}

exports.addHotelReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body

    if (!name || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'All review fields are required',
      })
    }

    const hotel = await Hotel.findOne({ id: Number(req.params.id) })

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found',
      })
    }

    const review = {
      id: Date.now(),
      name: name.trim(),
      rating: Number(rating),
      date: 'just now',
      comment: comment.trim(),
    }

    hotel.reviews.unshift(review)
    hotel.reviewCount = hotel.reviews.length
    await hotel.save()

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: review,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error.message,
    })
  }
}
