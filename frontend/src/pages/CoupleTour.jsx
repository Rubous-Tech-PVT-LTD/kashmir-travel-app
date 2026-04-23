import React from 'react'
import { useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import Footer from '../shared/Footer'

const romanticMoments = [
  {
    title: 'Private Shikara Sunset',
    detail: 'Glide across Dal Lake at golden hour with flowers, kahwa, and curated photo moments.'
  },
  {
    title: 'Cozy Premium Stays',
    detail: 'Handpicked boutique hotels and dreamy houseboat nights for intimate comfort.'
  },
  {
    title: 'Slow Travel Itinerary',
    detail: 'Less rush, more connection. Scenic pauses, candlelight dining, and hidden viewpoints.'
  }
]

const itinerary = [
  { day: 'Day 1', title: 'Arrival and Lakeside Evening', desc: 'Airport pickup, check-in, leisure time, then private shikara ride with sunset views.' },
  { day: 'Day 2', title: 'Gulmarg Romance Trail', desc: 'Gondola experience, mountain cafe stop, and a cinematic walk in alpine meadows.' },
  { day: 'Day 3', title: 'Pahalgam River Escape', desc: 'Riverbank brunch, pine valley drive, and couple portraits at scenic points.' },
  { day: 'Day 4', title: 'Heritage and Farewell', desc: 'Local craft stroll, saffron and kahwa tasting, airport drop with memory hamper.' }
]

export default function CoupleTour() {
  const navigate = useNavigate()

  return (
    <div className="bg-blue-50 min-h-screen">
      <SEO 
        title="Best Kashmir Honeymoon Packages"
        description="Book your romantic 4-day honeymoon tour to Kashmir. Private Shikara rides, cozy houseboat stays, and mountain magic for couples."
        url="https://habakhatoon.com/services/couple-tour"
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-br from-pink-900 via-pink-700 to-pink-500 text-white py-20 px-4">
        
        {/* Floating Blobs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-pink-300/40 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-yellow-200/30 blur-3xl animate-pulse"></div>

        <div className="max-w-6xl mx-auto">
          
          <button
            onClick={() => navigate('/')}
            className="mb-6 text-sm bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition"
          >
            ← Back to Home
          </button>

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            {/* LEFT */}
            <div className="space-y-5">
              <p className="text-xs tracking-widest text-pink-200 font-bold">
                ROMANTIC KASHMIR TRIP
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight max-w-xl">
                Book the Perfect Kashmir Honeymoon Package
              </h1>

              <p className="text-pink-100 max-w-lg">
                From candlelight dinners to private lakeside experiences, enjoy a cinematic romantic Kashmir trip crafted for love and mountain magic.
              </p>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => navigate('/alltrips?category=couple-tour')}
                  className="bg-pink-100 text-pink-900 px-5 py-3 rounded-lg font-semibold hover:scale-105 transition"
                >
                  Browse Couple Tour
                </button>

                <button className="border border-white px-5 py-3 rounded-lg hover:bg-white/10 transition">
                  Plan a Surprise Trip
                </button>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="bg-white/10 border border-white/30 backdrop-blur rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Signature Couple Experiences</h3>

              <div className="space-y-4">
                {romanticMoments.map((item) => (
                  <div key={item.title} className="border-b border-white/20 pb-3">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-pink-100">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ITINERARY */}
      <section className="max-w-6xl mx-auto py-14 px-4">

        <div className="text-center mb-8">
          <p className="text-xs tracking-widest text-pink-700 font-bold mb-2">
            SAMPLE COUPLE FLOW
          </p>
          <h2 className="text-3xl font-semibold text-pink-900">
            4-Day Romantic Itinerary
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {itinerary.map((plan, index) => (
            <div
              key={plan.day}
              className="bg-white border border-pink-200 rounded-xl shadow-md p-5"
            >
              <span
                className={`inline-block px-3 py-1 text-xs font-bold rounded-md mb-3 ${
                  index % 2 === 0 ? 'bg-pink-100 text-pink-900' : 'bg-yellow-100 text-yellow-900'
                }`}
              >
                {plan.day}
              </span>

              <h3 className="text-lg font-semibold text-pink-900 mb-2">
                {plan.title}
              </h3>

              <p className="text-sm text-gray-600">
                {plan.desc}
              </p>
            </div>
          ))}
        </div>

      </section>

      <Footer />
    </div>
  )
}