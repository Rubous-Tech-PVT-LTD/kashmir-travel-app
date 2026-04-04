import { useState, useEffect } from 'react'
import { ArrowRight as ArrowRightIcon, Clock3, Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { itineraryAPI } from '../utils/api'
import { sectionStyles } from '../ui/tripSectionStyles'
import ui from '../ui/tripSection.module.css'

const filters = ['2-4 Days', '5-7 Days', 'Family Trips']

const ArrowRight = () => (
  <ArrowRightIcon width={14} height={14} strokeWidth={2.2} />
)

const ClockIcon = () => (
  <Clock3 width={13} height={13} strokeWidth={2} />
)

export default function DaysWiseTrips() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('2-4 Days')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true)
      try {
        const data = await itineraryAPI.getByCategory('daywise')
        const transformed = data.map((trip) => ({
          id: trip._id,
          category: trip.category,
          title: trip.title,
          description: trip.description || '',
          image: trip.coverImage,
          duration: trip.itinerary ? 
            `${trip.itinerary.length} Days / ${Math.max(0, trip.itinerary.length - 1)} Nights` : 
            'N/A',
          price: trip.price,
          tag: trip.tag || 'Kashmir Tour',
          tagColor: trip.tagColor || '#2563eb',
          isComingSoon: trip.isComingSoon || false,
          itinerary: trip.itinerary || []
        }))
        setTrips(transformed)
      } catch (err) {
        console.error('Error fetching trips:', err)
        setTrips([])
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [])

  const handleViewTrip = (trip) => {
    navigate(`/daywise-trip/${trip.id}`, { state: { trip } })
  }

  const visibleTrips = trips
    .filter((trip) => trip.category === 'daywise')
    .filter((trip) => {
      const days = parseInt(String(trip.duration).split(' ')[0], 10)

      if (!Number.isFinite(days)) {
        return true
      }

      if (activeFilter === '2-4 Days') return days >= 2 && days <= 4
      if (activeFilter === '5-7 Days') return days >= 5 && days <= 7
      if (activeFilter === 'Family Trips') return trip.tag === 'Family Pick'
      return true
    })

  return (
    <div style={sectionStyles.page}>
      <div style={sectionStyles.container}>
        {loading ? (
          <div style={sectionStyles.loadingWrap}>
            <Loader size={40} className={ui.spin} />
          </div>
        ) : (
          <>
        <div style={sectionStyles.headerRow}>
          <div>
            <h2 style={sectionStyles.title}>
              Days-Wise Kashmir Trips
            </h2>
            <div style={sectionStyles.titleUnderline} />
          </div>
          <p style={{ ...sectionStyles.subtitle, maxWidth: '520px' }}>
            Choose your perfect trip duration from 2 to 7 days with transparent pricing and curated day-by-day plans.
          </p>
        </div>

        <div style={sectionStyles.sectionRow}>
          <button
            onClick={() => navigate('/all-daywise-trips')}
            className={ui.linkButton}
            style={sectionStyles.linkButton}
          >
            See all days-wise trips →
          </button>

          <div style={{ display: 'flex', alignItems: 'center' }}>
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
                  <span style={sectionStyles.filterSeparator}>|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div style={sectionStyles.cardsGrid}>
          {visibleTrips.length > 0 ? (
            visibleTrips.map((trip) => (
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
                {/* Coming Soon Badge */}
                {trip.isComingSoon && (
                  <div style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "#f59e0b",
                    color: "#000",
                    fontSize: "10px",
                    fontWeight: "800",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    boxShadow: "0 4px 12px rgba(245, 158, 11, 0.4)",
                    zIndex: 10
                  }}>
                    Coming Soon
                  </div>
                )}
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
                      {trip.isComingSoon ? 'TBA' : trip.price}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (trip.isComingSoon) {
                        const msg = encodeURIComponent(`Hi! I'm interested in the upcoming trip: ${trip.title}`);
                        window.open(`https://wa.me/919149680276?text=${msg}`, '_blank');
                      } else {
                        handleViewTrip(trip)
                      }
                    }}
                    className={ui.readMore}
                    style={{
                      ...sectionStyles.ctaButton,
                      background: trip.isComingSoon ? '#f59e0b22' : 'none',
                      color: trip.isComingSoon ? '#f59e0b' : 'inherit',
                      fontWeight: trip.isComingSoon ? 'bold' : 'normal',
                    }}
                  >
                    {trip.isComingSoon ? 'Enquire' : 'View Trip'} <ArrowRight />
                  </button>
                </div>
              </div>
            </div>
            ))
          ) : (
            <div style={sectionStyles.emptyStateWrap}>
              <p style={sectionStyles.emptyStateText}>No trips available. Please check back soon.</p>
            </div>
          )}
        </div>
          </>
        )}
      </div>
    </div>
  )
}
