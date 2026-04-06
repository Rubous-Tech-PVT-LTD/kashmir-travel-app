const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  // Migration: heroImage (String) is replaced by heroImages (Array of Strings)
  heroImages: {
    type: [String],
    required: true,
    default: ['https://images.unsplash.com/photo-1595815771614-ade9d652a65d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80']
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Settings', settingsSchema);
