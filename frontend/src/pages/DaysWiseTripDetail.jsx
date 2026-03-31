import { useParams, useLocation, useNavigate } from 'react-router-dom'
import TripItinerary from '../components/TripItinerary'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NavDots = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="0" y="0" width="8" height="8" rx="1.5" fill="#38b2a3" />
    <rect x="14" y="0" width="8" height="8" rx="1.5" fill="#38b2a3" />
    <rect x="0" y="14" width="8" height="8" rx="1.5" fill="#38b2a3" />
    <rect x="14" y="14" width="8" height="8" rx="1.5" fill="#38b2a3" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="18" height="18" fill="none" stroke="#38b2a3" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
  </svg>
)

export default function DaysWiseTripDetail() {
  const { tripId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const trip = location.state?.trip

  if (!trip) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '20px' }}>
              Trip details not found
            </p>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
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
        {/* Logo */}
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

        {/* Center Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#555', fontSize: '14px' }}>
            <PhoneIcon />
            <span>+1 323-913-4688</span>
          </div>
        </div>

        {/* CTA Button */}
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
      
      <div style={{ flex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
          {/* Top Header */}
          <div style={{ marginBottom: '40px' }}>
            <button
              onClick={() => navigate('/all-daywise-trips')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#2563eb',
                fontSize: '14px',
                fontWeight: '600',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '20px',
                padding: '0',
              }}
            >
              ← All Kashmir Tours
            </button>
            <h1
              style={{
                fontSize: '42px',
                fontWeight: '700',
                color: '#0f1923',
                margin: '0 0 12px',
                lineHeight: '1.2',
              }}
            >
              Kashmir Tour Travel
            </h1>
            <p
              style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: '0',
                maxWidth: '600px',
              }}
            >
              Explore enchanting valleys, pristine lakes, and snow-capped mountains with our curated Kashmir travel packages
            </p>
          </div>

          {/* Hero Section */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
            <img
              src={trip.image}
              alt={trip.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Overlay with content */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                padding: '40px 40px',
                color: '#fff',
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <span
                  style={{
                    backgroundColor: trip.tagColor,
                    padding: '6px 14px',
                    borderRadius: '24px',
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '0.6px',
                    display: 'inline-block',
                    textTransform: 'uppercase',
                  }}
                >
                  {trip.tag}
                </span>
              </div>
              <h1
                style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  margin: '0 0 12px',
                  lineHeight: '1.2',
                }}
              >
                {trip.title}
              </h1>
              <p style={{ margin: '0', fontSize: '16px', opacity: 0.95 }}>
                {trip.description}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '30px' }}>
          {/* Itinerary Section */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#0f1923',
                  marginBottom: '8px',
                }}
              >
                Trip Itinerary
              </h2>
              <p style={{ color: '#6b7280', margin: '0' }}>
                Day-by-day breakdown of your complete journey
              </p>
            </div>

            <TripItinerary tripData={trip} />
          </div>

          {/* Sidebar */}
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '28px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              height: 'fit-content',
            }}
          >
            <div style={{ marginBottom: '28px' }}>
              <p style={{ color: '#9ca3af', fontSize: '12px', margin: '0 0 4px' }}>
                Duration
              </p>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#0f1923',
                  margin: '0',
                }}
              >
                {trip.duration}
              </p>
            </div>

            <div
              style={{
                borderTop: '1px solid #e5e7eb',
                paddingTop: '28px',
                marginBottom: '28px',
              }}
            >
              <p style={{ color: '#9ca3af', fontSize: '12px', margin: '0 0 4px' }}>
                Starting from
              </p>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#0f1923',
                  margin: '0',
                }}
              >
                {trip.price}
              </p>
              <p style={{ color: '#6b7280', fontSize: '12px', margin: '6px 0 0' }}>
                Per person (minimum 2 travelers)
              </p>
            </div>

            <button
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '12px',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#1d4ed8')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#2563eb')}
            >
              Book Now
            </button>

            <button
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: 'transparent',
                color: '#2563eb',
                border: '1.5px solid #2563eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#dbeafe'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
              }}
            >
              Ask for Customization
            </button>

            {/* Trip Highlights */}
            <div
              style={{
                borderTop: '1px solid #e5e7eb',
                paddingTop: '28px',
                marginTop: '28px',
              }}
            >
              <h4
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#0f1923',
                  margin: '0 0 16px',
                }}
              >
                What's Included
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Accommodation', 'Meals (As specified)', 'Guided tours', 'Local transportation', 'Entry fees'].map(
                  (item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          color: '#16a34a',
                          fontSize: '16px',
                          fontWeight: 'bold',
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ color: '#6b7280', fontSize: '13px' }}>
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
