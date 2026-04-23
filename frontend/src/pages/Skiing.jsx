import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import Footer from '../shared/Footer'
import { activityAPI } from '../utils/api'

export default function Skiing() {
  const navigate = useNavigate()
  const [activityData, setActivityData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleReserveClick = (packageTitle) => {
    const message = encodeURIComponent(`Hi, I want to reserve ${packageTitle} for Skiing.`)
    const whatsappUrl = `https://wa.me/919149680276?text=${message}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    let mounted = true

    const loadActivity = async () => {
      setIsLoading(true)
      const data = await activityAPI.getBySlug('skiing')

      if (!mounted) return

      setActivityData(data)
      setIsLoading(false)
    }

    loadActivity()

    return () => {
      mounted = false
    }
  }, [])

  const skiHighlights = activityData?.skiHighlights || []
  const skiPackages = activityData?.skiPackages || []
  const seasonalMoments = activityData?.seasonalMoments || []
  const skiIncluded = activityData?.skiIncluded || []
  const skiPhases = activityData?.skiPhases || []

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
        Unable to load skiing details.
      </div>
    )
  }

  return (
    <div className="bg-[#f8fbff]">
      <SEO 
        title="Skiing in Gulmarg, Kashmir - Packages & Guides"
        description="Experience world-class skiing in Gulmarg. Professional guides, ski equipment rentals, and packages for beginners to advanced skiers in Kashmir."
        url="https://habakhatoon.com/activities/skiing"
        image="https://i.ibb.co/sdB5SrpM/skiing-snowboarding-600x440.jpg"
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#0f1823] via-[#1a3f5d] to-[#2980b9] text-white px-4 sm:px-6 py-14 sm:py-20">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute -right-24 -top-20 w-56 h-56 md:w-72 md:h-72 rounded-full bg-[radial-gradient(circle,rgba(120,210,250,0.44),transparent_70%)]"></div>
        <div className="pointer-events-none absolute -left-24 -bottom-24 w-60 h-60 md:w-80 md:h-80 rounded-full bg-[radial-gradient(circle,rgba(180,230,255,0.34),transparent_70%)]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <button
            onClick={() => navigate('/')}
            className="mb-6 px-4 py-2 border border-white/40 rounded-full text-sm hover:bg-white hover:text-black transition"
          >
            Back to Home
          </button>

          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* LEFT */}
            <div>
              <p className="text-xs tracking-widest text-[#a0d8ff] mb-3 uppercase">Kashmir Skiing</p>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4 max-w-3xl">Carve the Himalayan Slopes with Expert Guides and Pristine Powder Runs</h1>
              <p className="text-base sm:text-lg text-[#d8edf8] leading-relaxed mb-6 max-w-2xl">Experience world-class winter skiing across Kashmir's best alpine terrain—from gentle beginner slopes to challenging off-piste adventures.</p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/alltrips')}
                  className="bg-[#ffd79d] text-[#13263b] px-6 py-3 rounded-lg font-semibold hover:bg-[#ffe7c2] transition"
                >
                  View Kashmir Trips
                </button>
                <button
                  onClick={() => navigate('/services/group-tour')}
                  className="border border-white/40 px-6 py-3 rounded-lg hover:bg-white/10 transition"
                >
                  Plan Group Adventure
                </button>
              </div>
            </div>
            {/* RIGHT */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20 shadow-xl">
              <img
                src="https://i.ibb.co/sdB5SrpM/skiing-snowboarding-600x440.jpg"
                className="w-full h-48 sm:h-60 md:h-72 object-cover rounded-xl mb-4"
                alt="Skiing and snowboarding adventure on the slopes of Gulmarg, Kashmir"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {seasonalMoments.map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-lg p-3">
                    <p className="text-[11px] font-bold text-[#a0d8ff]">{item.label}</p>
                    <p className="text-sm text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-xs tracking-wider font-bold text-[#1a3f5d] mb-2 uppercase">Why Ski in Kashmir</p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-[#10263b]">A premier winter ski destination</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skiHighlights.map((item) => (
              <div key={item.title} className="bg-white p-5 rounded-xl border shadow hover:-translate-y-1 transition">
                <div className="w-11 h-11 bg-linear-to-br from-[#1a3f5d] to-[#2980b9] rounded-lg mb-3"></div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="bg-linear-to-b from-white to-[#f4fbff] p-6 rounded-2xl border shadow">
          <p className="text-xs font-bold text-[#1a3f5d] mb-2 uppercase">Complete Ski Package</p>
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Everything you need</h3>
          {skiIncluded.map((item) => (
            <div key={item} className="flex gap-2 mb-3 text-sm text-gray-600">
              <span>-</span>
              <p>{item}</p>
            </div>
          ))}
        </aside>
      </section>

      {/* PACKAGES */}
      <section className="bg-[#eef7fc] py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-[#1a3f5d] mb-2 uppercase">Ski Packages</p>
            <h2 className="text-2xl sm:text-3xl font-semibold">Choose your slope</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* ...existing code... */}
            {skiPackages.map((item, index) => {
              const pickText = (...values) => {
                for (const value of values) {
                  if (typeof value === 'number') return String(value)
                  if (typeof value !== 'string') continue
                  const text = value.replace(/[\u200B-\u200D\uFEFF]/g, '').trim()
                  if (text) return text
                }
                return ''
              }
              const levelText = pickText(item.level, item.terrain, item.type, 'All Levels')
              const titleText = pickText(item.title, item.name, item.duration, 'Ski Package')
              const descriptionText = pickText(item.description, item.note, item.includes, item.detail, 'Package details available')
              return (
                <div
                  key={`${item.level || item.terrain || item.title || item.name || 'ski-package'}-${index}`}
                  className="bg-white rounded-2xl border border-[#d8e6ef] shadow-lg p-5 flex flex-col justify-between min-h-65"
                >
                  <p className="mb-2 text-[#1a3f5d] tracking-wide text-xs font-bold">{levelText}</p>
                  <h3 className="mb-2 text-xl font-semibold text-[#10263b]">{titleText}</h3>
                  <p className="mb-4 text-[#4f667a] text-sm leading-relaxed flex-1">{descriptionText}</p>
                  <div className="flex justify-between items-center gap-3 mt-auto">
                    <span className="text-[#10263b] text-lg font-extrabold">{pickText(item.price, 'On Request')}</span>
                    <button
                      onClick={() => handleReserveClick(titleText)}
                      className="bg-[#1a3f5d] text-white px-4 py-2 rounded-lg hover:bg-[#163a5c] transition"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              )
            })}
            {/* ...existing code... */}
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold text-[#1a3f5d] mb-2 uppercase">Ski Day Flow</p>
          <h2 className="text-2xl sm:text-3xl mb-4">From start to finish</h2>
          <div className="space-y-4">
            {skiPhases.map((item) => (
              <div key={item.step} className="bg-white p-4 rounded-xl border">
                <p className="text-xs font-bold text-[#1a3f5d]">{item.step}</p>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-linear-to-br from-[#10263b] via-[#1a3f5d] to-[#2980b9] text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between">
          <img
            src="https://i.ibb.co/WNbLnVYX/OIP.webp"
            className="w-full h-44 sm:h-56 md:h-64 object-cover rounded-xl mb-4"
            alt="Skiing Adventure"
          />
          <p className="text-xs text-[#a0d8ff] font-bold">READY TO SKI</p>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Plan your winter adventure</h3>
          <p className="text-sm text-[#d8edf8] mb-4">Combine skiing with stays and other snow activities.</p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate('/alltrips')}
              className="bg-[#ffd79d] text-[#13263b] px-4 py-2 rounded-lg hover:bg-[#ffe7c2] transition"
            >
              Explore More Trips
            </button>
            <button
              onClick={() => navigate('/services/group-tour')}
              className="border border-white/40 px-4 py-2 rounded-lg hover:bg-white/10 transition"
            >
              Build Group Plan
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}