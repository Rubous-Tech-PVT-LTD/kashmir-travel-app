const popularTrips = [
  {
    id: 1,
    title: 'Classic Family Trip',
    description: 'Explore our curated collection of best-loved Kashmir experiences perfect for families - Dal Lake shikara rides, Mughal gardens, and cozy houseboat nights.',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80'
    ],
    duration: '6 Days / 5 Nights',
    price: 18999,
    tag: 'Bestseller',
    tagColor: '#2563eb',
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Srinagar', activities: ['Arrive at Srinagar Airport', 'Hotel check-in', 'Evening shikara ride on Dal Lake', 'Dinner at local restaurant'], accommodation: 'Hotel in Srinagar', meals: 'Lunch, Dinner' },
      { day: 'Day 2', title: 'Mughal Gardens & Markets', activities: ['Nishat Bagh', 'Shalimar Bagh', 'Chashme Shahi', 'Local market shopping'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 3', title: 'Gulmarg Adventure', activities: ['Drive to Gulmarg', 'Gondola ride', 'Meadow walk', 'Return to Srinagar'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 4', title: 'Pahalgam Valley', activities: ['Drive to Pahalgam', 'Betaab Valley', 'Aru Valley', 'Return to Srinagar'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 5', title: 'Sonamarg Excursion', activities: ['Drive to Sonamarg', 'Glacier viewpoints', 'Mountain tea break', 'Return to Srinagar'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 6', title: 'Departure', activities: ['Breakfast', 'Last-minute shopping', 'Transfer to airport'], accommodation: 'N/A', meals: 'Breakfast' }
    ]
  },
  {
    id: 2,
    title: 'Kashmir Summer Trip',
    description: 'Perfect summer getaway to enjoy blooming valleys, Pahalgam meadows, and the cool breeze of Gulmarg - a paradise at its most vibrant.',
    image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508264165352-258a6f82f9f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1455156218388-5e61b526818b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?auto=format&fit=crop&w=800&q=80'
    ],
    duration: '5 Days / 4 Nights',
    price: 14999,
    tag: 'Summer Special',
    tagColor: '#16a34a',
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Srinagar', activities: ['Hotel check-in', 'Dal Lake shikara ride', 'Local dinner'], accommodation: 'Hotel in Srinagar', meals: 'Lunch, Dinner' },
      { day: 'Day 2', title: 'Pahalgam Meadows', activities: ['Drive to Pahalgam', 'Valley sightseeing', 'Leisure time'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 3', title: 'Gulmarg Views', activities: ['Drive to Gulmarg', 'Gondola ride', 'Return to Srinagar'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 4', title: 'Mughal Gardens', activities: ['Nishat Bagh', 'Shalimar Bagh', 'Local market'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 5', title: 'Departure', activities: ['Breakfast', 'Transfer to airport'], accommodation: 'N/A', meals: 'Breakfast' }
    ]
  },
  {
    id: 3,
    title: 'Winter Kashmir Trip',
    description: 'Experience snow-covered landscapes, skiing in Gulmarg, and warm houseboat evenings by the fire in a breathtaking winter wonderland.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548777121-7c8c41b84cae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1455156218388-5e61b526818b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80'
    ],
    duration: '7 Days / 6 Nights',
    price: 22499,
    tag: 'Winter Escape',
    tagColor: '#7c3aed',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Srinagar', activities: ['Check-in', 'Rest', 'Evening lake ride'], accommodation: 'Hotel in Srinagar', meals: 'Lunch, Dinner' },
      { day: 'Day 2', title: 'Mughal Gardens', activities: ['Garden tours', 'Old city walk'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 3', title: 'Gulmarg Ski Day', activities: ['Drive to Gulmarg', 'Skiing', 'Return to Srinagar'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 4', title: 'Pahalgam Snow Views', activities: ['Drive to Pahalgam', 'Valley exploration'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 5', title: 'Sonamarg', activities: ['Glacier view points', 'Tea break', 'Return'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 6', title: 'Leisure Day', activities: ['Shopping', 'Cultural dinner'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 7', title: 'Departure', activities: ['Breakfast', 'Transfer to airport'], accommodation: 'N/A', meals: 'Breakfast' }
    ]
  },
  {
    id: 4,
    title: 'Kashmir Honeymoon Package',
    description: 'A romantic escape through tulip gardens, private shikara rides at sunset, and luxury houseboat stays crafted just for two.',
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517821365201-7f72c8e688a8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80'
    ],
    duration: '8 Days / 7 Nights',
    price: 27999,
    tag: 'Most Romantic',
    tagColor: '#db2777',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Welcome Dinner', activities: ['Airport pickup', 'Hotel check-in', 'Romantic dinner'], accommodation: 'Luxury Hotel', meals: 'Lunch, Dinner' },
      { day: 'Day 2', title: 'Srinagar Sightseeing', activities: ['Mughal gardens', 'Lake visit'], accommodation: 'Luxury Hotel', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 3', title: 'Gulmarg Day', activities: ['Drive to Gulmarg', 'Cable car ride'], accommodation: 'Luxury Hotel', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 4', title: 'Pahalgam Day', activities: ['Valley sightseeing', 'Photography time'], accommodation: 'Luxury Hotel', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 5', title: 'Houseboat Stay', activities: ['Shikara ride', 'Houseboat check-in'], accommodation: 'Houseboat', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 6', title: 'Leisure & Shopping', activities: ['Free time', 'Shopping'], accommodation: 'Luxury Hotel', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 7', title: 'Optional Tour', activities: ['Optional excursion', 'Relaxation'], accommodation: 'Luxury Hotel', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 8', title: 'Departure', activities: ['Breakfast', 'Airport transfer'], accommodation: 'N/A', meals: 'Breakfast' }
    ]
  },
  {
    id: 5,
    title: 'Adventure Kashmir Trek',
    description: 'Tackle the Great Lakes Trek, Tarsar Marsar trail, and Sonamarg glaciers - for those who want Kashmir beyond the postcard.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    duration: '9 Days / 8 Nights',
    price: 24999,
    tag: 'Adventure',
    tagColor: '#ea580c',
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Srinagar', activities: ['Check-in', 'Gear check'], accommodation: 'Hotel in Srinagar', meals: 'Lunch, Dinner' },
      { day: 'Day 2', title: 'Preparation Day', activities: ['Briefing', 'Permits', 'Packing'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 3', title: 'Base Camp Transfer', activities: ['Drive to base camp', 'Camp setup'], accommodation: 'Camping', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 4', title: 'Trek Day 1', activities: ['Start trek', 'Trail walk'], accommodation: 'Camping', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 5', title: 'Trek Day 2', activities: ['Lake views', 'Photography'], accommodation: 'Camping', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 6', title: 'Trek Day 3', activities: ['Summit approach', 'Return path'], accommodation: 'Camping', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 7', title: 'Return to Srinagar', activities: ['Drive back', 'Rest'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 8', title: 'Leisure Day', activities: ['Shopping', 'Relax'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 9', title: 'Departure', activities: ['Breakfast', 'Airport transfer'], accommodation: 'N/A', meals: 'Breakfast' }
    ]
  },
  {
    id: 6,
    title: 'Weekend Kashmir Getaway',
    description: 'A quick 4-day escape to Dal Lake, Nishat Bagh, and Pahalgam - ideal for busy professionals who want a taste of paradise.',
    image: 'https://images.unsplash.com/photo-1571992440736-8f6c4db3a670?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571992440736-8f6c4db3a670?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80'
    ],
    duration: '4 Days / 3 Nights',
    price: 10999,
    tag: 'Quick Escape',
    tagColor: '#0891b2',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Dal Lake', activities: ['Airport pickup', 'Hotel check-in', 'Shikara ride'], accommodation: 'Hotel in Srinagar', meals: 'Lunch, Dinner' },
      { day: 'Day 2', title: 'Srinagar Sightseeing', activities: ['Mughal gardens', 'Local markets'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 3', title: 'Pahalgam Day', activities: ['Drive to Pahalgam', 'Valley sightseeing'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 4', title: 'Departure', activities: ['Breakfast', 'Airport transfer'], accommodation: 'N/A', meals: 'Breakfast' }
    ]
  }
]

module.exports = popularTrips
