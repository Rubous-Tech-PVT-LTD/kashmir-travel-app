import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../shared/Footer'
import { activityAPI } from '../utils/api'
import {
  backButtonStyle,
  createPageShellStyle,
  createPrimaryButtonStyle,
  heroActionRowStyle,
  maxWidthContainerStyle,
  transparentCtaButtonStyle
} from '../ui/servicePageStyles'

const houseboatHighlights = [
  {
    title: 'Private Deck Views',
    detail: 'Wake up to glassy Dal Lake views, wooden interiors, and a calm private deck for slow mornings.'
  },
  {
    title: 'Warm Hospitality',
    detail: 'Personal hosts, home-style service, and local guidance that makes each stay feel personal and easy.'
  },
  {
    title: 'Cultural Atmosphere',
    detail: 'Carved wood details, Kashmiri decor, sunset tea service, and an authentic on-the-water experience.'
  }
]

const inclusions = [
  'Welcome kahwa and local snacks',
  'Private boat transfer from jetty',
  'Dinner and breakfast options',
  'Lake-facing sitting area',
  'Heater or blanket setup in colder months',
  'Concierge help for sightseeing and shikara rides'
]

const stayMoments = [
  {
    label: 'Check in',
    value: 'From 1:00 PM'
  },
  {
    label: 'Stay Style',
    value: 'Couple, family, or premium group'
  },
  {
    label: 'Ideal Season',
    value: 'March to November'
  }
]

const experienceSteps = [
  {
    step: '01',
    title: 'Arrive at the Jetty',
    desc: 'A boat transfer takes you to your houseboat with a warm welcome and quick check-in.'
  },
  {
    step: '02',
    title: 'Settle In and Unwind',
    desc: 'Enjoy your cabin, tea on the deck, and the quiet rhythm of lake life before sunset.'
  },
  {
    step: '03',
    title: 'Evening on the Water',
    desc: 'Pair the stay with a shikara ride, lakeside dinner, or a slow walk along the floating lanes.'
  }
]

export default function HouseboatStay() {
  const navigate = useNavigate()
  const [activityData, setActivityData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const loadActivity = async () => {
      setIsLoading(true)
      const data = await activityAPI.getBySlug('houseboat-stay')

      if (!mounted) {
        return
      }

      setActivityData(data)
      setIsLoading(false)
    }

    loadActivity()

    return () => {
      mounted = false
    }
  }, [])

  const houseboatStays = activityData?.houseboatStays || []
  const displayedHouseboats = useMemo(() => houseboatStays, [houseboatStays])

  if (isLoading) {
    return <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', color: '#10263b', fontWeight: 600 }}>Loading activity...</div>
  }

  if (!activityData) {
    return <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', color: '#10263b', fontWeight: 600 }}>Unable to load houseboat stay details.</div>
  }

  return (
    <div style={createPageShellStyle('#f8fbff')}>
      <style>{`
        .houseboat-glow {
          animation: houseboatFloat 6s ease-in-out infinite;
        }

        .houseboat-fade {
          opacity: 0;
          transform: translateY(16px);
          animation: houseboatFade 650ms ease forwards;
        }

        .houseboat-fade.delay-1 { animation-delay: 100ms; }
        .houseboat-fade.delay-2 { animation-delay: 220ms; }
        .houseboat-fade.delay-3 { animation-delay: 340ms; }

        .houseboat-card {
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .houseboat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 38px rgba(9, 31, 52, 0.12) !important;
        }

        @keyframes houseboatFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes houseboatFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 980px) {
          .houseboat-grid,
          .houseboat-hero-grid {
            grid-template-columns: 1fr !important;
          }

          .houseboat-title {
            font-size: 38px !important;
          }
        }
      `}</style>

      <section
        style={{
          background: 'linear-gradient(135deg, #081525 0%, #163a56 55%, #3b6c8f 100%)',
          color: '#fff',
          padding: '74px 24px 84px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          className="houseboat-glow"
          style={{
            position: 'absolute',
            right: '-100px',
            top: '-90px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(143, 209, 255, 0.4) 0%, rgba(143, 209, 255, 0) 72%)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '-90px',
            bottom: '-100px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 211, 159, 0.34) 0%, rgba(255, 211, 159, 0) 72%)'
          }}
        />

        <div style={maxWidthContainerStyle}>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{ ...backButtonStyle, marginBottom: '26px' }}
          >
            Back to Home
          </button>

          <div className="houseboat-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.16fr 0.84fr', gap: '28px', alignItems: 'center' }}>
            <div>
              <p className="houseboat-fade" style={{ letterSpacing: '1.8px', fontSize: '12px', marginBottom: '14px', color: '#b8e3ff' }}>
                DAL LAKE HOUSEBOAT STAY
              </p>
              <h1 className="houseboat-title houseboat-fade delay-1" style={{ fontSize: '58px', lineHeight: 1.08, margin: '0 0 18px', maxWidth: '720px' }}>
                Houseboat Stay Crafted for Quiet Luxury, Lake Views, and Slow Kashmiri Mornings
              </h1>
              <p className="houseboat-fade delay-2" style={{ fontSize: '17px', lineHeight: 1.75, color: '#d7ebf7', maxWidth: '660px', marginBottom: '28px' }}>
                Stay on the water instead of beside it. This page gives the houseboat experience its own identity with deck views,
                warm service, and a calmer rhythm than a standard hotel stay.
              </p>

              <div className="houseboat-fade delay-3" style={heroActionRowStyle}>
                <button
                  type="button"
                  onClick={() => navigate('/services/hotel-booking')}
                  style={createPrimaryButtonStyle('#ffd79f', '#10314b')}
                >
                  Book a Houseboat
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/activities/shikara-ride')}
                  style={transparentCtaButtonStyle}
                >
                  Add Shikara Ride
                </button>
              </div>
            </div>

            <div
              className="houseboat-fade delay-2"
              style={{
                borderRadius: '22px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)',
                border: '1px solid rgba(255,255,255,0.22)',
                padding: '20px',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 18px 40px rgba(0, 0, 0, 0.14)'
              }}
            >
              <img
                src="https://picsum.photos/id/54/1200/800"
                alt="Houseboat on Dal Lake"
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '16px', display: 'block', marginBottom: '16px' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px' }}>
                {stayMoments.map((item) => (
                  <div key={item.label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '14px', padding: '12px' }}>
                    <p style={{ margin: '0 0 6px', color: '#b8e3ff', fontSize: '11px', letterSpacing: '1px', fontWeight: 700 }}>{item.label}</p>
                    <p style={{ margin: 0, color: '#f7fcff', fontSize: '13px', lineHeight: 1.5 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1150px', margin: '0 auto', padding: '54px 24px 72px' }}>
        <div className="houseboat-grid" style={{ display: 'grid', gridTemplateColumns: '1.02fr 0.98fr', gap: '22px', alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: '22px' }}>
              <p style={{ color: '#2a6f92', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
                WHY GUESTS CHOOSE IT
              </p>
              <h2 style={{ margin: 0, fontSize: '34px', color: '#10263b' }}>A stay that feels like a floating boutique retreat</h2>
            </div>

            <div className="houseboat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
              {houseboatHighlights.map((item) => (
                <article
                  key={item.title}
                  className="houseboat-card"
                  style={{ background: '#fff', borderRadius: '16px', border: '1px solid #dfe7ef', boxShadow: '0 14px 32px rgba(10, 35, 58, 0.08)', padding: '18px' }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #2c6c8f, #57b0d8)', marginBottom: '14px' }} />
                  <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#12304c' }}>{item.title}</h3>
                  <p style={{ margin: 0, color: '#51667a', fontSize: '14px', lineHeight: 1.7 }}>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <aside
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #f4f9fc 100%)',
              borderRadius: '20px',
              border: '1px solid #dce6ef',
              boxShadow: '0 16px 36px rgba(10, 35, 58, 0.08)',
              padding: '22px'
            }}
          >
            <p style={{ color: '#2a6f92', letterSpacing: '1.2px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              STAY INCLUSIONS
            </p>
            <h3 style={{ margin: '0 0 18px', fontSize: '24px', color: '#10263b' }}>Everything set up for an easy arrival</h3>

            {inclusions.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
                <span style={{ color: '#0d8ca8', marginTop: '2px' }}>-</span>
                <p style={{ margin: 0, color: '#486074', fontSize: '14px', lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}

            <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid #e4eef5' }}>
              <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#6b859b', fontWeight: 700 }}>Best paired with</p>
              <p style={{ margin: 0, color: '#10263b', fontSize: '15px', lineHeight: 1.7 }}>
                A shikara ride at sunset, or a relaxed Kashmir trip that starts and ends in Srinagar.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section style={{ background: '#eef6fb', padding: '10px 24px 72px' }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <p style={{ color: '#2a6f92', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              HOUSEBOAT STAYS
            </p>
            <h2 style={{ margin: 0, fontSize: '34px', color: '#10263b' }}>Choose the level of comfort you want on the Dal Lake</h2>
          </div>

          <div className="houseboat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '18px' }}>
            {displayedHouseboats.map((item) => (
              <div
                key={item.title || item.name || item.duration}
                className="houseboat-card"
                style={{ background: '#fff', borderRadius: '18px', border: '1px solid #d8e6ef', boxShadow: '0 12px 28px rgba(10, 35, 58, 0.07)', padding: '20px' }}
              >
                <img
                  src={item.image || 'https://picsum.photos/id/54/1200/800'}
                  alt={item.title || item.name || 'Houseboat Stay'}
                  style={{ width: '100%', height: '170px', objectFit: 'cover', borderRadius: '12px', marginBottom: '12px' }}
                />
                <p style={{ margin: '0 0 10px', color: '#2a6f92', letterSpacing: '0.8px', fontSize: '12px', fontWeight: 700 }}>{item.location || 'Dal Lake, Srinagar'}</p>
                <h3 style={{ margin: '0 0 8px', fontSize: '22px', color: '#10263b' }}>{item.title || item.name || 'Houseboat Stay'}</h3>
                <p style={{ margin: '0 0 18px', color: '#4f667a', fontSize: '14px', lineHeight: 1.7 }}>{item.duration || item.nights || 'Flexible stay'}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#10263b', fontSize: '18px', fontWeight: 800 }}>{item.price || 'Contact for price'}</span>
                  <button
                    type="button"
                    onClick={() => navigate('/services/hotel-booking')}
                    style={{ ...createPrimaryButtonStyle('#2a6f92', '#fff'), padding: '10px 14px' }}
                  >
                    Reserve
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!isLoading && displayedHouseboats.length === 0 ? (
            <p style={{ textAlign: 'center', marginTop: '16px', color: '#486074' }}>No houseboat stays found.</p>
          ) : null}
        </div>
      </section>

      <section style={{ maxWidth: '1150px', margin: '0 auto', padding: '56px 24px 72px' }}>
        <div className="houseboat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
          <div>
            <p style={{ color: '#2a6f92', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              STAY FLOW
            </p>
            <h2 style={{ margin: '0 0 14px', fontSize: '32px', color: '#10263b' }}>How the houseboat experience usually unfolds</h2>

            <div style={{ display: 'grid', gap: '14px' }}>
              {experienceSteps.map((item) => (
                <div key={item.step} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #d9e6ef', padding: '16px' }}>
                  <p style={{ margin: '0 0 6px', color: '#2a6f92', fontSize: '12px', fontWeight: 800, letterSpacing: '1px' }}>{item.step}</p>
                  <h3 style={{ margin: '0 0 8px', fontSize: '20px', color: '#10263b' }}>{item.title}</h3>
                  <p style={{ margin: 0, color: '#4f667a', fontSize: '14px', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, #10263b 0%, #1e5878 55%, #2a6f92 100%)',
              borderRadius: '22px',
              padding: '24px',
              color: '#fff',
              boxShadow: '0 18px 40px rgba(8, 45, 71, 0.16)'
            }}
          >
            <img
              src="https://picsum.photos/id/54/1200/800"
              alt="Luxury houseboat interior"
              style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px', marginBottom: '18px', display: 'block' }}
            />
            <p style={{ margin: '0 0 8px', color: '#b8e3ff', letterSpacing: '1px', fontSize: '12px', fontWeight: 700 }}>PLAN YOUR STAY</p>
            <h3 style={{ margin: '0 0 12px', fontSize: '24px' }}>Houseboat Stay with a curated Srinagar itinerary</h3>
            <p style={{ margin: '0 0 18px', color: '#d8f1ff', fontSize: '14px', lineHeight: 1.8 }}>
              Tell us your check-in date, guest count, and whether you want a romantic setup, family room, or premium deck view.
            </p>
            <div style={heroActionRowStyle}>
              <button
                type="button"
                onClick={() => navigate('/all-hotels')}
                style={createPrimaryButtonStyle('#ffd79f', '#10314b')}
              >
                Browse Stays
              </button>
              <button
                type="button"
                onClick={() => navigate('/activities/shikara-ride')}
                style={transparentCtaButtonStyle}
              >
                Add Lake Ride
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
