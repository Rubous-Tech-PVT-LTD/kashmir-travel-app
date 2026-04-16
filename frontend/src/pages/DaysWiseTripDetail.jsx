import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Loader } from 'lucide-react'
import TripItinerary from '../components/TripItinerary'
import DaywiseTripReviews from '../components/DaywiseTripReviews'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { itineraryAPI } from '../utils/api'

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

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader className="animate-spin w-10 h-10 mx-auto mb-3 text-blue-600" />
            <p className="text-gray-500">Loading trip details...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  /* ================= NOT FOUND ================= */
  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-center px-4">
          <div>
            <p className="text-gray-500 text-lg mb-5">
              Trip details not found
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  /* ================= MAIN ================= */
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate('/all-daywise-trips')}
            className="mb-5 text-sm bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200"
          >
            ← All Kashmir Tours
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Haba Khatoon Travels
          </h1>

          <p className="text-gray-600 max-w-xl">
            Explore enchanting valleys, pristine lakes, and snow-capped mountains with our curated packages
          </p>
        </div>

        {/* Hero */}
        <div className="relative rounded-xl overflow-hidden mb-10">
          <img
            src={trip.image}
            alt={trip.title}
            className="w-full h-75 object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
            <span
              className="inline-block px-3 py-1 rounded text-xs font-bold mb-3"
              style={{ backgroundColor: trip.tagColor }}
            >
              {trip.tag}
            </span>

            <h2 className="text-2xl font-semibold mb-2">
              {trip.title}
            </h2>

            <p className="text-sm text-gray-200">
              {trip.description}
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2">

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800">
                Trip Itinerary
              </h2>
              <p className="text-gray-500 text-sm">
                Day-by-day breakdown of your journey
              </p>
            </div>

            <TripItinerary tripData={trip} />

            <DaywiseTripReviews
              tripId={trip.id}
              tripTitle={trip.title}
            />
          </div>

          {/* SIDEBAR */}
          <div className="bg-white p-6 rounded-xl border shadow-sm h-fit">

            {/* Duration */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 font-semibold">Duration</p>
              <p className="text-lg font-bold text-gray-900">
                {trip.duration}
              </p>
            </div>

            {/* Price */}
            <div className="border-t pt-6 mb-6">
              <p className="text-xs text-gray-500 font-semibold">
                Starting from
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {trip.price}
              </p>
              <p className="text-xs text-gray-400">
                Per person (min 2 travelers)
              </p>
            </div>

            {/* Buttons */}
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mb-3">
              Book Now
            </button>

            <button className="w-full border border-blue-500 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50">
              Ask for Customization
            </button>

            {/* Includes */}
            <div className="border-t pt-6 mt-6">
              <h4 className="text-sm font-bold mb-4">
                What's Included
              </h4>

              <div className="space-y-3 text-sm text-gray-600">
                {[
                  'Accommodation',
                  'Meals (As specified)',
                  'Guided tours',
                  'Local transportation',
                  'Entry fees'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}