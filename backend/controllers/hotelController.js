const Hotel = require('../models/Hotel')
const hotelsData = require('../data/hotels')

const HOTEL_SELECT_FIELDS = '-_id -__v -createdAt -updatedAt'

const ensureHotelsSeeded = async () => {
  const count = await Hotel.countDocuments()
  if (count > 0 || !Array.isArray(hotelsData) || hotelsData.length === 0) return

  await Hotel.insertMany(hotelsData, { ordered: false })
}

const normalizeHotelPayload = (payload = {}) => ({
  name: payload.name,
  location: payload.location,
  nights: payload.nights,
  rating: Number(payload.rating),
  price: String(payload.price),
  image: payload.image,
  images: Array.isArray(payload.images) ? payload.images : [],
  description: payload.description || '',
  amenities: Array.isArray(payload.amenities) ? payload.amenities : [],
  facilities: Array.isArray(payload.facilities) ? payload.facilities : [],
  checkInTime: payload.checkInTime || '2:00 PM',
  checkOutTime: payload.checkOutTime || '11:00 AM',
  capacity: payload.capacity || '2-4 Guests',
})

const validateHotelPayload = (payload = {}) => {
  const required = ['name', 'location', 'nights', 'rating', 'price', 'image']
  const missing = required.find((field) => !String(payload[field] ?? '').trim())

  if (missing) {
    return `Field "${missing}" is required`
  }

  const rating = Number(payload.rating)
  if (Number.isNaN(rating) || rating < 1 || rating > 5) {
    return 'Rating must be a number between 1 and 5'
  }

  return ''
}

exports.getAllHotels = async (req, res) => {
  try {
    await ensureHotelsSeeded()
    const hotels = await Hotel.find().select(HOTEL_SELECT_FIELDS).sort({ id: 1 }).lean()

    return res.json({
      success: true,
      data: hotels,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching hotels',
      error: error.message,
    })
  }
}

exports.getHouseboatHotels = async (req, res) => {
  try {
    await ensureHotelsSeeded()
    const hotels = await Hotel.find().select(HOTEL_SELECT_FIELDS).sort({ id: 1 }).lean()
    const houseboatHotels = hotels.filter((item) => {
      const name = (item.name || '').toLowerCase()
      const location = (item.location || '').toLowerCase()

      return name.includes('houseboat') || location.includes('dal lake')
    })

    return res.json({
      success: true,
      data: houseboatHotels,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching houseboat stays',
      error: error.message,
    })
  }
}

exports.getHotelById = async (req, res) => {
  try {
    await ensureHotelsSeeded()
    const hotel = await Hotel.findOne({ id: Number(req.params.id) }).select(HOTEL_SELECT_FIELDS).lean()

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found',
      })
    }

    return res.json({
      success: true,
      data: hotel,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching hotel',
      error: error.message,
    })
  }
}

exports.addReview = async (req, res) => {
  try {
    const hotelId = Number(req.params.id)
    const { name, rating, comment, date } = req.body || {}

    if (!String(name || '').trim() || !String(comment || '').trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name and comment are required',
      })
    }

    const numericRating = Number(rating)
    if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be a number between 1 and 5',
      })
    }

    const hotel = await Hotel.findOne({ id: hotelId })
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found',
      })
    }

    const nextReviewId = (hotel.reviews || []).reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1
    const review = {
      id: nextReviewId,
      name: String(name).trim(),
      rating: numericRating,
      date: String(date || 'just now'),
      comment: String(comment).trim(),
    }

    hotel.reviews = [review, ...(hotel.reviews || [])]
    hotel.reviewCount = hotel.reviews.length
    await hotel.save()

    return res.status(201).json({
      success: true,
      data: review,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error.message,
    })
  }
}

exports.createHotel = async (req, res) => {
  try {
    const validationError = validateHotelPayload(req.body)
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      })
    }

    const latestHotel = await Hotel.findOne().sort({ id: -1 }).select('id').lean()
    const nextHotelId = (latestHotel?.id || 0) + 1

    const hotel = await Hotel.create({
      id: nextHotelId,
      ...normalizeHotelPayload(req.body),
      reviews: [],
      reviewCount: 0,
    })

    const createdHotel = await Hotel.findOne({ id: hotel.id }).select(HOTEL_SELECT_FIELDS).lean()

    return res.status(201).json({
      success: true,
      message: 'Hotel created successfully',
      data: createdHotel,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating hotel',
      error: error.message,
    })
  }
}

exports.updateHotel = async (req, res) => {
  try {
    const hotelId = Number(req.params.id)
    const validationError = validateHotelPayload(req.body)
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      })
    }

    const updatedHotel = await Hotel.findOneAndUpdate(
      { id: hotelId },
      { $set: normalizeHotelPayload(req.body) },
      { new: true }
    ).select(HOTEL_SELECT_FIELDS).lean()

    if (!updatedHotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found',
      })
    }

    return res.json({
      success: true,
      message: 'Hotel updated successfully',
      data: updatedHotel,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating hotel',
      error: error.message,
    })
  }
}

exports.deleteHotel = async (req, res) => {
  try {
    const hotelId = Number(req.params.id)
    const deletedHotel = await Hotel.findOneAndDelete({ id: hotelId }).select(HOTEL_SELECT_FIELDS).lean()

    if (!deletedHotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found',
      })
    }

    return res.json({
      success: true,
      message: 'Hotel deleted successfully',
      data: deletedHotel,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting hotel',
      error: error.message,
    })
  }
}
