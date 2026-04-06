const baseHotelReviews = [
  {
    id: 1,
    name: 'Travel Guest',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Great stay with friendly staff and a comfortable room.'
  },
  {
    id: 2,
    name: 'Verified Traveler',
    rating: 4,
    date: '1 month ago',
    comment: 'Good location, clean spaces, and reliable service.'
  },
  {
    id: 3,
    name: 'Happy Guest',
    rating: 5,
    date: '1 month ago',
    comment: 'Would book again. The view and hospitality were excellent.'
  }
]

const makeHotel = (hotel, index) => ({
  ...hotel,
  images: [
    hotel.image,
    hotel.image,
    hotel.image,
    hotel.image,
  ],
  description: `${hotel.name} offers a comfortable Kashmir stay in ${hotel.location}.`,
  amenities: ['Free WiFi', 'Room Service', 'Housekeeping', 'Restaurant', 'Parking'],
  facilities: ['24/7 Front Desk', 'Concierge', 'Travel Assistance', 'Laundry Service'],
  reviews: baseHotelReviews.map((review, reviewIndex) => ({
    ...review,
    id: reviewIndex + 1,
    comment: `${review.comment} Recommended for guests looking at ${hotel.name}.`
  })),
  reviewCount: 3,
  checkInTime: '2:00 PM',
  checkOutTime: '11:00 AM',
  capacity: index % 2 === 0 ? '2-4 Guests' : '2-3 Guests',
})

module.exports = [
  makeHotel({ id: 1, name: 'The Khyber Himalayan Resort', location: 'Gulmarg', nights: '2N/3D Stay', rating: 5, price: '24,999', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80' }, 0),
  makeHotel({ id: 2, name: 'Kareem Houseboat Retreat', location: 'Dal Lake, Srinagar', nights: '1N/2D Stay', rating: 4, price: '9,499', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80' }, 1),
  makeHotel({ id: 3, name: 'Welcomhotel Pine N Peak', location: 'Pahalgam', nights: '2N/3D Stay', rating: 5, price: '18,999', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80' }, 2),
  makeHotel({ id: 4, name: 'Lidder Spring Boutique Stay', location: 'Aru Valley', nights: '3N/4D Stay', rating: 4, price: '12,499', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80' }, 3),
  makeHotel({ id: 5, name: 'Vivanta Dal View Srinagar', location: 'Kralsangri', nights: '2N/3D Stay', rating: 5, price: '21,999', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80' }, 4),
  makeHotel({ id: 6, name: 'Snow Crest Gulmarg Lodge', location: 'Gulmarg Bowl', nights: '2N/3D Stay', rating: 4, price: '14,999', image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80' }, 5),
  makeHotel({ id: 7, name: 'Radisson Srinagar', location: 'Boulevard Road', nights: '2N/3D Stay', rating: 4, price: '16,999', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80' }, 6),
  makeHotel({ id: 8, name: 'The Chinar Resort', location: 'Pahalgam', nights: '2N/3D Stay', rating: 4, price: '13,999', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80' }, 7),
  makeHotel({ id: 9, name: 'Hotel Himalaya', location: 'Srinagar City', nights: '1N/2D Stay', rating: 3, price: '7,999', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80' }, 8),
  makeHotel({ id: 10, name: 'Fern Hill Resort', location: 'Gulmarg', nights: '2N/3D Stay', rating: 5, price: '19,999', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80' }, 9),
  makeHotel({ id: 11, name: 'Grand Heritage Houseboat', location: 'Dal Lake, Srinagar', nights: '1N/2D Stay', rating: 5, price: '11,499', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80' }, 10),
  makeHotel({ id: 12, name: 'Pine View Retreat', location: 'Aru Valley', nights: '3N/4D Stay', rating: 4, price: '15,499', image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=900&q=80' }, 11),
]
