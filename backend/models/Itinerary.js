const mongoose = require('mongoose');

const itineraryDaySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  activities: [String],
  accommodation: {
    type: String,
    default: 'N/A'
  },
  meals: {
    type: String,
    default: 'N/A'
  },
  notes: String
}, { _id: false });

const itinerarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  category: {
    type: [String],
    default: ['daywise']
  },
  gallery: {
    type: [String],
    default: []
  },
  tag: {
    type: String,
    default: ''
  },
  tagColor: {
    type: String,
    default: '#2563eb'
  },
  isComingSoon: {
    type: Boolean,
    default: false
  },
  itinerary: [itineraryDaySchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
