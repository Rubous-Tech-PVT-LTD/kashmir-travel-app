import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../shared/Footer'
import { hotelAPI } from '../utils/api'

export default function HouseboatStay() {
  const navigate = useNavigate()
  const [houseboatStays, setHouseboatStays] = useState([])
  const [isHouseboatsLoading, setIsHouseboatsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const fetchHouseboats = async () => {
      setIsHouseboatsLoading(true)
      const data = await hotelAPI.getHouseboats()

      if (!mounted) return

      setHouseboatStays(data)
      setIsHouseboatsLoading(false)
    }

    fetchHouseboats()
    return () => (mounted = false)
  }, [])

  const displayedHouseboats = useMemo(
    () => houseboatStays.filter((item) => !(item.name || '').toLowerCase().includes('kareem')),
    [houseboatStays]
  )

  return (
    <div className="bg-[#f8fbff]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#081525] via-[#163a56] to-[#3b6c8f] text-white py-20 px-6">
        
        {/* Glow */}
        <div className="absolute -right-24 -top-24 w-70 h-70 rounded-full bg-[radial-gradient(circle,rgba(143,209,255,0.4)_0%,transparent_70%)] animate-pulse" />
        <div className="absolute -left-24 -bottom-24 w-75 h-75 rounded-full bg-[radial-gradient(circle,rgba(255,211,159,0.34)_0%,transparent_70%)]" />

        <div className="max-w-6xl mx-auto">
          
          <button
            onClick={() => navigate('/')}
            className="mb-6 text-sm font-semibold hover:underline"
          >
            ← Back to Home
          </button>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            <div>
              <p className="text-xs tracking-widest text-blue-200 mb-3">
                DAL LAKE HOUSEBOAT STAY
              </p>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
                Houseboat Stay Crafted for Quiet Luxury
              </h1>

              <p className="text-blue-100 mb-6 max-w-xl">
                Stay on the water instead of beside it. Experience calm mornings,
                warm hospitality, and authentic Kashmiri vibes.
              </p>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => navigate('/services/hotel-booking')}
                  className="bg-[#ffd79f] text-[#10314b] px-5 py-2 rounded-lg font-semibold hover:opacity-90"
                >
                  Book a Houseboat
                </button>

                <button
                  onClick={() => navigate('/activities/shikara-ride')}
                  className="border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-black"
                >
                  Add Shikara Ride
                </button>
              </div>
            </div>

            {/* Image Card */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20 shadow-xl">
              <img
                src="https://picsum.photos/id/54/1200/800"
                className="w-full h-70 object-cover rounded-xl mb-4"
                alt=""
              />

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Check in', value: '1 PM' },
                  { label: 'Style', value: 'Couple / Family' },
                  { label: 'Season', value: 'Mar-Nov' }
                ].map((item) => (
                  <div key={item.label} className="bg-white/10 p-3 rounded-lg">
                    <p className="text-xs text-blue-200 font-bold">{item.label}</p>
                    <p className="text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-6">
        
        <div>
          <p className="text-xs font-bold tracking-widest text-blue-700 mb-2">
            WHY GUESTS CHOOSE IT
          </p>

          <h2 className="text-3xl font-bold mb-6">
            Floating boutique experience
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              'Private Deck Views',
              'Warm Hospitality',
              'Cultural Atmosphere'
            ].map((item) => (
              <div key={item} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="font-semibold">{item}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusion Panel */}
        <div className="bg-linear-to-b from-white to-blue-50 p-6 rounded-xl border shadow">
          <h3 className="text-xl font-semibold mb-4">Stay Inclusions</h3>

          <ul className="space-y-3 text-sm text-gray-600">
            {[
              'Welcome kahwa',
              'Boat transfer',
              'Dinner & breakfast',
              'Lake view seating'
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-blue-500">•</span> {item}
              </li>
            ))}
          </ul>
        </div>

      </section>

      {/* HOUSEBOATS LIST */}
      <section className="bg-blue-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Choose Your Stay</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedHouseboats.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow hover:shadow-lg transition">
                
                <img
                  src={item.image}
                  className="w-full h-44 object-cover rounded-t-xl"
                  alt=""
                />

                <div className="p-4">
                  <p className="text-xs text-blue-600 font-semibold">{item.location}</p>

                  <h3 className="text-lg font-bold">{item.name}</h3>

                  <p className="text-sm text-gray-500 mb-3">{item.nights}</p>

                  <div className="flex justify-between items-center">
                    <span className="font-bold">₹{item.price}</span>

                    <button
                      onClick={() => navigate('/services/hotel-booking')}
                      className="bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Reserve
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FLOW */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-6">

        <div>
          <h2 className="text-2xl font-bold mb-6">
            How the stay unfolds
          </h2>

          {[
            'Arrive at jetty',
            'Relax in cabin',
            'Evening shikara ride'
          ].map((step, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow mb-4">
              <p className="text-sm text-blue-600 font-bold">0{i + 1}</p>
              <h3 className="font-semibold">{step}</h3>
            </div>
          ))}
        </div>

        <div className="bg-linear-to-br from-[#10263b] to-[#2a6f92] text-white p-6 rounded-xl shadow">
          <img
            src="https://picsum.photos/id/54/1200/800"
            className="rounded-lg mb-4"
            alt=""
          />

          <h3 className="text-xl font-semibold mb-2">
            Plan Your Stay
          </h3>

          <p className="text-sm mb-4">
            Customize your stay with dates, guests, and preferences.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/all-hotels')}
              className="bg-[#ffd79f] text-black px-4 py-2 rounded-lg"
            >
              Browse Stays
            </button>

            <button
              onClick={() => navigate('/activities/shikara-ride')}
              className="border px-4 py-2 rounded-lg"
            >
              Add Ride
            </button>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  )
}