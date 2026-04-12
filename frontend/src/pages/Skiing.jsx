import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../shared/Footer'
import { activityAPI } from '../utils/api'

export default function Skiing() {
  const navigate = useNavigate()
  const [activityData, setActivityData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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

      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#0f1823] via-[#1a3f5d] to-[#2980b9] text-white px-6 py-20">
        
        {/* Glow Effects */}
        <div className="absolute -right-24 -top-20 w-70 h-70 rounded-full bg-[radial-gradient(circle,rgba(120,210,250,0.44),transparent_70%)]"></div>
        <div className="absolute -left-24 -bottom-24 w-75] h-75 rounded-full bg-[radial-gradient(circle,rgba(180,230,255,0.34),transparent_70%)]"></div>

        <div className="max-w-287.5 mx-auto">
          
          <button
            onClick={() => navigate('/')}
            className="mb-6 px-4 py-2 border border-white/40 rounded-full text-sm hover:bg-white hover:text-black transition"
          >
            Back to Home
          </button>

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            {/* LEFT */}
            <div>
              <p className="text-xs tracking-[1.8px] text-[#a0d8ff] mb-3">
                KASHMIR SKIING
              </p>

              <h1 className="text-4xl lg:text-6xl leading-tight mb-4 max-w-180">
                Carve the Himalayan Slopes with Expert Guides and Pristine Powder Runs
              </h1>

              <p className="text-base lg:text-lg text-[#d8edf8] leading-relaxed mb-6 max-w-165">
                Experience world-class winter skiing across Kashmir's best alpine terrain—from gentle beginner slopes to challenging off-piste adventures.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/alltrips')}
                  className="bg-[#ffd79d] text-[#13263b] px-6 py-3 rounded-lg font-semibold"
                >
                  View Kashmir Trips
                </button>

                <button
                  onClick={() => navigate('/services/group-tour')}
                  className="border border-white/40 px-6 py-3 rounded-lg"
                >
                  Plan Group Adventure
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20 shadow-xl">
              <img
                src="https://picsum.photos/id/29/1200/800"
                className="w-full h-75 object-cover rounded-xl mb-4"
              />

              <div className="grid grid-cols-3 gap-2">
                {seasonalMoments.map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-lg p-3">
                    <p className="text-[11px] font-bold text-[#a0d8ff]">
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
      <section className="max-w-287.5 mx-auto px-6 py-16 grid lg:grid-cols-2 gap-6">

        <div>
          <p className="text-xs tracking-wider font-bold text-[#1a3f5d] mb-2">
            WHY SKI IN KASHMIR
          </p>

          <h2 className="text-3xl font-semibold mb-6 text-[#10263b]">
            A premier winter ski destination
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
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
          <p className="text-xs font-bold text-[#1a3f5d] mb-2">
            COMPLETE SKI PACKAGE
          </p>

          <h3 className="text-xl font-semibold mb-4">
            Everything you need
          </h3>

          {skiIncluded.map((item) => (
            <div key={item} className="flex gap-2 mb-3 text-sm text-gray-600">
              <span>-</span>
              <p>{item}</p>
            </div>
          ))}
        </aside>
      </section>

      {/* PACKAGES */}
      <section className="bg-[#eef7fc] py-16 px-6">
        <div className="max-w-287.5 mx-auto">
          
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-[#1a3f5d] mb-2">
              SKI PACKAGES
            </p>
            <h2 className="text-3xl font-semibold">
              Choose your slope
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {skiPackages.map((item) => (
              <div key={item.name} className="bg-white p-5 rounded-xl border shadow hover:-translate-y-1 transition">
                
                <p className="text-xs font-bold text-[#1a3f5d]">
                  {item.terrain}
                </p>

                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.note}</p>

                <div className="flex justify-between items-center">
                  <span className="font-bold">{item.price}</span>
                  <button
                    onClick={() => navigate('/services/hotel-booking')}
                    className="bg-[#1a3f5d] text-white px-4 py-2 rounded-lg"
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
      <section className="max-w-287.5 mx-auto px-6 py-16 grid lg:grid-cols-2 gap-6">

        <div>
          <p className="text-xs font-bold text-[#1a3f5d] mb-2">
            SKI DAY FLOW
          </p>

          <h2 className="text-3xl mb-4">
            From start to finish
          </h2>

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

        <div className="bg-linear-to-br from-[#10263b] via-[#1a3f5d] to-[#2980b9] text-white p-6 rounded-2xl shadow-xl">
          
          <img
            src="https://picsum.photos/id/29/1200/800"
            className="w-full h-62.5 object-cover rounded-xl mb-4"
          />

          <p className="text-xs text-[#a0d8ff] font-bold">
            READY TO SKI
          </p>

          <h3 className="text-xl font-semibold mb-2">
            Plan your winter adventure
          </h3>

          <p className="text-sm text-[#d8edf8] mb-4">
            Combine skiing with stays and other snow activities.
          </p>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate('/alltrips')}
              className="bg-[#ffd79d] text-[#13263b] px-4 py-2 rounded-lg"
            >
              Explore More Trips
            </button>

            <button
              onClick={() => navigate('/services/group-tour')}
              className="border border-white/40 px-4 py-2 rounded-lg"
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