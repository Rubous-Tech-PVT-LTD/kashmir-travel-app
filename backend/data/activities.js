module.exports = [
  {
    id: 1,
    title: 'Gondola Ride',
    slug: 'gondola-ride',
    coverImage: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80',
    content: {
      gondolaHighlights: [
        { title: 'Scenic Phase 1', detail: 'Ride through pine ranges with broad meadow views.' },
        { title: 'High Altitude Phase 2', detail: 'Snow lines and sweeping Himalayan panoramas.' },
        { title: 'Guided Ticket Support', detail: 'Queue handling and smart timing from local team.' },
      ],
      rideTiers: [
        { tier: 'Standard', altitude: '8,500 ft', duration: '20 mins' },
        { tier: 'Premium', altitude: '10,500 ft', duration: '35 mins' },
        { tier: 'Adventure', altitude: '12,300 ft', duration: '50 mins' },
      ],
      gondolaMoments: [
        { label: 'Best Window', value: '8:30 AM - 10:30 AM' },
        { label: 'Ideal Season', value: 'Dec to Mar' },
        { label: 'Starting Point', value: 'Gulmarg Base' },
      ],
      activityFlow: [
        { phase: 'Pickup', step: 'Meet transport at hotel' },
        { phase: 'Ticketing', step: 'Counter and boarding support' },
        { phase: 'Ride', step: 'Phase rides with photo stops' },
      ],
      seasonalNotes: [
        'Morning slots are smoother in peak season.',
        'Snowfall days may shift ride timing slightly.',
      ],
    },
  },
  {
    id: 2,
    title: 'Shikara Ride',
    slug: 'shikara-ride',
    coverImage: 'https://images.unsplash.com/photo-1544551763-92ab472cad5d?auto=format&fit=crop&w=900&q=80',
    content: {
      rideHighlights: [
        { title: 'Sunrise Circuit', detail: 'Quiet lake lanes with soft morning light.' },
        { title: 'Floating Market Route', detail: 'See local sellers and craft boats.' },
        { title: 'Sunset Lens Spots', detail: 'Golden hour points for portraits and reels.' },
      ],
      ridePackages: [
        { route: 'Classic Dal', time: '45 mins', price: 'INR 900' },
        { route: 'Market + Garden', time: '75 mins', price: 'INR 1400' },
        { route: 'Sunset Special', time: '90 mins', price: 'INR 1700' },
      ],
      rideMoments: [
        { label: 'Boarding Point', value: 'Boulevard Ghat' },
        { label: 'Guide Language', value: 'Hindi / English' },
        { label: 'Photo Stops', value: 'Included' },
      ],
      scenicStops: [
        { title: 'Char Chinar View', detail: 'Open water framing with mountain backdrop.' },
        { title: 'Floating Gardens', detail: 'Vegetable islands and lotus belts.' },
      ],
      shikaraPlanIdeas: [
        'Book sunset ride one day in advance.',
        'Carry light layers in evening breeze.',
      ],
    },
  },
  {
    id: 3,
    title: 'Houseboat Stay',
    slug: 'houseboat-stay',
    coverImage: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80',
    content: {
      houseboatStays: [
        { name: 'Royal Cedar Houseboat', nights: '1N/2D', price: 'INR 4500' },
        { name: 'Dal View Premium', nights: '2N/3D', price: 'INR 8200' },
        { name: 'Heritage Walnut Suite', nights: '2N/3D', price: 'INR 9800' },
      ],
      houseboatHighlights: [
        { title: 'Lakefront Private Deck', detail: 'Morning tea with mountain reflections.' },
        { title: 'Heritage Interiors', detail: 'Hand-carved walnut wood finishing.' },
        { title: 'Chef-Prepared Meals', detail: 'Regional menu with custom options.' },
      ],
    },
  },
  {
    id: 4,
    title: 'River Rafting',
    slug: 'river-rafting',
    coverImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
    content: {
      raftingHighlights: [
        { title: 'Rapid Variety', detail: 'Calm intro sections plus fun whitewater runs.' },
        { title: 'Safety First', detail: 'Certified river guides and full briefings.' },
        { title: 'Action Photos', detail: 'Photo/video captures at key rapids.' },
      ],
      raftingPackages: [
        { level: 'Beginner', grade: 'I-II', river: 'Lidder', price: 'INR 1800' },
        { level: 'Intermediate', grade: 'II-III', river: 'Sindh', price: 'INR 2600' },
        { level: 'Advanced', grade: 'III-IV', river: 'Upper Lidder', price: 'INR 3900' },
      ],
      safetyGear: [
        { item: 'Helmet', included: 'Yes' },
        { item: 'Life Jacket', included: 'Yes' },
        { item: 'Dry Bag', included: 'Yes' },
      ],
      raftingMoments: [
        { label: 'Session', value: '2 to 3 hours' },
        { label: 'Best Season', value: 'Apr to Jul' },
        { label: 'Min Age', value: '12+' },
      ],
      tripPhases: [
        { phase: 'Briefing', activity: 'Training and fit checks', time: '20 mins' },
        { phase: 'Run', activity: 'Main rapid section', time: '90 mins' },
      ],
    },
  },
  {
    id: 5,
    title: 'Paragliding',
    slug: 'paragliding',
    coverImage: 'https://images.unsplash.com/photo-1465311440653-ba9b1d9b0f5b?auto=format&fit=crop&w=1200&q=80',
    content: {
      paraglideHighlights: [
        { title: 'Tandem Flights', detail: 'Fly with experienced certified pilots.' },
        { title: 'Panoramic Views', detail: 'Valley and ridge lines from above.' },
        { title: 'GoPro Add-on', detail: 'Optional in-flight footage.' },
      ],
      flightPackages: [
        { type: 'Classic', duration: '8-10 mins', height: '1200 ft', price: 'INR 2200' },
        { type: 'Explorer', duration: '12-15 mins', height: '1800 ft', price: 'INR 3200' },
        { type: 'Pro Glide', duration: '18-22 mins', height: '2500 ft', price: 'INR 4300' },
      ],
      flightMoments: [
        { label: 'Takeoff Zone', value: 'Aru Ridge' },
        { label: 'Landing Zone', value: 'Pahalgam Flats' },
      ],
      flightGear: [
        { item: 'Harness', condition: 'Inspected daily' },
        { item: 'Reserve Chute', condition: 'Included' },
      ],
      flightPhases: [
        { phase: 'Prep', activity: 'Wind check and harness setup', time: '15 mins' },
        { phase: 'Flight', activity: 'Main glide with turns', time: '10-20 mins' },
      ],
    },
  },
  {
    id: 6,
    title: 'Skiing',
    slug: 'skiing',
    coverImage: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1200&q=80',
    content: {
      skiHighlights: [
        { title: 'Beginner Slopes', detail: 'Coached starts with balance drills.' },
        { title: 'Powder Trails', detail: 'Mid-level runs in fresh snow windows.' },
        { title: 'Lift Access', detail: 'Optimized run planning with guide.' },
      ],
      skiPackages: [
        { level: 'Starter', duration: '2 hours', includes: 'Coach + gear', price: 'INR 2500' },
        { level: 'Day Pass', duration: '4 hours', includes: 'Coach + gear + lift', price: 'INR 4300' },
        { level: 'Full Pro', duration: '6 hours', includes: 'Guide + premium gear + lift', price: 'INR 6200' },
      ],
      seasonalMoments: [
        { label: 'Peak Snow', value: 'Jan-Feb' },
        { label: 'Skill Level', value: 'Beginner to Advanced' },
      ],
      skiIncluded: ['Helmet', 'Ski set', 'Boots', 'Trainer support'],
      skiPhases: [
        { phase: 'Warmup', activity: 'Mobility and balance prep', time: '20 mins' },
        { phase: 'Training Runs', activity: 'Slope practice', time: '90 mins' },
      ],
    },
  },
]

