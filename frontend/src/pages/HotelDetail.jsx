import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Grid2x2, Phone, Star, MapPin, Wifi, UtensilsCrossed, Users, Clock, ArrowLeft, ChevronLeft, ChevronRight, UserCircle2 } from 'lucide-react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'

const NavDots = () => (
  <Grid2x2 width={22} height={22} color="#38b2a3" strokeWidth={2} />
)

const PhoneIcon = () => (
  <Phone width={18} height={18} color="#38b2a3" strokeWidth={2} />
)

const hotelDetailsData = {
  1: {
    name: 'The Khyber Himalayan Resort',
    location: 'Gulmarg',
    nights: '2N/3D Stay',
    rating: 5,
    price: '24,999',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1631049307038-da0ec493d9cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584622181563-430f63602d4b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Experience luxury in the heart of Gulmarg with world-class amenities and breathtaking mountain views.',
    amenities: ['Free WiFi', 'Swimming Pool', 'Spa & Wellness Center', 'Fine Dining Restaurant', '24/7 Room Service', 'Parking'],
    facilities: ['Conference Hall', 'Gym', 'Concierge', 'Airport Transfer', 'Multilingual Staff'],
    reviews: [
      {
        id: 1,
        name: 'Priya Sharma',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Absolutely amazing stay! The views are breathtaking and the service was impeccable. Highly recommend!'
      },
      {
        id: 2,
        name: 'Rajesh Kumar',
        rating: 5,
        date: '1 month ago',
        comment: 'Best resort in Gulmarg! The food, rooms, and hospitality were all excellent. Will definitely come back.'
      },
      {
        id: 3,
        name: 'Sarah Johnson',
        rating: 4,
        date: '1 month ago',
        comment: 'Great stay overall. Beautiful location and good facilities. The spa treatments were very relaxing.'
      }
    ],
    reviewCount: 248,
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    capacity: '2-4 Guests'
  },
  2: {
    name: 'Kareem Houseboat Retreat',
    location: 'Dal Lake, Srinagar',
    nights: '1N/2D Stay',
    rating: 4,
    price: '9,499',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496307653360-54dc08dd7d91?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Get a unique experience staying on a traditional Kashmiri houseboat with stunning dal lake views.',
    amenities: ['Free WiFi', 'House Boat Dinners', 'Water Sports', 'Local Guide Service', 'Traditional Decor', 'Private Deck'],
    facilities: ['Shikara Service', 'Fishing', 'Floating Garden Tours', 'Traditional Cuisine', 'Photography Tours'],
    reviews: [
      {
        id: 1,
        name: 'Anjali Verma',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Unforgettable experience! Sleeping on a houseboat was magical. The sunset views are incredible.'
      },
      {
        id: 2,
        name: 'Mohammed Ali',
        rating: 4,
        date: '2 months ago',
        comment: 'Very authentic Kashmiri experience. Great hospitality and delicious traditional food.'
      },
      {
        id: 3,
        name: 'Sophie Martin',
        rating: 4,
        date: '2 months ago',
        comment: 'Beautiful houseboat with charming staff. The boat tour in the morning was fantastic.'
      }
    ],
    reviewCount: 192,
    checkInTime: '3:00 PM',
    checkOutTime: '10:00 AM',
    capacity: '2-3 Guests'
  },
  3: {
    name: 'Welcomhotel Pine N Peak',
    location: 'Pahalgam',
    nights: '2N/3D Stay',
    rating: 5,
    price: '18,999',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1552928735-37cf06d77987?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A serene mountain retreat offering nature trails, adventure activities, and comfort in Pahalgam valley.',
    amenities: ['Free WiFi', 'Adventure Sports', 'Hiking Trails', 'Restaurant', 'Bonfire', 'Mountain Views'],
    facilities: ['Guide Service', 'Horse Riding', 'Fishing', 'Photography Tours', 'Nature Walks'],
    reviews: [
      {
        id: 1,
        name: 'Vikram Singh',
        rating: 5,
        date: '1 month ago',
        comment: 'Perfect for adventure seekers! Great guides and excellent facilities for trekking.'
      },
      {
        id: 2,
        name: 'Neha Patel',
        rating: 5,
        date: '6 weeks ago',
        comment: 'Amazing valley views and wonderful staff. The horse riding experience was incredible!'
      },
      {
        id: 3,
        name: 'James Wilson',
        rating: 4,
        date: '2 months ago',
        comment: 'Beautiful location with great adventure activities. Highly recommended for nature lovers.'
      }
    ],
    reviewCount: 187,
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    capacity: '2-4 Guests'
  },
  4: {
    name: 'Lidder Spring Boutique Stay',
    location: 'Aru Valley',
    nights: '3N/4D Stay',
    rating: 4,
    price: '12,499',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Intimate boutique hotel nestled in the serene Aru Valley with personalized service and local experiences.',
    amenities: ['Free WiFi', 'Restaurant', 'Hiking', 'Spa Services', 'Bonfire', 'Valley Views'],
    facilities: ['Guide Service', 'Horse Riding', 'Photography Tours', 'Traditional Meals', 'Library'],
    reviews: [
      {
        id: 1,
        name: 'Devika Sharma',
        rating: 4,
        date: '3 weeks ago',
        comment: 'Cozy and intimate retreat. The personalized service was great. Loved the traditional meals!'
      },
      {
        id: 2,
        name: 'Arjun Nair',
        rating: 4,
        date: '1 month ago',
        comment: 'Beautiful valley setting with excellent hospitality. Great base for trekking activities.'
      },
      {
        id: 3,
        name: 'Lisa Chen',
        rating: 4,
        date: '2 months ago',
        comment: 'Peaceful location away from crowds. Staff was very helpful and accommodating.'
      }
    ],
    reviewCount: 156,
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    capacity: '1-3 Guests'
  },
  5: {
    name: 'Vivanta Dal View Srinagar',
    location: 'Kralsangri',
    nights: '2N/3D Stay',
    rating: 5,
    price: '21,999',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496307653360-54dc08dd7d91?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1631049307038-da0ec493d9cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584622181563-430f63602d4b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Luxury hotel with pristine views of Dal Lake, offering world-class hospitality and dining experiences.',
    amenities: ['Free WiFi', 'Swimming Pool', 'Fine Dining', 'Spa', 'Gym', 'Lake View Rooms'],
    facilities: ['Conference Hall', 'Business Center', 'Concierge', 'Airport Transfer', 'Shikara Service'],
    reviews: [
      {
        id: 1,
        name: 'Meera Gupta',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Stunning dal lake views from the room! The restaurant serves amazing food. Luxury at its best!'
      },
      {
        id: 2,
        name: 'Akshay Reddy',
        rating: 5,
        date: '1 month ago',
        comment: 'Excellent 5-star service. The spa was relaxing and the dining experience was unforgettable.'
      },
      {
        id: 3,
        name: 'Emma Brown',
        rating: 5,
        date: '1 month ago',
        comment: 'Best hotel in Srinagar! Exceptional service, beautiful rooms, and fantastic food.'
      }
    ],
    reviewCount: 315,
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    capacity: '2-4 Guests'
  },
  6: {
    name: 'Snow Crest Gulmarg Lodge',
    location: 'Gulmarg Bowl',
    nights: '2N/3D Stay',
    rating: 4,
    price: '14,999',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1552928735-37cf06d77987?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Premier mountain lodge at Gulmarg Bowl with skiing facilities and panoramic views of the Himalayas.',
    amenities: ['Free WiFi', 'Ski Rentals', 'Restaurant', 'Bar', 'Mountain Views', 'Warm Fireplaces'],
    facilities: ['Ski School', 'Equipment Rental', 'Mountain Guide', 'Bonfire', 'Hot Tub'],
    reviews: [
      {
        id: 1,
        name: 'Ravi Malhotra',
        rating: 4,
        date: '1 month ago',
        comment: 'Amazing ski resort with excellent facilities. Great instructors and comfortable lodging.'
      },
      {
        id: 2,
        name: 'Sophie Blanc',
        rating: 4,
        date: '2 months ago',
        comment: 'Beautiful mountain views and great skiing opportunities. Cozy fireplace evenings!'
      },
      {
        id: 3,
        name: 'Amit Singh',
        rating: 4,
        date: '2 months ago',
        comment: 'Perfect winter destination. Well-maintained slopes and friendly staff.'
      }
    ],
    reviewCount: 203,
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    capacity: '2-4 Guests'
  },
  7: {
    name: 'Radisson Srinagar',
    location: 'Boulevard Road',
    nights: '2N/3D Stay',
    rating: 4,
    price: '16,999',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1631049307038-da0ec493d9cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584622181563-430f63602d4b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Contemporary hotel on Boulevard Road offering modern amenities with traditional Kashmiri hospitality.',
    amenities: ['Free WiFi', 'Swimming Pool', 'Fitness Center', 'Restaurant & Cafe', 'Business Center', 'Room Service'],
    facilities: ['Conference Halls', 'Meeting Rooms', 'Spa Services', 'Valet Parking', 'In-house Doctor'],
    reviews: [
      {
        id: 1,
        name: 'Harsh Patel',
        rating: 4,
        date: '2 weeks ago',
        comment: 'Great modern hotel with excellent facilities. Good location on Boulevard Road.'
      },
      {
        id: 2,
        name: 'Navya Sharma',
        rating: 4,
        date: '1 month ago',
        comment: 'Clean rooms, good food, and helpful staff. Great value for money.'
      },
      {
        id: 3,
        name: 'Robert Taylor',
        rating: 4,
        date: '2 months ago',
        comment: 'Professional service and modern amenities. Perfect for business travelers.'
      }
    ],
    reviewCount: 234,
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    capacity: '2-3 Guests'
  },
  8: {
    name: 'The Chinar Resort',
    location: 'Pahalgam',
    nights: '2N/3D Stay',
    rating: 4,
    price: '13,999',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Riverside resort in Pahalgam with access to nature trails, adventure activities, and traditional cuisine.',
    amenities: ['Free WiFi', 'Restaurant', 'Riverside Views', 'Adventure Sports', 'Bonfire', 'Game Area'],
    facilities: ['Guide Service', 'Horse Riding', 'Fishing', 'Photography Service', 'Traditional Meals'],
    reviews: [
      {
        id: 1,
        name: 'Kavya Desai',
        rating: 4,
        date: '3 weeks ago',
        comment: 'Lovely riverside location with great adventure activities. Perfect for family.'
      },
      {
        id: 2,
        name: 'Sanjay Kumar',
        rating: 4,
        date: '1 month ago',
        comment: 'Beautiful surroundings and excellent trekking guides. Traditional meals were delicious!'
      },
      {
        id: 3,
        name: 'Maria Garcia',
        rating: 4,
        date: '2 months ago',
        comment: 'Charming resort with nature trails all around. Great place to relax in nature.'
      }
    ],
    reviewCount: 167,
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    capacity: '2-4 Guests'
  },
  9: {
    name: 'Hotel Himalaya',
    location: 'Srinagar City',
    nights: '1N/2D Stay',
    rating: 3,
    price: '7,999',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1631049307038-da0ec493d9cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1631049307038-da0ec493d9cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Budget-friendly hotel in Srinagar City with comfortable rooms and convenient city access.',
    amenities: ['Free WiFi', 'Restaurant', 'City Views', 'Room Service', 'Parking'],
    facilities: ['Business Center', 'Laundry Service', 'Travel Desk', 'Medical Assistance'],
    reviews: [
      {
        id: 1,
        name: 'Deepak Verma',
        rating: 3,
        date: '1 month ago',
        comment: 'Good budget hotel with decent facilities. Central location is convenient.'
      },
      {
        id: 2,
        name: 'Pooja Singh',
        rating: 3,
        date: '2 months ago',
        comment: 'Affordable and clean rooms. Good location for exploring the city.'
      },
      {
        id: 3,
        name: 'David Lee',
        rating: 3,
        date: '2 months ago',
        comment: 'Value for money. Basic amenities but helpful staff.'
      }
    ],
    reviewCount: 89,
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    capacity: '1-2 Guests'
  },
  10: {
    name: 'Fern Hill Resort',
    location: 'Gulmarg',
    nights: '2N/3D Stay',
    rating: 5,
    price: '19,999',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1552928735-37cf06d77987?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Upscale resort in Gulmarg offering luxury accommodations with world-class amenities and scenic beauty.',
    amenities: ['Free WiFi', 'Swimming Pool', 'Spa Center', 'Fine Dining', 'Gym', 'Mountain Views'],
    facilities: ['Conference Hall', 'Kids Club', 'Concierge', 'Ski Rentals', 'Mountain Guide'],
    reviews: [
      {
        id: 1,
        name: 'Shalini Verma',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Luxury resort with stunning mountain views. Staff is professional and attentive.'
      },
      {
        id: 2,
        name: 'Nikhil Sharma',
        rating: 5,
        date: '1 month ago',
        comment: 'Amazing spa services and excellent fine dining. Perfect for a romantic getaway!'
      },
      {
        id: 3,
        name: 'Jennifer White',
        rating: 5,
        date: '2 months ago',
        comment: 'Wonderful experience! Everything is world-class. Would love to visit again!'
      }
    ],
    reviewCount: 267,
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    capacity: '2-4 Guests'
  },
  11: {
    name: 'Grand Heritage Houseboat',
    location: 'Dal Lake, Srinagar',
    nights: '1N/2D Stay',
    rating: 5,
    price: '11,499',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496307653360-54dc08dd7d91?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Premium houseboat experience combining luxury with authentic Kashmiri tradition and culture.',
    amenities: ['Free WiFi', 'Houseboat Dinner', 'Water Sports', 'Spa', 'Traditional Decor', 'Private Deck'],
    facilities: ['Shikara Service', 'Fishing', 'Floating Garden Tours', 'Photography Tours', 'Cultural Show'],
    reviews: [
      {
        id: 1,
        name: 'Nisha Kapoor',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Dream come true! Sleeping on a luxury houseboat is unforgettable. Highly recommended!'
      },
      {
        id: 2,
        name: 'Sameer Khan',
        rating: 5,
        date: '1 month ago',
        comment: 'Premium experience with authentic Kashmiri culture. Dinner on the boat was magical!'
      },
      {
        id: 3,
        name: 'Charlotte Moore',
        rating: 5,
        date: '2 months ago',
        comment: 'Absolutely stunning. Best houseboat experience in Kashmir. Worth every penny!'
      }
    ],
    reviewCount: 289,
    checkInTime: '3:00 PM',
    checkOutTime: '10:00 AM',
    capacity: '2-4 Guests'
  },
  12: {
    name: 'Pine View Retreat',
    location: 'Aru Valley',
    nights: '3N/4D Stay',
    rating: 4,
    price: '15,499',
    image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Charming retreat in Aru Valley surrounded by pine forests with easy access to trekking and hiking routes.',
    amenities: ['Free WiFi', 'Restaurant', 'Trekking Guide', 'Bonfire', 'Forest Views', 'Garden'],
    facilities: ['Horse Riding', 'Photography Tours', 'Nature Walks', 'Traditional Meals', 'Yoga Sessions'],
    reviews: [
      {
        id: 1,
        name: 'Aditya Joshi',
        rating: 4,
        date: '1 month ago',
        comment: 'Perfect retreat in nature. Great trekking guides and peaceful environment.'
      },
      {
        id: 2,
        name: 'Swati Sharma',
        rating: 4,
        date: '2 months ago',
        comment: 'Beautiful pine forests and excellent yoga sessions. Very rejuvenating stay!'
      },
      {
        id: 3,
        name: 'Lucas Rodriguez',
        rating: 4,
        date: '2 months ago',
        comment: 'Tranquil location away from city chaos. Great for nature lovers and trekkers.'
      }
    ],
    reviewCount: 145,
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    capacity: '2-3 Guests'
  }
}

export default function HotelDetail() {
  const { hotelId } = useParams()
  const navigate = useNavigate()
  const hotel = hotelDetailsData[hotelId]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [allReviews, setAllReviews] = useState([])
  const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' })
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    if (hotel) {
      // Load user reviews from localStorage
      const savedReviews = localStorage.getItem(`hotel-reviews-${hotelId}`)
      const userReviews = savedReviews ? JSON.parse(savedReviews) : []
      // Combine seed reviews with user reviews
      setAllReviews([...hotel.reviews, ...userReviews])
    }
  }, [hotelId, hotel])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (hotel?.images?.length || 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (hotel?.images?.length || 1)) % (hotel?.images?.length || 1))
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitSuccess(false)

    // Validation
    if (!formData.name.trim()) {
      setSubmitError('Please enter your name')
      return
    }
    if (formData.comment.trim().length < 10) {
      setSubmitError('Comment must be at least 10 characters long')
      return
    }

    // Create new review object
    const newReview = {
      id: Date.now(),
      name: formData.name.trim(),
      rating: parseInt(formData.rating),
      date: 'just now',
      comment: formData.comment.trim()
    }

    // Save to localStorage
    const savedReviews = localStorage.getItem(`hotel-reviews-${hotelId}`)
    const userReviews = savedReviews ? JSON.parse(savedReviews) : []
    const updatedReviews = [newReview, ...userReviews]
    localStorage.setItem(`hotel-reviews-${hotelId}`, JSON.stringify(updatedReviews))

    // Update state
    setAllReviews([newReview, ...allReviews])
    setFormData({ name: '', rating: 5, comment: '' })
    setSubmitSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  if (!hotel) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>Hotel not found</h2>
        <button
          onClick={() => navigate('/all-hotels')}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: '#3dba8f',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Back to All Hotels
        </button>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", margin: 0, width: '100%', padding: 0 }}>
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 32px',
          borderBottom: '1px solid #e8e8e8',
          backgroundColor: '#fff',
          width: '100%',
          boxSizing: 'border-box',
          margin: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <NavDots />
          <span
            style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#1a2b4a',
              letterSpacing: '-0.3px',
            }}
          >
            Kashmir Tour Travel
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#555', fontSize: '14px' }}>
            <PhoneIcon />
            <span>+1 323-913-4688</span>
          </div>
        </div>

        <button
          style={{
            backgroundColor: '#3dba8f',
            color: '#fff',
            border: 'none',
            padding: '11px 24px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            letterSpacing: '0.3px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#2ea87e')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#3dba8f')}
        >
          Get a Free Quote
        </button>
      </div>

      <Navbar />

      <div style={{ backgroundColor: '#f4f6f8', padding: '30px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Back Button */}
          <button
            onClick={() => navigate('/all-hotels')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#0b3d66',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '24px',
              padding: 0
            }}
          >
            <ArrowLeft width={18} height={18} />
            Back to All Hotels
          </button>

          {/* Hotel Image Gallery */}
          <div style={{ marginBottom: '30px', position: 'relative' }}>
            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
              <img
                src={hotel.images && hotel.images[currentImageIndex] ? hotel.images[currentImageIndex] : hotel.image}
                alt={`${hotel.name} - Photo ${currentImageIndex + 1}`}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              {hotel.images && hotel.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    style={{
                      position: 'absolute',
                      left: '20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: 'none',
                      color: '#fff',
                      padding: '12px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ChevronLeft width={24} height={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    style={{
                      position: 'absolute',
                      right: '20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: 'none',
                      color: '#fff',
                      padding: '12px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ChevronRight width={24} height={24} />
                  </button>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(0, 0, 0, 0.6)',
                      color: '#fff',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    {currentImageIndex + 1} / {hotel.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Image Thumbnails */}
            {hotel.images && hotel.images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
                {hotel.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${hotel.name} thumbnail ${idx + 1}`}
                    onClick={() => setCurrentImageIndex(idx)}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: currentImageIndex === idx ? '3px solid #3dba8f' : 'none',
                      opacity: currentImageIndex === idx ? 1 : 0.6
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Hotel Header */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '38px', margin: '0 0 16px', color: '#0f2946' }}>{hotel.name}</h1>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin width={20} height={20} color="#3dba8f" />
                <span style={{ fontSize: '16px', color: '#3f5f89' }}>{hotel.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star width={20} height={20} color="#f4c430" fill="#f4c430" />
                <span style={{ fontSize: '16px', color: '#0f2946', fontWeight: '600' }}>
                  {hotel.rating}.0 ({hotel.reviewCount} reviews)
                </span>
              </div>
              <div style={{ fontSize: '24px', color: '#0f2946', fontWeight: '700' }}>₹{hotel.price}</div>
            </div>

            <p style={{ fontSize: '16px', color: '#3f5f89', lineHeight: '1.6', margin: 0 }}>
              {hotel.description}
            </p>
          </div>

          {/* Quick Info */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <Clock width={24} height={24} color="#0b3d66" />
                <span style={{ fontSize: '14px', color: '#3f5f89', fontWeight: '600' }}>CHECK-IN / CHECK-OUT</span>
              </div>
              <p style={{ margin: 0, fontSize: '16px', color: '#0f2946', fontWeight: '600' }}>
                {hotel.checkInTime} / {hotel.checkOutTime}
              </p>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <Users width={24} height={24} color="#0b3d66" />
                <span style={{ fontSize: '14px', color: '#3f5f89', fontWeight: '600' }}>CAPACITY</span>
              </div>
              <p style={{ margin: 0, fontSize: '16px', color: '#0f2946', fontWeight: '600' }}>
                {hotel.capacity}
              </p>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <Clock width={24} height={24} color="#0b3d66" />
                <span style={{ fontSize: '14px', color: '#3f5f89', fontWeight: '600' }}>DURATION</span>
              </div>
              <p style={{ margin: 0, fontSize: '16px', color: '#0f2946', fontWeight: '600' }}>
                {hotel.nights}
              </p>
            </div>
          </div>

          {/* Amenities Section */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '26px', margin: '0 0 24px', color: '#0f2946' }}>Amenities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {hotel.amenities.map((amenity, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#3dba8f'
                    }}
                  />
                  <span style={{ fontSize: '15px', color: '#3f5f89' }}>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities Section */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '26px', margin: '0 0 24px', color: '#0f2946' }}>Facilities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {hotel.facilities.map((facility, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#0b3d66'
                    }}
                  />
                  <span style={{ fontSize: '15px', color: '#3f5f89' }}>{facility}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '26px', margin: '0 0 24px', color: '#0f2946' }}>Guest Reviews</h2>
            <div style={{ borderBottom: '1px solid #e5e9ef', paddingBottom: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#0f2946' }}>
                    {hotel.rating}.0
                  </div>
                  <div style={{ display: 'flex', gap: '4px', marginTop: '4px', justifyContent: 'center' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        width={16}
                        height={16}
                        color="#f4c430"
                        fill={i < hotel.rating ? '#f4c430' : '#e5e9ef'}
                      />
                    ))}
                  </div>
                  <p style={{ fontSize: '14px', color: '#3f5f89', margin: '8px 0 0' }}>
                    Based on {hotel.reviewCount} reviews
                  </p>
                </div>
              </div>
            </div>

            {allReviews && allReviews.map((review) => (
              <div
                key={review.id}
                style={{
                  paddingBottom: '24px',
                  marginBottom: '24px',
                  borderBottom: review.id === allReviews[allReviews.length - 1].id ? 'none' : '1px solid #e5e9ef'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <UserCircle2 width={40} height={40} color="#3dba8f" />
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '16px', color: '#0f2946', fontWeight: '600' }}>
                      {review.name}
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#3f5f89' }}>
                      {review.date}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      width={14}
                      height={14}
                      color="#f4c430"
                      fill={i < review.rating ? '#f4c430' : '#e5e9ef'}
                    />
                  ))}
                </div>

                <p style={{ fontSize: '14px', color: '#3f5f89', lineHeight: '1.6', margin: 0 }}>
                  {review.comment}
                </p>
              </div>
            ))}
          </div>

          {/* Add Review Form */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '26px', margin: '0 0 24px', color: '#0f2946' }}>Share Your Experience</h2>
            
            {submitSuccess && (
              <div style={{
                backgroundColor: '#d4edda',
                color: '#155724',
                padding: '12px 16px',
                borderRadius: '6px',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                ✓ Thank you! Your review has been added successfully.
              </div>
            )}

            {submitError && (
              <div style={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '12px 16px',
                borderRadius: '6px',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                ✗ {submitError}
              </div>
            )}

            <form onSubmit={handleReviewSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#0f2946',
                  marginBottom: '8px'
                }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e5e9ef',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3dba8f'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e9ef'}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#0f2946',
                  marginBottom: '8px'
                }}>
                  Rating *
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Star
                        width={32}
                        height={32}
                        color="#f4c430"
                        fill={formData.rating >= star ? '#f4c430' : '#e5e9ef'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#0f2946',
                  marginBottom: '8px'
                }}>
                  Your Review * (minimum 10 characters)
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Share your experience with this hotel..."
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e5e9ef',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3dba8f'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e9ef'}
                />
                <p style={{
                  fontSize: '12px',
                  color: '#3f5f89',
                  margin: '6px 0 0',
                  textAlign: 'right'
                }}>
                  {formData.comment.length} / 10+ characters
                </p>
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#3dba8f',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 32px',
                  borderRadius: '6px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#2ea87e')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#3dba8f')}
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Booking Section */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', textAlign: 'center', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '24px', margin: '0 0 16px', color: '#0f2946' }}>Ready to Book?</h3>
            <p style={{ fontSize: '16px', color: '#3f5f89', margin: '0 0 24px' }}>
              Reserve your stay and experience the best of Kashmir hospitality
            </p>
            <button
              onClick={() => navigate('/alltrips')}
              style={{
                backgroundColor: '#3dba8f',
                color: '#fff',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#2ea87e')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#3dba8f')}
            >
              Book Now - ₹{hotel.price}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
