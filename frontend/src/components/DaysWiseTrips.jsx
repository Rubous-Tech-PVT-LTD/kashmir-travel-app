import { useState, useEffect } from 'react'
import { ArrowRight as ArrowRightIcon, Clock3, Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { itineraryAPI } from '../utils/api'

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
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader size={40} className="animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            {/* Header Row */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 font-['DM_Sans']">
                  Days-Wise Kashmir Trips
                </h2>
                <div className="w-16 h-1 bg-blue-600 rounded-full" />
              </div>
              <p className="text-gray-600 text-lg leading-relaxed max-w-130 font-['DM_Sans']">
                Choose your perfect trip duration from 2 to 7 days with transparent pricing and curated day-by-day plans.
              </p>
            </div>

            {/* See all link + Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
              <button
                onClick={() => navigate('/all-daywise-trips')}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 font-['DM_Sans'] tracking-wide"
              >
                See all days-wise trips →
              </button>

              {/* Filter Pills */}
              <div className="flex items-center gap-0">
                {filters.map((f, i) => (
                  <span key={f} className="flex items-center">
                    <button
                      onClick={() => setActiveFilter(f)}
                      className={`
                        px-4 py-2 text-sm font-medium transition-colors duration-200 font-['DM_Sans']
                        ${activeFilter === f
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-gray-900'
                        }
                      `}
                    >
                      {f}
                    </button>
                    {i < filters.length - 1 && (
                      <span className="text-gray-300 mx-2">|</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleTrips.length > 0 ? (
                visibleTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-gray-200"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={trip.image}
                        alt={`Day-wise itinerary view for ${trip.title}, Kashmir`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      {/* Tag badge */}
                      <div
                        className="absolute top-3 left-3 px-3 py-1 text-white text-xs font-semibold rounded-full shadow-lg"
                        style={{ backgroundColor: trip.tagColor }}
                      >
                        {trip.tag}
                      </div>
                      {/* Coming Soon Badge */}
                      {trip.isComingSoon && (
                        <div className="absolute top-3 right-3 bg-amber-500 text-black text-xs font-extrabold px-2.5 py-1 rounded uppercase shadow-lg z-10">
                          Coming Soon
                        </div>
                      )}
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
                          className={`
                            flex items-center gap-1 text-sm font-medium transition-colors duration-200 font-['DM_Sans']
                            ${trip.isComingSoon
                              ? 'bg-amber-50 text-amber-600 px-3 py-1.5 rounded-md font-bold hover:bg-amber-100'
                              : 'text-blue-600 hover:text-blue-700'
                            }
                          `}
                        >
                          {trip.isComingSoon ? 'Enquire' : 'View Trip'} <ArrowRight />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex justify-center py-20">
                  <p className="text-gray-500 text-lg font-['DM_Sans']">No trips available. Please check back soon.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
