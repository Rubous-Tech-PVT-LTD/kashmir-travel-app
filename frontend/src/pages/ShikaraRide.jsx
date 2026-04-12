import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../shared/Footer'
import { activityAPI } from '../utils/api'

export default function ShikaraRide() {
  const navigate = useNavigate()
  const [activityData, setActivityData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const loadActivity = async () => {
      setIsLoading(true)
      const data = await activityAPI.getBySlug('shikara-ride')

      if (!mounted) return

      setActivityData(data)
      setIsLoading(false)
    }

    loadActivity()
    return () => (mounted = false)
  }, [])

  const rideHighlights = activityData?.rideHighlights || []
  const ridePackages = activityData?.ridePackages || []
  const rideMoments = activityData?.rideMoments || []
  const scenicStops = activityData?.scenicStops || []
  const shikaraPlanIdeas = activityData?.shikaraPlanIdeas || []

  if (isLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-[#10263b] font-semibold">
        Loading activity...
      </div>
    )
  }

  if (!activityData) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-[#10263b] font-semibold">
        Unable to load shikara ride details.
      </div>
    )
  }

  return (
    <div className="bg-[#f8fbff] min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#071b2c] via-[#0e3b57] to-[#1d7a8c] text-white px-6 py-20">

        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(132,227,255,0.42),transparent_70%)] animate-pulse" />
        <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(255,212,157,0.34),transparent_70%)]" />

        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="mb-6 px-4 py-2 border border-white/30 rounded-lg text-sm font-semibold hover:bg-white/10"
          >
            Back to Home
          </button>

          <div className="grid md:grid-cols-2 gap-8 items-center">

            {/* LEFT */}
            <div>
              <p className="text-xs tracking-widest text-[#a8e9ff] mb-3">
                DAL LAKE EXPERIENCE
              </p>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Shikara Ride Designed for Calm Water & Sunset Views
              </h1>

              <p className="text-[#d7f5ff] mb-6">
                Experience Srinagar through a peaceful lake journey with scenic stops and private ride options.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/alltrips')}
                  className="bg-[#ffd49d] text-[#10314b] px-5 py-2 rounded-lg font-semibold"
                >
                  View Kashmir Trips
                </button>

                <button
                  onClick={() => navigate('/services/hotel-booking')}
                  className="border border-white/40 px-5 py-2 rounded-lg font-semibold hover:bg-white/10"
                >
                  Pair With Stay
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="bg-white/10 border border-white/20 backdrop-blur rounded-2xl p-5 shadow-lg">
              <img
                src="https://picsum.photos/id/13/1200/800"
                className="w-full h-64 object-cover rounded-xl mb-4"
                alt="Shikara"
              />

              <div className="grid grid-cols-3 gap-3">
                {rideMoments.map((item) => (
                  <div key={item.label} className="bg-white/10 p-3 rounded-lg">
                    <p className="text-xs text-[#a8e9ff] font-bold">
                      {item.label}
                    </p>
                    <p className="text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-6">

        <div>
          <p className="text-xs font-bold text-[#0a6b84] mb-2">
            WHY THIS RIDE
          </p>

          <h2 className="text-3xl font-bold text-[#10263b] mb-6">
            A peaceful lake experience
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            {rideHighlights.map((item) => (
              <div key={item.title} className="bg-white border rounded-xl p-4 shadow hover:-translate-y-1 transition">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#0e6f8c] to-[#19b4d8] mb-3" />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SIDE PANEL */}
        <div className="bg-linear-to-b from-white to-[#f4fbff] border rounded-2xl p-5 shadow">
          <h3 className="text-xl font-semibold mb-4">
            What to Expect
          </h3>

          {scenicStops.map((stop) => (
            <p key={stop} className="text-sm text-gray-600 mb-2">
              • {stop}
            </p>
          ))}
        </div>

      </section>

      {/* PACKAGES */}
      <section className="bg-[#eef8fc] py-16 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-center text-3xl font-bold mb-8">
            Shikara Packages
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ridePackages.map((item, index) => (
              <div key={index} className="bg-white rounded-xl border shadow p-5">
                <p className="text-xs text-[#0a6b84] font-bold mb-2">
                  {item.time || item.duration || 'Flexible timing'}
                </p>

                <h3 className="text-lg font-semibold mb-1">
                  {item.title || 'Shikara Package'}
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  {item.description || 'Scenic Dal Lake experience'}
                </p>

                <div className="flex justify-between items-center">
                  <span className="font-bold">
                    {item.price || 'Contact'}
                  </span>

                  <button
                    onClick={() => navigate('/services/hotel-booking')}
                    className="bg-[#0f6f8a] text-white px-4 py-2 rounded-lg"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PLAN */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-6">

        <div>
          <h2 className="text-3xl font-bold mb-4">
            Add to your Kashmir plan
          </h2>

          <div className="space-y-3">
            {shikaraPlanIdeas.map((item) => (
              <div key={item} className="bg-white border rounded-lg p-3">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-linear-to-br from-[#10263b] via-[#184d66] to-[#0f8db2] text-white rounded-2xl p-6 shadow-lg">
          <img
            src="https://picsum.photos/id/13/1200/800"
            className="w-full h-60 object-cover rounded-xl mb-4"
            alt=""
          />

          <h3 className="text-xl font-semibold mb-3">
            Explore More Experiences
          </h3>

          <button
            onClick={() => navigate('/alltrips')}
            className="bg-[#ffd49d] text-[#10314b] px-5 py-2 rounded-lg font-semibold"
          >
            Explore Trips
          </button>
        </div>

      </section>

      <Footer />
    </div>
  )
}