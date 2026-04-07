const mongoose = require('mongoose');
require('dotenv').config();

const Itinerary = require('./models/Itinerary');

async function checkAll() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kashmir-travel-app');
    console.log('Connected to MongoDB');

    const itineraries = await Itinerary.find({}, '_id title category duration').lean();
    console.log(`Found ${itineraries.length} itineraries:`);
    itineraries.forEach(it => {
      console.log(`ID: ${it._id}, Category: ${it.category}, Duration: ${it.duration}, Title: ${it.title}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkAll();
