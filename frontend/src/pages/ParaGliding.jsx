import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../shared/Footer'
import { activityAPI } from '../utils/api'

export default function ParaGliding() {
  const navigate = useNavigate()
  const [activityData, setActivityData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleReserveClick = (packageTitle) => {
    const message = encodeURIComponent(`Hi, I want to reserve ${packageTitle} for Paragliding.`)
    const whatsappUrl = `https://wa.me/919149680276?text=${message}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    let mounted = true

    const loadActivity = async () => {
      setIsLoading(true)
      const data = await activityAPI.getBySlug('paragliding')

      if (!mounted) return

      setActivityData(data)
      setIsLoading(false)
    }

    loadActivity()
    return () => (mounted = false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center font-semibold text-[#10263b]">
        Loading activity...
      </div>
    )
  }

  if (!activityData) {
    return (
      <div className="min-h-[60vh] grid place-items-center font-semibold text-[#10263b]">
        Unable to load paragliding details.
      </div>
    )
  }

  const {
    paraglideHighlights = [],
    flightPackages = [],
    flightMoments = [],
    flightGear = [],
    flightPhases = [],
  } = activityData

  return (
    <div className="bg-[#f8fbff]">

      {/* HERO */}
      <section className="relative overflow-hidden text-white py-20 px-6 bg-linear-to-br from-[#0a1929] via-[#1e5a8e] to-[#3b8bc9]">

        <div className="absolute w-72 h-72 -right-24 -top-20 rounded-full bg-[radial-gradient(circle,rgba(100,200,255,0.44),transparent)] animate-pulse"></div>
        <div className="absolute w-72 h-72 -left-24 -bottom-24 rounded-full bg-[radial-gradient(circle,rgba(200,220,255,0.34),transparent)]"></div>

        <div className="max-w-6xl mx-auto relative">
          <button
            onClick={() => navigate('/')}
            className="mb-6 text-sm font-semibold text-white/80 hover:text-white"
          >
            ← Back to Home
          </button>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs tracking-widest text-[#a8d5ff] mb-3">
                KASHMIR PARAGLIDING
              </p>

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Soar Above the Himalayas with World-Class Pilots
              </h1>

              <p className="text-[#d8edf8] mb-6">
                Experience Kashmir's most stunning aerial view with safe tandem paragliding.
              </p>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => navigate('/alltrips')}
                  className="bg-[#ffd79d] text-[#13263b] px-5 py-3 rounded-lg font-semibold"
                >
                  View Kashmir Trips
                </button>

                <button
                  onClick={() => navigate('/services/group-tour')}
                  className="border border-white/40 px-5 py-3 rounded-lg font-semibold"
                >
                  Plan Group Adventure
                </button>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur shadow-lg">
              <img
                src="https://i.ibb.co/6R8MzRkL/Paragliding-in-kashmir-1536x1075.webp"
                className="w-full h-72 object-cover rounded-xl mb-4"
                alt=""
              />

              <div className="grid grid-cols-3 gap-3">
                {flightMoments.map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-lg p-3">
                    <p className="text-xs text-[#a8d5ff] font-bold">{item.label}</p>
                    <p className="text-xs">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs text-[#1e5a8e] font-bold mb-2">WHY PARAGLIDE</p>
          <h2 className="text-2xl font-bold text-[#10263b] mb-4">
            Aerial adventure with certified pilots
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {paraglideHighlights.map((item) => (
              <div key={item.title} className="bg-white p-4 rounded-xl shadow hover:-translate-y-1 transition">
                <div className="w-10 h-10 bg-linear-to-br from-[#1e5a8e] to-[#3b8bc9] rounded-lg mb-3"></div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-4">Flight Safety Package</h3>
          {flightGear.map((item) => (
            <p key={item} className="text-sm text-gray-600 mb-2">• {item}</p>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section className="bg-[#eef7fc] py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#10263b]">
              Flight Packages
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {flightPackages.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-blue-100 shadow p-5"
              >
                <p className="text-xs text-[#1e5a8e] font-bold mb-2">
                  {item.time || item.duration || "Details"}
                </p>

                <h3 className="text-lg font-semibold mb-2">
                  {item.title || item.name || "Flight Package"}
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  {item.description || item.note || "Package details"}
                </p>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">
                    {item.price || "On Request"}
                  </span>

                  <button
                    onClick={() => handleReserveClick(item.title || item.name || 'Flight Package')}
                    className="bg-[#1e5a8e] text-white px-4 py-2 rounded-md hover:bg-[#17496f]"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Flight Flow</h2>

          {flightPhases.map((item) => (
            <div key={item.step} className="bg-white p-4 rounded-xl shadow mb-3">
              <p className="text-xs font-bold text-[#1e5a8e]">{item.step}</p>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-linear-to-br from-[#10263b] via-[#1e5a8e] to-[#3b8bc9] text-white rounded-2xl p-6">
          <img
            src="https://i.ibb.co/fdVrDNPB/OIP.webp"
            className="rounded-xl mb-4 h-64 w-full object-cover"
            alt=""
          />

          <h3 className="text-xl font-semibold mb-2">
            Ready to Take Flight?
          </h3>

          <p className="text-sm mb-4">
            Combine paragliding with your Kashmir trip.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/alltrips')}
              className="bg-[#ffd79d] text-[#13263b] px-4 py-2 rounded"
            >
              Explore Trips
            </button>

            <button
              onClick={() => navigate('/services/group-tour')}
              className="border border-white px-4 py-2 rounded"
            >
              Group Plan
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}