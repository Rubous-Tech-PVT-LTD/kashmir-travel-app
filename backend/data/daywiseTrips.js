const daywiseTrips = [
  {
    id: 1,
    category: 'daywise',
    title: '2 Days Tour - Quick Srinagar Getaway',
    description: 'Perfect short break covering Dal Lake, Mughal gardens, and local markets in Srinagar.',
    image: 'https://picsum.photos/id/10/1200/800',
    gallery: [
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800'
    ],
    duration: '2 Days / 1 Night',
    price: 5999,
    tag: 'Quick Escape',
    tagColor: '#0891b2',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Dal Lake Experience', activities: ['Arrive at Srinagar Airport', 'Hotel check-in and rest', 'Evening shikara ride on Dal Lake', 'Dinner at local restaurant'], accommodation: 'Hotel in Srinagar', meals: 'Lunch, Dinner', notes: 'Early arrival recommended' },
      { day: 'Day 2', title: 'Mughal Gardens & Departure', activities: ['Nishat Bagh and Shalimar Bagh tour', 'Local market shopping', 'Lunch at restaurant', 'Transfer to airport'], accommodation: 'N/A', meals: 'Breakfast, Lunch' }
    ]
  },
  {
    id: 2,
    category: 'daywise',
    title: '3 Days Tour - Srinagar & Gulmarg',
    description: 'Enjoy gondola rides, snow points, and scenic valley views with a balanced city + hill tour.',
    image: 'https://picsum.photos/id/10/1200/800',
    gallery: [
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800'
    ],
    duration: '3 Days / 2 Nights',
    price: 8499,
    tag: 'Most Popular',
    tagColor: '#2563eb',
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Srinagar', activities: ['Arrive at Srinagar Airport', 'Hotel check-in and rest', 'Evening shikara ride on Dal Lake', 'Dinner at local restaurant'], accommodation: 'Hotel in Srinagar', meals: 'Lunch, Dinner' },
      { day: 'Day 2', title: 'Gulmarg Adventure', activities: ['Drive to Gulmarg', 'Gondola ride to 3,500ft', 'Alpine meadow walk', 'Lunch with mountain view', 'Return to Srinagar'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner', notes: 'Gondola operates weather permitting' },
      { day: 'Day 3', title: 'Mughal Gardens & Departure', activities: ['Nishat Bagh and Shalimar Bagh', 'Local market shopping', 'Lunch', 'Transfer to airport'], accommodation: 'N/A', meals: 'Breakfast, Lunch' }
    ]
  },
  {
    id: 3,
    category: 'daywise',
    title: '4 Days Tour - Srinagar, Gulmarg & Pahalgam',
    description: 'A complete first-timer Kashmir plan combining lakes, meadows, and alpine landscapes.',
    image: 'https://picsum.photos/id/10/1200/800',
    gallery: [
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800'
    ],
    duration: '4 Days / 3 Nights',
    price: 10999,
    tag: 'Best Value',
    tagColor: '#16a34a',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Dal Lake', activities: ['Arrive at Srinagar', 'Hotel check-in', 'Evening shikara ride', 'Dinner at restaurant'], accommodation: 'Hotel in Srinagar', meals: 'Lunch, Dinner' },
      { day: 'Day 2', title: 'Gulmarg Gondola & Meadows', activities: ['Drive to Gulmarg', 'Gondola ride with panoramic views', 'Alpine meadow walk', 'Lunch at café', 'Return to Srinagar'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 3', title: 'Pahalgam Valley', activities: ['Drive to Pahalgam', 'Betaab Valley exploration', 'Pony trek to Aharbal Falls', 'Lunch at restaurant', 'Return to Srinagar'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 4', title: 'Departure', activities: ['Breakfast with valley views', 'Last-minute shopping', 'Transfer to airport', 'Departure'], accommodation: 'N/A', meals: 'Breakfast' }
    ]
  },
  {
    id: 4,
    category: 'daywise',
    title: '5 Days Tour - Family Special Package',
    description: 'Comfort-focused itinerary with gentle travel pace, family-friendly stays, and local support.',
    image: 'https://picsum.photos/id/10/1200/800',
    gallery: [
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800'
    ],
    duration: '5 Days / 4 Nights',
    price: 13499,
    tag: 'Family Pick',
    tagColor: '#db2777',
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Srinagar', activities: ['Arrive at Srinagar', 'Family hotel check-in', 'Rest and acclimatize', 'Evening shikara ride', 'Welcome dinner'], accommodation: 'Family-friendly Hotel', meals: 'Lunch, Dinner' },
      { day: 'Day 2', title: 'Mughal Gardens & Markets', activities: ['Nishat Bagh tour', 'Shalimar Bagh exploration', 'Traditional Kashmiri lunch', 'Market shopping', 'Ice cream at café'], accommodation: 'Family-friendly Hotel', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 3', title: 'Gulmarg Family Adventure', activities: ['Drive to Gulmarg', 'Family gondola ride', 'Meadow picnic', 'Strawberry farm visit', 'Return to Srinagar'], accommodation: 'Family-friendly Hotel', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 4', title: 'Pahalgam & Valley', activities: ['Drive to Pahalgam', 'Betaab Valley walk', 'Pony ride experience', 'Lunch with valley view', 'Return to Srinagar'], accommodation: 'Family-friendly Hotel', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 5', title: 'Departure', activities: ['Family breakfast', 'Souvenir shopping', 'Transfer to airport'], accommodation: 'N/A', meals: 'Breakfast' }
    ]
  },
  {
    id: 5,
    category: 'daywise',
    title: '6 Days Tour - Mumbai to Kashmir',
    description: 'Well-planned extended tour with flight support, transfers, and curated sightseeing routes.',
    image: 'https://picsum.photos/id/10/1200/800',
    gallery: [
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800'
    ],
    duration: '6 Days / 5 Nights',
    price: 15999,
    tag: 'Extended Tour',
    tagColor: '#ea580c',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Srinagar', activities: ['Arrive from Mumbai', 'Hotel check-in and rest', 'Evening shikara ride', 'Traditional Kashmiri dinner'], accommodation: 'Premium Hotel', meals: 'Lunch, Dinner' },
      { day: 'Day 2', title: 'Mughal Gardens & Markets', activities: ['Nishat Bagh tour', 'Shalimar Bagh exploration', 'Chashme Shahi spring', 'Local market shopping', 'Dinner with cultural music'], accommodation: 'Premium Hotel', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 3', title: 'Gulmarg Mountain Resort', activities: ['Drive to Gulmarg', 'Gondola ride to peak', 'Alpine meadow walk', 'Strawberry fields visit', 'Lunch at mountain restaurant', 'Return to Srinagar'], accommodation: 'Premium Hotel', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 4', title: 'Pahalgam Valley', activities: ['Drive to Pahalgam', 'Betaab Valley exploration', 'Aharbal Falls trek', 'Aru Valley visit', 'Return to Srinagar'], accommodation: 'Premium Hotel', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 5', title: 'Leisure & Activities', activities: ['Kashmiri cooking class', 'Carpet weaving workshop tour', 'Spa treatment', 'Sunset boat cruise', 'Farewell dinner'], accommodation: 'Premium Hotel', meals: 'All meals' },
      { day: 'Day 6', title: 'Departure', activities: ['Final breakfast', 'Last shopping', 'Transfer to airport', 'Flight to Mumbai'], accommodation: 'N/A', meals: 'Breakfast' }
    ]
  },
  {
    id: 6,
    category: 'daywise',
    title: '7 Days Tour - Complete Kashmir Experience',
    description: 'Our comprehensive week-long package with premium experiences across top destinations.',
    image: 'https://picsum.photos/id/10/1200/800',
    gallery: [
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/10/1200/800'
    ],
    duration: '7 Days / 6 Nights',
    price: 18499,
    tag: 'Complete Plan',
    tagColor: '#7c3aed',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Srinagar', activities: ['Arrive at Srinagar', 'Check-in at luxury hotel', 'Rest and refresh', 'Evening shikara ride', 'Welcome dinner'], accommodation: 'Luxury Hotel', meals: 'Lunch, Dinner' },
      { day: 'Day 2', title: 'Mughal Gardens & Heritage', activities: ['Nishat Bagh full tour', 'Shalimar Bagh gardens', 'Chashme Shahi spring', 'Handicraft market', 'Traditional lunch'], accommodation: 'Luxury Hotel', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 3', title: 'Gulmarg Adventure', activities: ['Drive to Gulmarg', 'Gondola ride to peak', 'Alpine meadow exploration', 'Photography session', 'Lunch at resort'], accommodation: 'Luxury Hotel', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 4', title: 'Pahalgam Valley', activities: ['Drive to Pahalgam', 'Betaab Valley tour', 'Aharbal Falls trek', 'Aru Valley visit', 'Village experience'], accommodation: 'Luxury Hotel', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 5', title: 'Sonamarg Glacier', activities: ['Drive to Sonamarg', 'Vishansar Lake visit', 'Glacier walk', 'Mountain tea experience', 'Return to Srinagar'], accommodation: 'Luxury Hotel', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 6', title: 'Culture & Activities', activities: ['Cooking class - Wazwan', 'Carpet weaving workshop', 'Spa and wellness', 'Sunset cruise with music', 'Gala dinner'], accommodation: 'Luxury Hotel', meals: 'All meals' },
      { day: 'Day 7', title: 'Departure', activities: ['Final breakfast with view', 'Souvenir shopping', 'Transfer to airport', 'Departure'], accommodation: 'N/A', meals: 'Breakfast' }
    ]
  }
]

module.exports = daywiseTrips
