const mongoose = require('mongoose');
require('dotenv').config();

const Itinerary = require('./models/Itinerary');

async function checkIds() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kashmir-travel-app');
    console.log('Connected to MongoDB');

    const itineraries = await Itinerary.find({}, '_id title').limit(5);
    console.log('Sample Itineraries:');
    itineraries.forEach(it => {
      console.log(`ID: ${it._id}, Title: ${it.title}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkIds();
