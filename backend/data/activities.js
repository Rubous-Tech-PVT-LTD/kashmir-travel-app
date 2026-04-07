const activities = [
  {
    slug: 'shikara-ride',
    name: 'Shikara Ride',
    rideHighlights: [
      {
        title: 'Golden Hour Cruising',
        detail: 'Private Dal Lake and Nigeen Lake rides timed for sunset light, calm water, and better photography.'
      },
      {
        title: 'Local Host Service',
        detail: 'Experienced rowers, cultural storytellers, and route guidance for a smooth lake experience.'
      },
      {
        title: 'Add-On Experiences',
        detail: 'Kahwa tasting, floating market stops, flower garlands, and houseboat pickup on request.'
      }
    ],
    ridePackages: [
      {
        name: 'Sunset Ride',
        duration: '45-60 mins',
        price: 'INR 1,499',
        note: 'Best for first-time visitors and photo sessions'
      },
      {
        name: 'Private Couple Cruise',
        duration: '75 mins',
        price: 'INR 2,499',
        note: 'Flowers, kahwa, and a quiet premium route'
      },
      {
        name: 'Family Lake Experience',
        duration: '90 mins',
        price: 'INR 3,499',
        note: 'Spacious ride with flexible stops for all ages'
      }
    ],
    rideMoments: [
      {
        label: 'Best Time',
        value: '6:00 AM to 7:30 PM'
      },
      {
        label: 'Pickup',
        value: 'Houseboat, hotel, or lakefront jetty'
      },
      {
        label: 'Add-ons',
        value: 'Kahwa, flowers, musicians, and photography'
      }
    ],
    scenicStops: [
      'Dal Lake boulevard',
      'Nigeen Lake quieter routes',
      'Floating vegetable market area',
      'Royal houseboat lanes'
    ],
    shikaraPlanIdeas: [
      'Morning lake cruise and city sightseeing',
      'Sunset shikara followed by dinner',
      'Private couple package with houseboat stay'
    ]
  },
  {
    slug: 'gondola-ride',
    name: 'Gondola Ride',
    gondolaHighlights: [
      {
        title: 'High-Altitude Views',
        detail: 'Soar above pine forests and snowfields with open vistas across Gulmarg valley.'
      },
      {
        title: 'Two-Phase Adventure',
        detail: 'Enjoy the Gulmarg to Kongdoori and Kongdoori to Apharwat sections for a complete mountain ride.'
      },
      {
        title: 'Seasonal Magic',
        detail: 'Fresh meadows in summer, bright skies in autumn, and deep snow scenes in winter.'
      }
    ],
    rideTiers: [
      {
        name: 'Phase 1 Ticket',
        duration: 'Gulmarg to Kongdoori',
        price: 'INR 899',
        note: 'Best for scenic views, beginners, and families'
      },
      {
        name: 'Phase 2 Ticket',
        duration: 'Kongdoori to Apharwat',
        price: 'INR 1,499',
        note: 'For higher altitude, snow cover, and sharper panoramas'
      },
      {
        name: 'Full Mountain Pass',
        duration: 'Complete return ride',
        price: 'INR 2,199',
        note: 'Ideal for a full experience with flexible stops'
      }
    ],
    gondolaMoments: [
      {
        label: 'Best Season',
        value: 'December to March for snow, April to October for greenery'
      },
      {
        label: 'Starting Point',
        value: 'Gulmarg base station'
      },
      {
        label: 'Travel Style',
        value: 'Family, couple, adventure, or photo-focused'
      }
    ],
    activityFlow: [
      {
        step: '01',
        title: 'Reach Gulmarg',
        desc: 'Travel to the base station, collect tickets, and prepare for a smooth boarding sequence.'
      },
      {
        step: '02',
        title: 'Ride Upward',
        desc: 'Take in valley views, tree lines, and changing terrain as the cabin climbs toward the ridge.'
      },
      {
        step: '03',
        title: 'Explore the Peaks',
        desc: 'Pause for photos, snow play, or a short walk before returning to Gulmarg.'
      }
    ],
    seasonalNotes: [
      'Snow gear is recommended in peak winter months',
      'Early booking helps on busy weekends and holiday periods',
      'Cloud cover can change the view, so keep some schedule flexibility'
    ]
  },
  {
    slug: 'paragliding',
    name: 'Paragliding',
    paraglideHighlights: [
      {
        title: 'Soar over Alpine Peaks',
        detail: "Float above Kashmir's most dramatic mountain landscapes with professional pilots and thermal expertise."
      },
      {
        title: 'Safe, Instructed Flights',
        detail: 'Tandem flights with certified instructors mean you experience the thrill while they handle the technique.'
      },
      {
        title: 'Aerial Photo Moments',
        detail: 'Capture your flight from angles no ground camera can match-with optional video packages included.'
      }
    ],
    flightPackages: [
      {
        name: 'Scenic Flight',
        duration: '15-20 min',
        price: 'INR 2,999',
        note: 'Perfect introduction to paragliding with beautiful low-altitude valley and peak views.'
      },
      {
        name: 'Mountain Flight',
        duration: '25-30 min',
        price: 'INR 4,999',
        note: 'Extended flight covering higher peaks, thermals, and wider mountain panoramas.'
      },
      {
        name: 'Premium Adventure',
        duration: '40-50 min',
        price: 'INR 7,499',
        note: 'Full experience with acrobatics, maximum altitude, and cinematic aerial footage.'
      }
    ],
    flightMoments: [
      {
        label: 'Best Season',
        value: 'April to October'
      },
      {
        label: 'Flight Type',
        value: 'Tandem with certified pilots'
      },
      {
        label: 'Weather Dependent',
        value: 'Clear skies required'
      }
    ],
    flightGear: [
      'Tandem paraglider with backup parachute',
      'Full body harness and helmet',
      'Safety briefing and certification',
      'Thermal awareness training',
      'Emergency landing gear checks',
      'Professional video/photo package'
    ],
    flightPhases: [
      {
        step: '01',
        title: 'Launch Preparation',
        desc: 'Suit up at the launch point, receive final briefing, check wind direction and thermal conditions.'
      },
      {
        step: '02',
        title: 'Lift and Soar',
        desc: 'Gentle tow or running start, then catch thermals to climb higher and float longer over the landscape.'
      },
      {
        step: '03',
        title: 'Smooth Landing',
        desc: 'Pilot guides you down with perfect landing technique, then walk back to base for debrief and footage.'
      }
    ],
    prepNotes: [
      'Wear layers-temperature drops significantly at altitude',
      'Secure all loose items; bring only essentials in flight harness',
      'Follow pilot instructions exactly and embrace the weightless freedom'
    ]
  },
  {
    slug: 'skiing',
    name: 'Skiing',
    skiHighlights: [
      {
        title: 'Pristine Alpine Slopes',
        detail: "Powder-filled runs from beginner greens to expert black diamonds, all in Kashmir's Himalayan setting."
      },
      {
        title: 'Certified Instruction',
        detail: "Professional ski guides adapt to your level-whether you're learning or seeking backcountry challenges."
      },
      {
        title: 'Winter Magic Landscape',
        detail: 'Snow-draped peaks, peaceful valleys, and world-class views that make every run feel like a postcard.'
      }
    ],
    skiPackages: [
      {
        name: 'Beginner Slopes',
        terrain: 'Green & Blue Runs',
        price: 'INR 2,199',
        note: 'Perfect for first-time skiers with equipment rental, lessons, and all-day lift passes.'
      },
      {
        name: 'Intermediate Carving',
        terrain: 'Blue & Red Runs',
        price: 'INR 3,899',
        note: 'Progress your technique across scenic varied terrain with moderate challenge and stunning views.'
      },
      {
        name: 'Expert Backcountry',
        terrain: 'Black Diamonds & Off-Piste',
        price: 'INR 6,499',
        note: 'Advanced terrain, backcountry access, avalanche training, and certified mountain guides included.'
      }
    ],
    seasonalMoments: [
      {
        label: 'Best Season',
        value: 'December to March'
      },
      {
        label: 'Snow Type',
        value: 'Powder and packed runs'
      },
      {
        label: 'Altitude Range',
        value: '2000-4000m'
      }
    ],
    skiIncluded: [
      'Full ski equipment rental (skis, boots, poles)',
      'Professional certified instructor',
      'Lift pass and slope access',
      'Safety briefing and avalanche beacon',
      'Warm lodge and hot beverages',
      'Photo stops at scenic viewpoints'
    ],
    skiPhases: [
      {
        step: '01',
        title: 'Fit and Learn',
        desc: 'Equipment fitting, stance and balance instruction, safety briefing, and slopes introduction.'
      },
      {
        step: '02',
        title: 'Carve and Conquer',
        desc: 'Progress through easier slopes, build speed and control, try steeper runs as confidence grows.'
      },
      {
        step: '03',
        title: 'Warm Up & Celebrate',
        desc: 'Hot beverages and warm meals at the lodge, share stories, and plan your next run.'
      }
    ],
    prepNotes: [
      'Layer up with thermal underwear and waterproof outer shell-high altitude gets very cold',
      'Bring sunscreen, goggles, and lip balm-snow reflection intensifies sun exposure',
      'Leave valuables in lodge; take only essentials (ID, small wallet) in your jacket pocket'
    ]
  },
  {
    slug: 'river-rafting',
    name: 'River Rafting',
    raftingHighlights: [
      {
        title: 'Adrenaline on the River',
        detail: 'Fast-moving water, guide-led rapids, and the right balance of thrill and control.'
      },
      {
        title: 'Beginner to Advanced',
        detail: 'Routes can be matched to first-timers, families, or stronger adventure seekers.'
      },
      {
        title: 'Scenic Valley Setting',
        detail: 'Mountain banks, forest stretches, and dramatic river curves make the ride visual as well as exciting.'
      }
    ],
    raftingPackages: [
      {
        name: 'Beginner Run',
        duration: '4-6 km',
        price: 'INR 1,299',
        note: 'Shorter stretch with manageable rapids and guide support'
      },
      {
        name: 'Adventure Run',
        duration: '8-10 km',
        price: 'INR 2,199',
        note: 'The most balanced mix of thrill, scenery, and pacing'
      },
      {
        name: 'Full Expedition',
        duration: '12+ km',
        price: 'INR 3,499',
        note: 'Longer route for experienced groups and adventure travelers'
      }
    ],
    safetyGear: [
      'Certified life jacket and helmet',
      'Professional river guide',
      'Pre-ride safety briefing',
      'Emergency support and route checks',
      'Photo stop and rest points where available',
      'Transport can be arranged from Srinagar on request'
    ],
    raftingMoments: [
      {
        label: 'Best Season',
        value: 'April to September'
      },
      {
        label: 'River Style',
        value: 'Fast, scenic, and guide-led'
      },
      {
        label: 'Ideal For',
        value: 'Friends, couples, and adventure groups'
      }
    ],
    tripPhases: [
      {
        step: '01',
        title: 'Arrive and Gear Up',
        desc: 'Meet your guide, fit safety equipment, and learn the basic commands before launch.'
      },
      {
        step: '02',
        title: 'Hit the Rapids',
        desc: 'Paddle through fast sections with clear instructions and short bursts of teamwork.'
      },
      {
        step: '03',
        title: 'Cool Down on Shore',
        desc: 'Wrap up with riverbank views, photos, and time to relax before the return transfer.'
      }
    ],
    prepNotes: [
      'Wear quick-dry clothing and secure footwear',
      'Keep phones and valuables in a dry pouch',
      'Follow guide instructions closely during rapids'
    ]
  }
];

module.exports = activities;
