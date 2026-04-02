import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const trips = [
  {
    id: 1,
    title: '2 Days Tour - Quick Srinagar Getaway',
    description: 'Perfect short break covering Dal Lake, Mughal gardens, and local markets in Srinagar.',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=700&q=80',
    duration: '2 Days / 1 Night',
    price: '₹5,999',
    tag: 'Quick Escape',
    tagColor: '#0891b2',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Dal Lake Experience', activities: ['Arrive at Srinagar Airport', 'Hotel check-in and rest', 'Evening shikara ride on Dal Lake', 'Dinner at local restaurant'], accommodation: 'Hotel in Srinagar', meals: 'Lunch, Dinner', notes: 'Early arrival recommended' },
      { day: 'Day 2', title: 'Mughal Gardens & Departure', activities: ['Nishat Bagh and Shalimar Bagh tour', 'Local market shopping', 'Lunch at restaurant', 'Transfer to airport'], accommodation: 'N/A', meals: 'Breakfast, Lunch' }
    ]
  },
  {
    id: 2,
    title: '3 Days Tour - Srinagar & Gulmarg',
    description: 'Enjoy gondola rides, snow points, and scenic valley views with a balanced city + hill tour.',
    image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=700&q=80',
    duration: '3 Days / 2 Nights',
    price: '₹8,499',
    tag: 'Most Popular',
    tagColor: '#2563eb',
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Srinagar', activities: ['Arrive at Srinagar Airport', 'Hotel check-in and rest', 'Evening shikara ride on Dal Lake', 'Dinner at local restaurant'], accommodation: 'Hotel in Srinagar', meals: 'Lunch, Dinner' },
      { day: 'Day 2', title: 'Gulmarg Adventure', activities: ['Drive to Gulmarg (2.5 hours)', 'Gondola ride to 3,500ft', 'Alpine meadow walk', 'Lunch with mountain view', 'Return to Srinagar'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner', notes: 'Gondola operates weather permitting' },
      { day: 'Day 3', title: 'Mughal Gardens & Departure', activities: ['Nishat Bagh and Shalimar Bagh', 'Local market shopping', 'Lunch', 'Transfer to airport'], accommodation: 'N/A', meals: 'Breakfast, Lunch' }
    ]
  },
  {
    id: 3,
    title: '4 Days Tour - Srinagar, Gulmarg & Pahalgam',
    description: 'A complete first-timer Kashmir plan combining lakes, meadows, and alpine landscapes.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=700&q=80',
    duration: '4 Days / 3 Nights',
    price: '₹10,999',
    tag: 'Best Value',
    tagColor: '#16a34a',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Dal Lake', activities: ['Arrive at Srinagar', 'Hotel check-in', 'Evening shikara ride', 'Dinner at restaurant'], accommodation: 'Hotel in Srinagar', meals: 'Lunch, Dinner' },
      { day: 'Day 2', title: 'Gulmarg Gondola & Meadows', activities: ['Drive to Gulmarg', 'Gondola ride with panoramic views', 'Alpine meadow walk', 'Lunch at café', 'Return to Srinagar'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 3', title: 'Pahalgam Valley', activities: ['Drive to Pahalgam (3 hours)', 'Betaab Valley exploration', 'Pony trek to Aharbal Falls', 'Lunch at restaurant', 'Return to Srinagar'], accommodation: 'Hotel in Srinagar', meals: 'Breakfast, Lunch, Dinner' },
      { day: 'Day 4', title: 'Departure', activities: ['Breakfast with valley views', 'Last-minute shopping', 'Transfer to airport', 'Departure'], accommodation: 'N/A', meals: 'Breakfast' }
    ]
  },
  {
    id: 4,
    title: '5 Days Tour - Family Special Package',
    description: 'Comfort-focused itinerary with gentle travel pace, family-friendly stays, and local support.',
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=700&q=80',
    duration: '5 Days / 4 Nights',
    price: '₹13,499',
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
    title: '6 Days Tour - Mumbai to Kashmir',
    description: 'Well-planned extended tour with flight support, transfers, and curated sightseeing routes.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=700&q=80',
    duration: '6 Days / 5 Nights',
    price: '₹15,999',
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
    title: '7 Days Tour - Complete Kashmir Experience',
    description: 'Our comprehensive week-long package with premium experiences across top destinations.',
    image: 'https://images.unsplash.com/photo-1571992440736-8f6c4db3a670?auto=format&fit=crop&w=700&q=80',
    duration: '7 Days / 6 Nights',
    price: '₹18,499',
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
  },
]

const filters = ['2-4 Days', '5-7 Days', 'Family Trips']

const ArrowRight = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const ClockIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

export default function DaysWiseTrips() {
  const [activeFilter, setActiveFilter] = useState('2-4 Days')
  const navigate = useNavigate()

  const handleViewTrip = (trip) => {
    navigate(`/daywise-trip/${trip.id}`, { state: { trip } })
  }

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        backgroundColor: '#fff',
        padding: '48px 0 72px',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .dwt-card {
          transition: box-shadow 0.28s ease, transform 0.28s ease;
          cursor: pointer;
        }
        .dwt-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.12) !important;
        }
        .dwt-card:hover .dwt-img {
          transform: scale(1.04);
        }
        .dwt-img {
          transition: transform 0.5s ease;
        }
        .dwt-link {
          transition: color 0.2s;
          text-decoration: none;
        }
        .dwt-link:hover {
          color: #1d4ed8 !important;
        }
      `}</style>

      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 32px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '6px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: '800',
                color: '#0f1923',
                margin: '0 0 10px',
                lineHeight: '1.1',
              }}
            >
              Days-Wise Kashmir Trips
            </h2>
            <div
              style={{
                width: '52px',
                height: '3.5px',
                backgroundColor: '#2563eb',
                borderRadius: '2px',
              }}
            />
          </div>
          <p
            style={{
              color: '#6b7280',
              fontSize: '14px',
              maxWidth: '520px',
              lineHeight: '1.65',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: '300',
              paddingTop: '6px',
            }}
          >
            Choose your perfect trip duration from 2 to 7 days with transparent pricing and curated day-by-day plans.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '24px 0 32px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <button
            onClick={() => navigate('/all-daywise-trips')}
            className="dwt-link"
            style={{
              color: '#2563eb',
              fontSize: '14px',
              fontWeight: '500',
              fontFamily: "'DM Sans', sans-serif",
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0',
            }}
          >
            See all days-wise trips →
          </button>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            {filters.map((f, i) => (
              <span key={f} style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={() => setActiveFilter(f)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: activeFilter === f ? '600' : '400',
                    color: activeFilter === f ? '#0f1923' : '#6b7280',
                    borderBottom: activeFilter === f ? '2px solid #2563eb' : '2px solid transparent',
                    paddingBottom: '3px',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {f}
                </button>
                {i < filters.length - 1 && (
                  <span style={{ color: '#d1d5db', margin: '0 14px', fontSize: '16px' }}>|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '28px',
          }}
        >
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="dwt-card"
              style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden', height: '210px' }}>
                <img
                  className="dwt-img"
                  src={trip.image}
                  alt={trip.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    backgroundColor: trip.tagColor,
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: '700',
                    letterSpacing: '0.8px',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontFamily: "'DM Sans', sans-serif",
                    textTransform: 'uppercase',
                  }}
                >
                  {trip.tag}
                </div>
              </div>

              <div style={{ padding: '22px 22px 26px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: '#9ca3af',
                    fontSize: '12px',
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: '8px',
                  }}
                >
                  <ClockIcon />
                  {trip.duration}
                </div>

                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '19px',
                    fontWeight: '700',
                    color: '#0f1923',
                    margin: '0 0 10px',
                    lineHeight: '1.3',
                  }}
                >
                  {trip.title}
                </h3>

                <p
                  style={{
                    color: '#6b7280',
                    fontSize: '13.5px',
                    lineHeight: '1.65',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: '300',
                    margin: '0 0 18px',
                  }}
                >
                  {trip.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid #f3f4f6',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '10px',
                        color: '#9ca3af',
                        fontFamily: "'DM Sans', sans-serif",
                        display: 'block',
                        marginBottom: '2px',
                      }}
                    >
                      Starting from
                    </span>
                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#0f1923',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {trip.price}
                    </span>
                  </div>

                  <button
                    onClick={() => handleViewTrip(trip)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#2563eb',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0',
                    }}
                  >
                    View Trip <ArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
