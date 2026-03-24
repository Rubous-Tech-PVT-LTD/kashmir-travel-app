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
// Dummy GET route for /api/itineraries
app.get('/api/itineraries', (req, res) => {
  res.json({
    message: "Test dummy route for /api/itineraries",
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
    console.error('MongoDB connection error:', err);
    // Even if DB fails, let's start server for the test route (optional, but good for boilerplate)
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (DB connection failed)`);
    });
  });
