const mongoose = require('mongoose')

const hotelReviewSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    date: {
      type: String,
      default: 'just now',
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { _id: false }
)

const hotelSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    nights: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: '',
    },
    amenities: {
      type: [String],
      default: [],
    },
    facilities: {
      type: [String],
      default: [],
    },
    reviews: {
      type: [hotelReviewSchema],
      default: [],
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    checkInTime: {
      type: String,
      default: '2:00 PM',
    },
    checkOutTime: {
      type: String,
      default: '11:00 AM',
    },
    capacity: {
      type: String,
      default: '2-4 Guests',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Hotel', hotelSchema)