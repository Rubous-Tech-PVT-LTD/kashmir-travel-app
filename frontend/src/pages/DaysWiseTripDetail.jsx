import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Loader } from 'lucide-react'
import TripItinerary from '../components/TripItinerary'
import DaywiseTripReviews from '../components/DaywiseTripReviews'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { itineraryAPI } from '../utils/api'
import { tripDetailStyles } from '../ui/tripDetailStyles'
import ui from '../ui/tripSection.module.css'

export default function DaysWiseTripDetail() {
  const { tripId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fallbackTrip = location.state?.trip

    if (fallbackTrip && fallbackTrip.category === 'daywise') {
      setTrip(fallbackTrip)
      setLoading(false)
      return
    }

    const fetchTrip = async () => {
      setLoading(true)

      const data = await itineraryAPI.getById(tripId)

      if (!data || data.category !== 'daywise') {
        setTrip(null)
        setLoading(false)
        return
      }

      setTrip({
        id: data._id,
        category: data.category,
        title: data.title,
        description: data.description || '',
        image: data.coverImage,
        duration: data.duration || `${data.itinerary?.length || 0} Days`,
        price: typeof data.price === 'number' ? `₹${data.price}` : data.price,
        tag: data.tag || 'Daywise',
        tagColor: data.tagColor || '#2563eb',
        itinerary: data.itinerary || [],
      })
      setLoading(false)
    }

    fetchTrip()
  }, [location.state, tripId])

  if (loading) {
    return (
      <div style={tripDetailStyles.pageShell}>
        <Navbar />
        <div style={tripDetailStyles.centerArea}>
          <div style={tripDetailStyles.centeredText}>
            <Loader className={ui.spin} style={{ width: '40px', height: '40px', margin: '0 auto 12px' }} />
            <p style={{ color: '#6b7280', fontSize: '15px' }}>Loading trip details...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!trip) {
    return (
      <div style={tripDetailStyles.pageShell}>
        <Navbar />
        <div style={tripDetailStyles.centerArea}>
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
    <div style={tripDetailStyles.page}>
      {/* Top Bar */}
   
      <Navbar />
      
      <div style={tripDetailStyles.contentWrap}>
        <div style={tripDetailStyles.container}>
          {/* Top Header */}
          <div style={{ marginBottom: '40px' }}>
            <button
              onClick={() => navigate('/all-daywise-trips')}
              style={{ ...tripDetailStyles.backButton, marginBottom: '20px' }}
            >
              ← All Kashmir Tours
            </button>
            <h1 style={tripDetailStyles.pageTitle}>
              Kashmir Tour Travel
            </h1>
            <p style={tripDetailStyles.pageSubtitle}>
              Explore enchanting valleys, pristine lakes, and snow-capped mountains with our curated Kashmir travel packages
            </p>
          </div>

          {/* Hero Section */}
        <div style={tripDetailStyles.heroCard}>
          <div style={tripDetailStyles.heroImageWrap}>
            <img
              src={trip.image}
              alt={trip.title}
              style={tripDetailStyles.heroImage}
            />
            {/* Overlay with content */}
            <div style={tripDetailStyles.heroOverlay}>
              <div style={{ marginBottom: '16px' }}>
                <span
                  style={{ ...tripDetailStyles.heroTag, backgroundColor: trip.tagColor }}
                >
                  {trip.tag}
                </span>
              </div>
              <h1 style={tripDetailStyles.heroTitle}>
                {trip.title}
              </h1>
              <p style={tripDetailStyles.heroDescription}>
                {trip.description}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={tripDetailStyles.mainGrid}>
          {/* Itinerary Section */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <h2 style={tripDetailStyles.sectionTitle}>
                Trip Itinerary
              </h2>
              <p style={tripDetailStyles.sectionSubtitle}>
                Day-by-day breakdown of your complete journey
              </p>
            </div>

            <TripItinerary tripData={trip} />

            <DaywiseTripReviews tripId={trip.id} tripTitle={trip.title} />
          </div>

          {/* Sidebar */}
          <div style={tripDetailStyles.sidebar}>
            <div style={{ marginBottom: '28px' }}>
              <p style={tripDetailStyles.label}>
                Duration
              </p>
              <p style={tripDetailStyles.value}>
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
              <p style={tripDetailStyles.label}>
                Starting from
              </p>
              <p style={tripDetailStyles.largeValue}>
                {trip.price}
              </p>
              <p style={tripDetailStyles.helperText}>
                Per person (minimum 2 travelers)
              </p>
            </div>

            <button
              style={tripDetailStyles.primaryAction}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#1d4ed8')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#2563eb')}
            >
              Book Now
            </button>

            <button
              style={tripDetailStyles.secondaryAction}
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
                    <div key={item} style={tripDetailStyles.includesItem}>
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
