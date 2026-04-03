const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  ...(process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map((origin) => origin.trim()).filter(Boolean)
    : []),
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from Postman/cURL (no origin) and configured browser origins.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const itineraryRoutes = require('./routes/itineraryRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Routes
app.use('/api/v1/itineraries', itineraryRoutes);
app.use('/api/v1/reviews', reviewRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', status: 'OK' });
});

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kashmir-travel-app')
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    if (err.message.includes('Authentication failed')) {
      console.error('🔴 CRITICAL: MongoDB Authentication Failed!');
      console.error('Please check your MONGO_URI and credentials in .env file');
    } else {
      console.error('🔴 MongoDB connection error:', err.message);
    }
    process.exit(1);
  });

