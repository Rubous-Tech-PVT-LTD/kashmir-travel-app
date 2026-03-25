const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Dummy GET route for /api/v1/itineraries
app.get('/api/v1/itineraries', (req, res) => {
  res.json({
    message: "Test dummy route for /api/v1/itineraries",
    data: []
  });
});

// Database connection placeholder
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kashmir-travel-app')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    if (err.message.includes('Authentication failed')) {
      console.error('CRITICAL: MongoDB Authentication Failed! Please check your username/password and IP whitelist in Atlas.');
    } else {
      console.error('MongoDB connection error:', err);
    }
    // Start server anyway for dummy routes
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (Database integration currently unavailable)`);
    });
  });
