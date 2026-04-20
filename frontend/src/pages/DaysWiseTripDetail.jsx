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
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919149680276'
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const normalizeTrip = (data) => {
    const cover = data.coverImage || data.image || ''
    const gallery = Array.isArray(data.gallery)
      ? data.gallery.filter(Boolean)
      : []

    return {
      id: data._id || data.id,
      category: data.category,
      title: data.title,
      description: data.description || '',
      image: cover,
      gallery,
      duration: data.duration || `${data.itinerary?.length || 0} Days`,
      price: typeof data.price === 'number' ? `₹${data.price}` : data.price,
      tag: data.tag || 'Daywise',
      tagColor: data.tagColor || '#2563eb',
      itinerary: data.itinerary || [],
    }
  }

  useEffect(() => {
    let mounted = true
    const fallbackTrip = location.state?.trip

    if (fallbackTrip && fallbackTrip.category === 'daywise') {
      setTrip(normalizeTrip(fallbackTrip))
      setLoading(false)
    }

    const fetchTrip = async () => {
      if (!fallbackTrip) {
        setLoading(true)
      }

      const data = await itineraryAPI.getById(tripId)

      if (!mounted) return

      if (!data || data.category !== 'daywise') {
        if (!fallbackTrip) {
          setTrip(null)
        }
        setLoading(false)
        return
      }

      setTrip(normalizeTrip(data))

      setLoading(false)
    }

    fetchTrip()

    return () => {
      mounted = false
    }
  }, [location.state, tripId])

  const openWhatsApp = (message) => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

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
              className="px-5 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus-visible:outline-none focus:ring-0"
            >
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const galleryImages = trip.gallery?.length
    ? trip.gallery
    : [trip.image].filter(Boolean)

  /* ================= MAIN ================= */
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate('/all-daywise-trips')}
            className="mb-5 text-sm bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 focus:outline-none focus-visible:outline-none focus:ring-0"
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
            <button
              onClick={() =>
                openWhatsApp(
                  `Hi, I want to book ${trip.title}. Please share the availability, dates, and best pricing.`
                )
              }
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mb-3 focus:outline-none focus-visible:outline-none focus:ring-0"
            >
              Book Now
            </button>

            <button
              onClick={() =>
                openWhatsApp(
                  `Hi, I would like to customize ${trip.title}. Please share options for itinerary changes, hotels, and transport.`
                )
              }
              className="w-full border border-blue-500 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 focus:outline-none focus-visible:outline-none focus:ring-0"
            >
              Ask for Customization
            </button>

            <button
              onClick={() => setIsGalleryOpen(true)}
              className="w-full border border-slate-300 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-100 mt-3 focus:outline-none focus-visible:outline-none focus:ring-0"
            >
              View Gallery
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

      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6">
          <div className="w-full max-w-5xl rounded-2xl bg-white p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Gallery
                </p>
                <h3 className="text-lg font-bold text-slate-900">{trip.title}</h3>
              </div>

              <button
                onClick={() => setIsGalleryOpen(false)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            <div className="grid max-h-[75vh] grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <div key={`${image}-${index}`} className="overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={image}
                    alt={`${trip.title} gallery ${index + 1}`}
                    className="h-56 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}