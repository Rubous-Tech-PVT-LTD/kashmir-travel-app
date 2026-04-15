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
        {
          route: 'Gulmarg Base to Kongdoori',
          title: 'Phase 1 Scenic Ride',
          description: 'Smooth valley ascent with meadow views, pine stretches, and easy access for families.',
          price: 'INR 1200',
        },
        {
          route: 'Kongdoori to Apharwat',
          title: 'Phase 2 Snow Peak Ride',
          description: 'Higher altitude route with wide Himalayan views and snowline landscapes in peak season.',
          price: 'INR 1800',
        },
        {
          route: 'Combined Phase 1 + 2',
          title: 'Full Gondola Experience',
          description: 'Complete mountain cable-car journey ideal for day visitors wanting the full Gulmarg experience.',
          price: 'INR 2800',
        },
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
        { title: 'Classic Dal Ride', description: 'A relaxed lake circuit with calm water views and simple boarding points.', time: '45 mins', price: 'INR 900' },
        { title: 'Market + Garden Ride', description: 'A longer ride covering floating market views and nearby garden surroundings.', time: '75 mins', price: 'INR 1400' },
        { title: 'Sunset Special Ride', description: 'An evening cruise for warm light, scenic photos, and a quieter lake route.', time: '90 mins', price: 'INR 1700' },
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
        {
          title: 'Royal Cedar Houseboat',
          duration: '1N/2D',
          location: 'Dal Lake, Srinagar',
          image: 'https://picsum.photos/id/54/1200/800',
          price: 'INR 4500',
        },
        {
          title: 'Dal View Premium',
          duration: '2N/3D',
          location: 'Nigeen Lake, Srinagar',
          image: 'https://picsum.photos/id/78/1200/800',
          price: 'INR 8200',
        },
        {
          title: 'Heritage Walnut Suite',
          duration: '2N/3D',
          location: 'Boulevard Side, Dal Lake',
          image: 'https://picsum.photos/id/164/1200/800',
          price: 'INR 9800',
        },
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
        {
          distance: '5 km Riverside Run',
          title: 'Beginner Valley Splash',
          description: 'A calm and fun route for first-time rafters with guide-led practice sections.',
          price: 'INR 1800',
        },
        {
          distance: '9 km Rapid Mix Route',
          title: 'Intermediate Whitewater',
          description: 'Balanced rapids and scenic stretches designed for returning adventure travelers.',
          price: 'INR 2600',
        },
        {
          distance: '14 km Extended Rapids',
          title: 'Advanced Rapids Challenge',
          description: 'Longer high-energy run with stronger waves and premium guide supervision.',
          price: 'INR 3900',
        },
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
        {
          time: '8-10 mins',
          title: 'Classic Tandem Flight',
          description: 'Entry-level glide with smooth takeoff and sweeping valley views for first-time flyers.',
          price: 'INR 2200',
        },
        {
          time: '12-15 mins',
          title: 'Explorer Ridge Flight',
          description: 'Longer airtime with wider mountain coverage and gentle thermal turns.',
          price: 'INR 3200',
        },
        {
          time: '18-22 mins',
          title: 'Pro Glide Experience',
          description: 'Extended high-view route with premium pilot control for maximum aerial exposure.',
          price: 'INR 4300',
        },
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
        {
          level: 'Starter',
          title: 'Beginner Slope Session',
          description: 'Guided basics with balance practice and full starter gear support.',
          price: 'INR 2500',
        },
        {
          level: 'Day Pass',
          title: 'Intermediate Mountain Run',
          description: 'Longer slope access with coaching and lift-assisted practice windows.',
          price: 'INR 4300',
        },
        {
          level: 'Full Pro',
          title: 'Advanced Alpine Ski Plan',
          description: 'Extended guided runs with premium gear and focused technical progression.',
          price: 'INR 6200',
        },
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

