import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import Footer from '../shared/Footer'
import { carRentalAPI } from '../utils/api'

const rentalHighlights = [
  'With-driver and self-drive options',
  'Local verified drivers for mountain routes',
  'Transparent per-day pricing with no hidden fees',
  'Pickup and drop from airport, hotel, or houseboat'
]

export default function CarRentals() {
  const navigate = useNavigate()
  const [rentalFleet, setRentalFleet] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const handleWhatsAppEnquiry = (car) => {
    const phoneNumber = '919999999999'
    const message = `Hi, I want to enquire about ${car.name} (${car.type}) for ${car.route}. Please share availability and final price.`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  useEffect(() => {
    const fetchCarRentals = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await carRentalAPI.getAll()
        setRentalFleet(data)
      } catch {
        setError('Failed to load car rentals')
        setRentalFleet([])
      } finally {
        setLoading(false)
      }
    }
    fetchCarRentals()
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title="Car Rentals in Kashmir - Reliable Local Cabs"
        description="Rent reliable cars with professional drivers in Kashmir. SUV, Tempo Travellers, and luxury cars available for Srinagar, Gulmarg, and Pahalgam sightseeing."
        url="https://habakhatoon.com/services/car-rentals"
      />

      {/* HERO SECTION */}
      <section className="bg-linear-to-r from-blue-950 via-blue-800 to-blue-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">

          <button
            onClick={() => navigate('/')}
            className="mb-6 text-sm bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition"
          >
            ← Back to Home
          </button>

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 border border-yellow-300/40 px-4 py-2 rounded-full text-yellow-300 text-xs font-bold tracking-widest mb-5">
                🚗 DRIVE & EXPLORE
              </div>

              <h1 className="text-4xl lg:text-6xl font-serif leading-tight mb-4">
                Pick Your <br />
                <span className="text-yellow-300">Perfect Ride.</span>
              </h1>

              <p className="text-gray-200 max-w-xl mb-6">
                From city drives to high-altitude routes, explore Kashmir with comfort and safety.
              </p>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => navigate('/alltrips')}
                  className="bg-yellow-300 text-blue-900 px-5 py-3 rounded-lg font-semibold hover:scale-105 transition"
                >
                  View Rental Packages
                </button>

                <button
                  onClick={() => navigate('/services/group-tour')}
                  className="border border-white px-5 py-3 rounded-lg hover:bg-white/10 transition"
                >
                  Plan Group Transfer
                </button>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="bg-white/10 border border-white/20 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-4">Rental Benefits</h3>

              <div className="space-y-3">
                {rentalHighlights.map((item) => (
                  <div key={item} className="flex gap-2 text-sm text-gray-200">
                    <span className="text-yellow-300">●</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* LIST SECTION */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-blue-800 tracking-widest mb-2">
              KASHMIR RENTAL FLEET
            </p>
            <h2 className="text-3xl font-semibold text-gray-800">
              Book Your Ride by Comfort, Group Size, and Route
            </h2>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {loading ? (
              <p className="col-span-full text-center text-gray-600 py-10">
                Loading car rentals...
              </p>
            ) : error ? (
              <p className="col-span-full text-center text-red-600 py-10">
                {error}
              </p>
            ) : rentalFleet.length > 0 ? (
              rentalFleet.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-xl overflow-hidden border shadow-md hover:shadow-lg hover:-translate-y-1 transition"
                >
                  <img
                    src={car.image}
                    alt={`${car.name} rental service in Kashmir`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-44 object-cover"
                  />

                  <div className="p-4">
                    <p className="text-xs font-bold text-gray-500 mb-1">
                      {car.type} • {car.route}
                    </p>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {car.name}
                    </h3>

                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm text-blue-700 font-semibold">
                        {car.seats}
                      </p>

                      <p className="font-bold text-gray-900">
                        ₹{car.price}
                      </p>
                    </div>

                    <button
                      onClick={() => handleWhatsAppEnquiry(car)}
                      className="w-full bg-linear-to-r from-blue-800 to-blue-600 text-white py-2 rounded-lg font-semibold hover:scale-105 transition"
                    >
                      WhatsApp Enquiry
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 py-10">
                No car rentals available
              </p>
            )}

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}