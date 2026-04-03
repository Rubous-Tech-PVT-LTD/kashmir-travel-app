import { useEffect, useState } from 'react'
import { ArrowRight as ArrowRightIcon, Clock3, Loader } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { itineraryAPI } from '../utils/api'
import { sectionStyles } from '../ui/tripSectionStyles'
import ui from '../ui/tripSection.module.css'

const filters = ['2-4 Days', '5-7 Days', 'Family Trips']

const ArrowRight = () => (
  <ArrowRightIcon width={16} height={16} strokeWidth={2} />
)

const ClockIcon = () => (
  <Clock3 width={14} height={14} strokeWidth={2} />
)

export default function AllDaysWiseTrips() {
  const [activeFilter, setActiveFilter] = useState('2-4 Days')
  const [managedTrips, setManagedTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Fetch trips from backend
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true)
        setError('')
        const trips = await itineraryAPI.getByCategory('daywise')
        
        // Transform MongoDB data to match expected format
        const transformedTrips = trips.map((trip, index) => ({
          id: trip._id || index + 1,
          category: trip.category,
          title: trip.title,
          description: trip.title,
          image: trip.coverImage,
          duration: trip.duration,
          price: `₹${trip.price}`,
          tag: trip.tag || 'Custom',
          tagColor: trip.tagColor || '#0891b2',
          itinerary: trip.itinerary || []
        }))
        
        setManagedTrips(transformedTrips)
      } catch (err) {
        console.error('Error fetching trips:', err)
        setError('Failed to load trips from server')
        setManagedTrips([])
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [])

  const daysParam = Number(searchParams.get('days'))
  const themeParam = searchParams.get('theme')
  const templeParam = searchParams.get('temple')
  const hasDaysFilter = Number.isFinite(daysParam) && daysParam > 0
  const hasThemeFilter =
    themeParam === 'family' ||
    themeParam === 'adventure' ||
    themeParam === 'honeymoon' ||
    themeParam === 'spiritual'

  const spiritualTempleMap = {
    'vaishno-devi': { name: 'Vaishno Devi Temple', tripIds: [3, 6] },
    'kheer-bhawani': { name: 'Mata Kheer Bhawani Temple', tripIds: [2, 4] },
    shankaracharya: { name: 'Shankaracharya Temple', tripIds: [1, 2, 3] },
    amarnath: { name: 'Amar Nath Cave', tripIds: [5, 6] },
    
  }

  const selectedTemple = templeParam ? spiritualTempleMap[templeParam] : null

  const handleViewTrip = (trip) => {
    navigate(`/daywise-trip/${trip.id}`, { state: { trip } })
  }

  const filteredTrips = managedTrips.filter((trip) => {
    if (trip.category !== 'daywise') {
      return false
    }

    const days = parseInt(trip.duration.split(' ')[0], 10)

    if (hasDaysFilter || hasThemeFilter) {
      if (hasDaysFilter && days !== daysParam) {
        return false
      }

      if (themeParam === 'family') {
        return trip.tag === 'Family Pick'
      }

      if (themeParam === 'adventure') {
        const adventureText = `${trip.title} ${trip.description}`
        return /adventure|gulmarg|sonamarg|gondola|glacier|trek/i.test(adventureText)
      }

      if (themeParam === 'honeymoon') {
        return days >= 3 && days <= 6 && trip.tag !== 'Family Pick'
      }

      if (themeParam === 'spiritual') {
        if (selectedTemple) {
          return selectedTemple.tripIds.includes(trip.id)
        }

        return days >= 3 && days <= 7
      }

      return true
    }

    if (activeFilter === '2-4 Days') return days >= 2 && days <= 4
    if (activeFilter === '5-7 Days') return days >= 5 && days <= 7
    if (activeFilter === 'Family Trips') return trip.tag === 'Family Pick'
    return true
  })

  const pageTitle = hasDaysFilter
    ? `${daysParam} Days Kashmir Tours`
    : themeParam === 'family'
      ? 'Family Kashmir Tours'
      : themeParam === 'adventure'
        ? 'Adventure Kashmir Tours'
        : themeParam === 'honeymoon'
          ? 'Honeymoon Kashmir Tours'
          : themeParam === 'spiritual' && selectedTemple
            ? `${selectedTemple.name} Tours`
            : themeParam === 'spiritual'
              ? 'Spiritual Kashmir Tours'
        : 'All Kashmir Tours'

  const pageSubtitle = hasDaysFilter
    ? `Handpicked ${daysParam}-day itineraries with complete planning and transparent pricing.`
    : themeParam === 'family'
      ? 'Comfort-focused Kashmir trips designed for families with smooth transfers and relaxed pacing.'
      : themeParam === 'adventure'
        ? 'Thrill-packed Kashmir itineraries featuring gondola rides, mountain trails, and alpine valleys.'
        : themeParam === 'honeymoon'
          ? 'Romantic Kashmir tours curated for couples with scenic stays, calm pacing, and cozy experiences.'
          : themeParam === 'spiritual' && selectedTemple
            ? `Pilgrimage-friendly Kashmir itineraries that include ${selectedTemple.name} with guided transport and comfortable stays.`
            : themeParam === 'spiritual'
              ? 'Temple and shrine focused Kashmir journeys with smooth logistics, relaxed pacing, and culturally rich experiences.'
        : 'Choose your perfect trip duration from 2 to 7 days with transparent pricing and curated day-by-day plans.'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ flex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
          {/* Header */}
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={() => navigate('/')}
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
                marginBottom: '16px',
                padding: '0',
              }}
            >
              ← Back to Home
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
              {pageTitle}
            </h1>
            <p
              style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: '0 0 32px',
                maxWidth: '600px',
              }}
            >
              {pageSubtitle}
            </p>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
            {filters.map((f, i) => (
              <span key={f} style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={() => setActiveFilter(f)}
                  className={ui.filterButton}
                  style={{
                    ...sectionStyles.filterButtonBase,
                    ...(activeFilter === f ? sectionStyles.filterButtonActive : null),
                  }}
                >
                  {f}
                </button>
                {i < filters.length - 1 && (
                  <span style={{ ...sectionStyles.filterSeparator, margin: '0 24px' }}>|</span>
                )}
              </span>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div style={sectionStyles.loadingWrap}>
              <div style={{ textAlign: 'center' }}>
                <Loader className={ui.spin} style={{ width: '48px', height: '48px', margin: '0 auto 16px' }} />
                <p style={{ fontSize: '16px', color: '#6b7280' }}>Loading trips...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fecaca', borderRadius: '8px', padding: '16px', marginBottom: '24px', color: '#991b1b' }}>
              <p style={{ margin: '0', fontWeight: '600' }}>⚠️ {error}</p>
              <p style={{ margin: '8px 0 0', fontSize: '14px' }}>
                Make sure the backend server is running on http://localhost:5000
              </p>
            </div>
          )}

          {/* Trips Grid */}
          {!loading && managedTrips.length > 0 && (
          <div style={sectionStyles.cardsGrid}>
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className={ui.card}
                style={sectionStyles.card}
              >
                <div style={sectionStyles.imageWrap}>
                  <img
                    className={ui.image}
                    src={trip.image}
                    alt={trip.title}
                    style={sectionStyles.image}
                  />
                  <div style={{ ...sectionStyles.badge, backgroundColor: trip.tagColor }}>
                    {trip.tag}
                  </div>
                </div>

                <div style={sectionStyles.cardBody}>
                  <div style={sectionStyles.duration}>
                    <ClockIcon />
                    {trip.duration}
                  </div>

                  <h3 style={sectionStyles.cardTitle}>
                    {trip.title}
                  </h3>

                  <p style={sectionStyles.cardDescription}>
                    {trip.description}
                  </p>

                  <div style={sectionStyles.priceRow}>
                    <div>
                      <span style={sectionStyles.priceMeta}>
                        Starting from
                      </span>
                      <span style={sectionStyles.priceValue}>
                        {trip.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleViewTrip(trip)}
                      className={ui.readMore}
                      style={sectionStyles.ctaButton}
                    >
                      View Trip <ArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}

          {filteredTrips.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ color: '#6b7280', fontSize: '16px' }}>
                No trips found for the selected filter.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

