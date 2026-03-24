const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
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
  days: [{
    dayNumber: Number,
    title: String,
    activities: [String]
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
