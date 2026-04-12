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

    return () => {
      mounted = false
    }
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
        
        {/* Glow circles */}
        <div className="absolute -top-20 -right-20 w-65 h-65 rounded-full bg-[radial-gradient(circle,rgba(132,227,255,0.42),transparent_70%)] animate-pulse" />
        <div className="absolute -bottom-24 -left-20 w-75 h-75 rounded-full bg-[radial-gradient(circle,rgba(255,212,157,0.34),transparent_70%)]" />

        <div className="max-w-287.5 mx-auto">
          <button
            onClick={() => navigate('/')}
            className="mb-6 px-4 py-2 border border-white/30 rounded-lg text-sm font-semibold hover:bg-white/10 transition"
          >
            Back to Home
          </button>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* LEFT */}
            <div>
              <p className="text-xs tracking-[2px] text-[#a8e9ff] mb-3">
                DAL LAKE EXPERIENCE
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 max-w-175">
                Shikara Ride Designed for Calm Water, Sunset Views, and Kashmir's Slow Beauty
              </h1>

              <p className="text-[#d7f5ff] leading-relaxed mb-6 max-w-162.5">
                This page focuses on the iconic lake journey itself. Pick a private or family-friendly ride, add local touches,
                and enjoy a softer, more scenic way to experience Srinagar.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/alltrips')}
                  className="bg-[#ffd49d] text-[#10314b] px-5 py-2.5 rounded-lg font-semibold"
                >
                  View Kashmir Trips
                </button>

                <button
                  onClick={() => navigate('/services/hotel-booking')}
                  className="border border-white/40 px-5 py-2.5 rounded-lg font-semibold hover:bg-white/10"
                >
                  Pair With Stay
                </button>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="bg-white/10 border border-white/20 backdrop-blur rounded-2xl p-5 shadow-lg">
              <img
                src="https://picsum.photos/id/13/1200/800"
                alt="Shikara"
                className="w-full h-75 object-cover rounded-xl mb-4"
              />

              <div className="grid grid-cols-3 gap-3">
                {rideMoments.map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-xl p-3">
                    <p className="text-[11px] text-[#a8e9ff] font-bold">
                      {item.label}
                    </p>
                    <p className="text-sm text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="max-w-287.5 mx-auto px-6 py-16 grid md:grid-cols-2 gap-6">
        
        <div>
          <p className="text-xs font-bold text-[#0a6b84] mb-2 tracking-wider">
            WHY THIS RIDE STANDS OUT
          </p>

          <h2 className="text-3xl font-bold text-[#10263b] mb-6">
            A page built around the lake, not just a dropdown item
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {rideHighlights.map((item) => (
              <div key={item.title} className="bg-white border rounded-xl p-4 shadow-sm hover:-translate-y-1 transition">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#0e6f8c] to-[#19b4d8] mb-3" />
                <h3 className="font-semibold text-[#12304c]">{item.title}</h3>
                <p className="text-sm text-[#51667a]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SIDE PANEL */}
        <div className="bg-linear-to-b from-white to-[#f4fbff] border rounded-2xl p-5 shadow">
          <p className="text-xs font-bold text-[#0a6b84] mb-2">WHAT TO EXPECT</p>
          <h3 className="text-xl font-semibold text-[#10263b] mb-4">
            Simple, scenic, and easy to book
          </h3>

          {scenicStops.map((stop) => (
            <div key={stop} className="flex gap-2 mb-3">
              <span className="text-[#0ea5c0]">•</span>
              <p className="text-sm text-[#486074]">{stop}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section className="bg-[#eef8fc] py-16 px-6">
        <div className="max-w-287.5 mx-auto text-center mb-8">
          <p className="text-xs font-bold text-[#0a6b84]">SHIKARA PACKAGES</p>
          <h2 className="text-3xl font-bold text-[#10263b]">
            Choose the ride length that fits your pace
          </h2>
        </div>

        <div className="max-w-287.5 mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {ridePackages.map((item) => (
            <div key={item.name} className="bg-white border rounded-xl p-5 shadow hover:-translate-y-1 transition">
              <p className="text-xs text-[#0a6b84] font-bold">{item.duration}</p>
              <h3 className="text-xl font-semibold text-[#10263b]">{item.name}</h3>
              <p className="text-sm text-[#4f667a] mb-4">{item.note}</p>

              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">{item.price}</span>
                <button
                  onClick={() => navigate('/services/hotel-booking')}
                  className="bg-[#0f6f8a] text-white px-4 py-2 rounded-lg text-sm"
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PLAN SECTION */}
      <section className="max-w-287.5 mx-auto px-6 py-16 grid md:grid-cols-2 gap-6">
        
        <div>
          <h2 className="text-3xl font-bold text-[#10263b] mb-4">
            Add this ride to a wider Kashmir day plan
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
            className="w-full h-62.5 object-cover rounded-xl mb-4"
          />

          <h3 className="text-xl font-semibold mb-3">
            Shikara Ride with a curated Kashmir itinerary
          </h3>

          <button
            onClick={() => navigate('/alltrips')}
            className="bg-[#ffd49d] text-[#10314b] px-5 py-2 rounded-lg font-semibold"
          >
            Explore More Trips
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}