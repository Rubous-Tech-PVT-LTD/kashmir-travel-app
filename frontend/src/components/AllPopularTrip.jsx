import { useEffect, useMemo, useState } from 'react'
import { Clock3, Heart as HeartIcon, Loader, Search, Star as StarIcon } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { itineraryAPI } from '../utils/api'

const tripCategories = [
  { label: 'All Trips', value: 'all' },
  { label: 'Popular', value: 'popular' },
  { label: 'Day-wise', value: 'daywise' },
  { label: 'Romantic Tour', value: 'romantic-tour' },
  { label: 'Couple Tour', value: 'couple-tour' },
  { label: 'Group Tour', value: 'group-tour' },
  { label: 'Family Tour', value: 'family-tour' },
  { label: 'Honeymoon Packages', value: 'honeymoon-packages' },
  { label: 'Adventure Trek', value: 'adventure-trek' },
  { label: 'Spiritual Tour', value: 'spiritual-tour' },
  { label: 'Couple Special', value: 'couple-special' },
]

const categoryLabelMap = tripCategories.reduce((accumulator, item) => {
  accumulator[item.value] = item.label
  return accumulator
}, {})

const formatCategoryTitle = (category) => {
  const label = categoryLabelMap[category] || category
  return label.replace(/\s+Tour$/i, '')
}

const Heart = ({ filled }) => (
  <HeartIcon width={20} height={20} fill={filled ? '#ff4757' : 'none'} color={filled ? '#ff4757' : '#333'} strokeWidth={2} />
)

const Star = ({ filled }) => (
  <StarIcon width={14} height={14} fill={filled ? '#f4c430' : '#ddd'} color={filled ? '#f4c430' : '#ddd'} strokeWidth={1.5} />
)

const SearchIcon = () => <Search width={18} height={18} color="white" strokeWidth={2.5} />
const ClockIcon = () => <Clock3 width={14} height={14} strokeWidth={2} />

export default function Alltrip() {
  const [wishlist, setWishlist] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const activeCategory = searchParams.get('category') || 'all'

  useEffect(() => {
    let mounted = true

    const fetchTrips = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await itineraryAPI.getAll()

        if (!mounted) {
          return
        }

        const transformedTrips = data.map((trip, index) => ({
          id: trip._id || trip.id || index + 1,
          title: trip.title,
          description: trip.description || trip.title,
          image: trip.coverImage,
          duration: trip.duration,
          price: `₹${trip.price}`,
          badge: categoryLabelMap[trip.category] || trip.category || 'Trip',
          tagColor: trip.tagColor || '#2563eb',
          category: trip.category || 'daywise',
          tag: trip.tag || categoryLabelMap[trip.category] || 'Trip',
        }))

        setTrips(transformedTrips)
      } catch (fetchError) {
        console.error('Error fetching trips:', fetchError)
        setError('Failed to load trips from server')
        setTrips([])
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()

    return () => {
      mounted = false
    }
  }, [])

  const visibleTrips = useMemo(() => {
    const normalizedSearch = searchQuery.toLowerCase().trim()

    return trips.filter((trip) => {
      const matchesCategory = activeCategory === 'all' || trip.category === activeCategory
      const matchesSearch = !normalizedSearch || `${trip.title} ${trip.description} ${trip.category}`.toLowerCase().includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery, trips])

  const pageTitle = activeCategory === 'all'
    ? 'All Kashmir Tours'
    : `${formatCategoryTitle(activeCategory)} Tours`

  const pageSubtitle = activeCategory === 'all'
    ? 'Discover all our curated Haba Khatoon Travels packages and find the perfect trip for your next adventure.'
    : `Browse ${categoryLabelMap[activeCategory] || activeCategory} itineraries directly from the live backend.`

  const handleCategoryChange = (value) => {
    const nextParams = new URLSearchParams(searchParams)
    if (value === 'all') {
      nextParams.delete('category')
    } else {
      nextParams.set('category', value)
    }
    setSearchParams(nextParams)
  }

  const toggleWishlist = (id) => setWishlist((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: '#f9fafb', minHeight: '100vh', color: '#111', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ flex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
          <div style={{ marginBottom: '28px' }}>
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
                padding: '0',
                marginBottom: '16px',
              }}
            >
              ← Back to Home
            </button>
            <h1 style={{ fontSize: '42px', fontWeight: '700', color: '#0f1923', margin: '0 0 12px', lineHeight: '1.2' }}>
              {pageTitle}
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280', margin: '0', maxWidth: '760px' }}>
              {pageSubtitle}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
            {tripCategories.map((category) => {
              const isActive = activeCategory === category.value || (activeCategory === 'all' && category.value === 'all')

              return (
                <button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  style={{
                    border: '1px solid ' + (isActive ? '#2563eb' : '#d1d5db'),
                    background: isActive ? '#2563eb' : '#fff',
                    color: isActive ? '#fff' : '#374151',
                    padding: '10px 14px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {category.label}
                </button>
              )
            })}
          </div>

          <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: 0, maxWidth: 520 }}>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Kashmir trips"
              style={{
                flex: 1,
                border: '1.5px solid #d1d5db',
                borderRight: 'none',
                borderRadius: '8px 0 0 8px',
                padding: '12px 16px',
                fontSize: '14px',
                outline: 'none',
                color: '#333',
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <button
              type="button"
              style={{
                background: '#2563eb',
                border: '1.5px solid #2563eb',
                borderRadius: '0 8px 8px 0',
                padding: '12px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '44px',
              }}
            >
              <SearchIcon />
            </button>
          </div>

          {loading && (
            <div style={{ minHeight: '240px', display: 'grid', placeItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <Loader style={{ width: '48px', height: '48px', margin: '0 auto 16px' }} />
                <p style={{ fontSize: '16px', color: '#6b7280' }}>Loading trips...</p>
              </div>
            </div>
          )}

          {error && !loading && (
            <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fecaca', borderRadius: '8px', padding: '16px', marginBottom: '24px', color: '#991b1b' }}>
              <p style={{ margin: '0', fontWeight: '600' }}>⚠️ {error}</p>
              <p style={{ margin: '8px 0 0', fontSize: '14px' }}>
                Make sure the backend server is running on http://localhost:5000
              </p>
            </div>
          )}

          {!loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {visibleTrips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => navigate(`/trips/${trip.id}`)}
                  style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: '#fff',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid #e5e7eb',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
                  }}
                >
                  <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                    <img
                      src={trip.image}
                      alt={trip.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        background: trip.tagColor,
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: '600',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {trip.tag}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(trip.id)
                      }}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(255,255,255,0.95)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      }}
                    >
                      <Heart filled={wishlist[trip.id]} />
                    </button>
                  </div>

                  <div style={{ padding: '18px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', fontSize: '12px', marginBottom: '8px' }}>
                      <ClockIcon />
                      {trip.duration}
                    </div>

                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f1923', margin: '0 0 10px', lineHeight: '1.4', minHeight: '40px' }}>
                      {trip.title}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} filled={i < 5} />
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', fontSize: '13px', color: '#6b7280' }}>
                      From{' '}
                      <span style={{ fontSize: '16px', fontWeight: '700', color: '#0f1923' }}>{trip.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && visibleTrips.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
              No trips found for the selected category.
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
