import { useEffect, useState } from 'react'
import { ArrowRight as ArrowRightIcon, Clock3, Loader } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { itineraryAPI } from '../utils/api'

const filters = ['2-4 Days', '5-7 Days', 'Family Trips']

const categoryFilters = [
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

const categoryLabelMap = categoryFilters.reduce((accumulator, item) => {
  accumulator[item.value] = item.label
  return accumulator
}, {})

const formatCategoryTitle = (category) => {
  const label = categoryLabelMap[category] || category
  return label.replace(/\s+Tour$/i, '')
}

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
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategoryParam = searchParams.get('category') || 'daywise'
  const selectedCategory = selectedCategoryParam === 'spiritual' ? 'spiritual-tour' : selectedCategoryParam

  // Fetch trips from backend
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true)
        setError('')
        const trips = await itineraryAPI.getByCategory(selectedCategory)

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
  }, [searchParams, selectedCategory])

  const isDaywiseCategory = selectedCategory === 'daywise'

  const daysParam = Number(searchParams.get('days'))
  const templeParam = searchParams.get('temple')
  const hasDaysFilter = Number.isFinite(daysParam) && daysParam > 0

  const spiritualTempleMap = {
    vaish: { name: 'Vaishno Devi Temple', tripIds: [3, 6] },
    kheer: { name: 'Mata Kheer Bhawani Temple', tripIds: [2, 4] },
    'vaishno-devi': { name: 'Vaishno Devi Temple', tripIds: [3, 6] },
    'kheer-bhawani': { name: 'Mata Kheer Bhawani Temple', tripIds: [2, 4] },
    shankaracharya: { name: 'Shankaracharya Temple', tripIds: [1, 2, 3] },
    amarnath: { name: 'Amar Nath Cave', tripIds: [5, 6] },

  }

  const selectedTemple = templeParam ? spiritualTempleMap[templeParam] : null

  const handleCategoryChange = (category) => {
    const nextParams = new URLSearchParams(searchParams)
    if (category === 'daywise') {
      nextParams.delete('category')
    } else {
      nextParams.set('category', category)
    }
    setSearchParams(nextParams)
    setActiveFilter('2-4 Days')
  }

  const handleViewTrip = (trip) => {
    navigate(`/daywise-trip/${trip.id}`, { state: { trip } })
  }

  const filteredTrips = managedTrips.filter((trip) => {
    if (!isDaywiseCategory) {
      return true
    }

    if (trip.category !== 'daywise') {
      return false
    }

    const days = parseInt(trip.duration.split(' ')[0], 10)

    if (hasDaysFilter && days !== daysParam) {
      return false
    }

    if (selectedTemple && !selectedTemple.tripIds.includes(trip.id)) {
      return false
    }

    if (hasDaysFilter || selectedTemple) {
      return true
    }

    if (activeFilter === '2-4 Days') return days >= 2 && days <= 4
    if (activeFilter === '5-7 Days') return days >= 5 && days <= 7
    if (activeFilter === 'Family Trips') return trip.tag === 'Family Pick'
    return true
  })

  const pageTitle = hasDaysFilter
    ? `${daysParam} Days Kashmir Tours`
    : selectedCategory !== 'daywise'
      ? `${formatCategoryTitle(selectedCategory)} Tours`
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
    : selectedCategory !== 'daywise'
      ? `Browse ${categoryLabelMap[selectedCategory] || selectedCategory} itineraries directly.`
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto py-10 px-5">
          {/* Header */}
          <div className="mb-5">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold bg-none border-none cursor-pointer mb-4 p-0 hover:text-blue-700 transition-colors duration-200"
            >
              ← Back to Home
            </button>
            <h1 className="text-4xl font-bold text-slate-900 mb-3 leading-tight font-['DM_Sans']">
              {pageTitle}
            </h1>
            <p className="text-base text-gray-600 mb-8 max-w-2xl font-['DM_Sans']">
              {pageSubtitle}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5 mb-4.5">
            {categoryFilters.map((category) => {
              const isActive = selectedCategory === category.value

              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => handleCategoryChange(category.value)}
                  className={`
                    border px-3.5 py-2.5 rounded-full cursor-pointer text-xs font-semibold transition-colors duration-200
                    ${isActive
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-600'
                    }
                  `}
                >
                  {category.label}
                </button>
              )
            })}
          </div>

          {/* Day-wise Filters */}
          {isDaywiseCategory && (
            <div className="flex items-center gap-6 mb-10">
              {filters.map((f, i) => (
                <span key={f} className="flex items-center">
                  <button
                    onClick={() => setActiveFilter(f)}
                    className={`
                      sm:px-4 px-2 py-2 text-sm font-medium transition-colors duration-200 font-['DM_Sans']
                      ${activeFilter === f
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    {f}
                  </button>
                  {i < filters.length - 1 && (
                    <span className="text-gray-300 sm:mx-6 mx-3">|</span>
                  )}
                </span>
              ))}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader className="animate-spin w-12 h-12 mx-auto mb-4 text-blue-600" />
                <p className="text-base text-gray-600 font-['DM_Sans']">Loading trips...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-800">
              <p className="m-0 font-semibold">⚠️ {error}</p>
              <p className="mt-2 mb-0 text-sm">
                Make sure the backend server is running on http://localhost:5000
              </p>
            </div>
          )}

          {/* Trips Grid */}
          {!loading && managedTrips.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-gray-200"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div
                      className="absolute top-3 left-3 px-3 py-1 text-white text-xs font-semibold rounded-full shadow-lg"
                      style={{ backgroundColor: trip.tagColor }}
                    >
                      {trip.tag}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    {/* Duration */}
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3 font-['DM_Sans']">
                      <ClockIcon />
                      {trip.duration}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 font-['DM_Sans']">
                      {trip.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 font-['DM_Sans']">
                      {trip.description}
                    </p>

                    {/* Price + CTA row */}
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-gray-500 text-xs block font-['DM_Sans']">
                          Starting from
                        </span>
                        <span className="text-2xl font-bold text-gray-900 font-['DM_Sans']">
                          {trip.price}
                        </span>
                      </div>

                      <button
                        onClick={() => handleViewTrip(trip)}
                        className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 font-['DM_Sans']"
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
            <div className="px-5 py-20 text-center">
              <div className="mb-4 text-4xl">⛰️</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 font-['DM_Sans']">Coming Soon!</h3>
              <p className="text-gray-500 max-w-md mx-auto font-['DM_Sans'] text-base leading-relaxed">
                We're currently hand-picking the best itineraries for this category. 
                Stay tuned or contact us to build your own custom Kashmir experience!
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

