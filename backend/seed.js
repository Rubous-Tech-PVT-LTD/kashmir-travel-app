const mongoose = require('mongoose');
require('dotenv').config();

const Itinerary = require('./models/Itinerary');

const seedData = [
  {
    title: 'Srinagar to Gulmarg Weekend Getaway',
    duration: '2 Days / 1 Night',
    price: 15499,
    coverImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop',
    days: [
      {
        dayNumber: 1,
        title: 'Arrival in Srinagar & Dal Lake',
        activities: ['Shikara Ride', 'Visit Mughal Gardens', 'Houseboat stay']
      },
      {
        dayNumber: 2,
        title: 'Gulmarg Gondola & Departure',
        activities: ['Gondola Phase 1', 'Snow activities', 'Return to Srinagar Airport']
      }
    ]
  },
  {
    title: 'Pahalgam Valley Expedition',
    duration: '4 Days / 3 Nights',
    price: 22999,
    coverImage: 'https://images.unsplash.com/photo-1502175353174-a7a70e73b362?q=80&w=800&auto=format&fit=crop',
    days: [
      {
        dayNumber: 1,
        title: 'Srinagar to Pahalgam',
        activities: ['Scenic drive', 'Apple orchard visit', 'River rafting']
      },
      {
        dayNumber: 2,
        title: 'Aru & Betaab Valley',
        activities: ['Betaab Valley tour', 'Aru Valley trekking', 'Photography']
      },
      {
        dayNumber: 3,
        title: 'Baisaran (Mini Switzerland)',
        activities: ['Pony ride to Baisaran', 'Local market exploration']
      },
      {
        dayNumber: 4,
        title: 'Return to Srinagar',
        activities: ['Transfer to airport']
      }
    ]
  },
  {
    title: 'Sonamarg Alpine Trekking',
    duration: '3 Days / 2 Nights',
    price: 18500,
    coverImage: 'https://images.unsplash.com/photo-1626024483726-ad0749e756c6?q=80&w=800&auto=format&fit=crop',
    days: [
      {
        dayNumber: 1,
        title: 'Drive to Sonamarg',
        activities: ['Sindh River views', 'Thajiwas Glacier trek prep']
      },
      {
        dayNumber: 2,
        title: 'Thajiwas Glacier',
        activities: ['Glacier trek', 'Sledging', 'Camping']
      },
      {
        dayNumber: 3,
        title: 'Return Journey',
        activities: ['Morning photography', 'Return to Srinagar']
      }
    ]
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected for seeding...');
    
    // Clear existing
    await Itinerary.deleteMany({});
    console.log('Cleared existing itineraries.');
    
    // Insert new
    await Itinerary.insertMany(seedData);
    console.log('Successfully seeded 3 itineraries!');
    
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
