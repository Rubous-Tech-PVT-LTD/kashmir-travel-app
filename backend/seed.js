const mongoose = require('mongoose');
require('dotenv').config();

const Itinerary = require('./models/Itinerary');
const Review = require('./models/Review');
const popularTrips = require('./data/popularTrips');
const daywiseTrips = require('./data/daywiseTrips');
const { tripReviewsByTripIndex, daywiseReviewsByTripIndex } = require('./data/reviews');

const seedItineraries = [
  ...popularTrips.map((trip) => ({
    title: trip.title,
    description: trip.description,
    duration: trip.duration,
    price: trip.price,
    coverImage: trip.image,
    category: 'popular',
    gallery: trip.gallery,
    tag: trip.tag,
    tagColor: trip.tagColor,
    itinerary: trip.itinerary.map((day) => ({
      day: day.day,
      title: day.title,
      activities: day.activities,
      accommodation: day.accommodation,
      meals: day.meals,
      notes: day.notes || ''
    }))
  })),
  ...daywiseTrips.map((trip) => ({
    title: trip.title,
    description: trip.description,
    duration: trip.duration,
    price: trip.price,
    coverImage: trip.image,
    category: 'daywise',
    gallery: trip.gallery,
    tag: trip.tag,
    tagColor: trip.tagColor,
    itinerary: trip.itinerary.map((day) => ({
      day: day.day,
      title: day.title,
      activities: day.activities,
      accommodation: day.accommodation,
      meals: day.meals,
      notes: day.notes || ''
    }))
  })),
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected for seeding...');
    
    // Clear existing
    await Itinerary.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing itineraries.');
    
    // Insert new
    const createdItineraries = await Itinerary.insertMany(seedItineraries);

    const popularCount = popularTrips.length;

    const reviewDocs = createdItineraries.flatMap((itinerary, index) => {
      if (index < popularCount) {
        const tripReviews = (tripReviewsByTripIndex[index] || []).map((review) => ({
          itineraryId: itinerary._id,
          reviewType: 'trip',
          ...review
        }));

        return tripReviews;
      }

      const daywiseIndex = index - popularCount;
      const daywiseReviews = (daywiseReviewsByTripIndex[daywiseIndex] || []).map((review) => ({
        itineraryId: itinerary._id,
        reviewType: 'daywise',
        ...review
      }));

      return daywiseReviews;
    });

    if (reviewDocs.length > 0) {
      await Review.insertMany(reviewDocs);
    }

    console.log(`Successfully seeded ${createdItineraries.length} itineraries and ${reviewDocs.length} reviews!`);
    
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
