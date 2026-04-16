const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://www.habakhatoon.com',
  'https://habakhatoon.com',
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
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const itineraryRoutes = require('./routes/itineraryRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const carRentalRoutes = require('./routes/carRentalRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const activityRoutes = require('./routes/activityRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Routes
app.use('/api/v1/itineraries', itineraryRoutes);
app.use('/api/v1/hotels', hotelRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/car-rentals', carRentalRoutes);
app.use('/api/v1/inquiries', inquiryRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/activities', activityRoutes);
app.use('/api/v1/admin', adminRoutes);

// Health check routes
app.get('/', (req, res) => {
  res.json({ message: 'Kashmir Travel API is online', version: 'v1.0.0' });
});

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', status: 'OK' });
});

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kashmir-travel-app')
  .then(() => {
    app.listen(PORT, () => {
      // Server started
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

