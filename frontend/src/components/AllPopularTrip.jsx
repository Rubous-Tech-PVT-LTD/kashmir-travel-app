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
  { label: 'Adventure Kashmir Trek', value: 'adventure-trek' },
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
  <HeartIcon
    className={`h-5 w-5 stroke-2 ${filled ? 'fill-[#ff4757] text-[#ff4757]' : 'fill-none text-neutral-700'}`}
  />
)

const Star = ({ filled }) => (
  <StarIcon
    className={`h-3.5 w-3.5 stroke-[1.5] ${filled ? 'fill-[#f4c430] text-[#f4c430]' : 'fill-gray-300 text-gray-300'}`}
  />
)

const SearchIcon = () => <Search className="h-4.5 w-4.5 stroke-[2.5] text-white" />
const ClockIcon = () => <Clock3 className="h-3.5 w-3.5 stroke-2" />

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
      const tripCategory = Array.isArray(trip.category) ? trip.category : [trip.category]
      const matchesCategory = activeCategory === 'all' || tripCategory.includes(activeCategory)
      const matchesSearch = !normalizedSearch || `${trip.title} ${trip.description} ${tripCategory.join(' ')}`.toLowerCase().includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery, trips])

  const pageTitle = activeCategory === 'all'
    ? 'All Kashmir Tours'
    : `${formatCategoryTitle(activeCategory)} Tours`

  const pageSubtitle = activeCategory === 'all'
    ? 'Discover all our curated Haba Khatoon Travels packages and find the perfect trip for your next adventure.'
    : `Browse ${categoryLabelMap[activeCategory] || activeCategory} itineraries directly from our travel experts.`

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
    <div className="flex min-h-screen flex-col bg-gray-50 font-[system-ui,'Segoe_UI',sans-serif] text-neutral-900">
      <Navbar />

      <div className="flex-1">
        <div className="mx-auto max-w-350 px-5 py-10">
          <div className="mb-7">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mb-4 inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-sm font-semibold text-blue-600"
            >
              ← Back to Home
            </button>
            <h1 className="mb-3 text-[42px] font-bold leading-tight text-[#0f1923]">
              {pageTitle}
            </h1>
            <p className="m-0 max-w-190 text-base text-gray-500">
              {pageSubtitle}
            </p>
          </div>

          <div className="mb-7 flex flex-wrap gap-2.5">
            {tripCategories.map((category) => {
              const isActive = activeCategory === category.value || (activeCategory === 'all' && category.value === 'all')

              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => handleCategoryChange(category.value)}
                  className={`cursor-pointer rounded-full border px-3.5 py-2.5 text-[13px] font-semibold transition-colors ${
                    isActive
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  {category.label}
                </button>
              )
            })}
          </div>

          <div className="mb-7 flex max-w-130 items-center gap-0">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Kashmir trips"
              className="font-dm flex-1 rounded-l-lg border-[1.5px] border-r-0 border-gray-300 px-4 py-3 text-sm text-neutral-800 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            <button
              type="button"
              className="flex h-11 cursor-pointer items-center justify-center rounded-r-lg border-[1.5px] border-blue-600 bg-blue-600 px-4 py-3"
            >
              <SearchIcon />
            </button>
          </div>

          {loading && (
            <div className="grid min-h-60 place-items-center">
              <div className="text-center">
                <Loader className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
                <p className="text-base text-gray-500">Loading trips...</p>
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
              <p className="m-0 font-semibold">⚠️ {error}</p>
              <p className="mt-2 text-sm">
                Please try refreshing the page or check your internet connection.
              </p>
            </div>
          )}

          {!loading && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleTrips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => navigate(`/trips/${trip.id}`)}
                  className="cursor-pointer overflow-hidden rounded-[10px] border border-gray-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                >
                  <div className="relative h-52.5 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="block h-full w-full object-cover"
                    />
                    <div
                      className="absolute left-3.5 top-3.5 rounded px-2.5 py-1 text-[10px] font-semibold uppercase text-white"
                      style={{ backgroundColor: trip.tagColor }}
                    >
                      {trip.tag}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(trip.id)
                      }}
                      className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 bg-white/95 shadow-md"
                    >
                      <Heart filled={wishlist[trip.id]} />
                    </button>
                  </div>

                  <div className="px-4 py-4.5">
                    <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-400">
                      <ClockIcon />
                      {trip.duration}
                    </div>

                    <h3 className="mb-2.5 min-h-10 text-[15px] font-bold leading-snug text-[#0f1923]">
                      {trip.title}
                    </h3>

                    <div className="mb-2.5 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} filled={i < 5} />
                      ))}
                    </div>

                    <div className="flex items-baseline gap-1.5 text-[13px] text-gray-500">
                      From{' '}
                      <span className="text-base font-bold text-[#0f1923]">{trip.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && visibleTrips.length === 0 && (
            <div className="px-5 py-20 text-center">
              <div className="mb-4 text-4xl">⛰️</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 font-['DM_Sans']">Coming Soon!</h3>
              <p className="text-gray-500 max-w-md mx-auto font-['DM_Sans']">
                Exciting new Kashmir itineraries are being curated for this category. 
                Stay tuned or contact us to build your own custom tour!
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
