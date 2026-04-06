import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../shared/Footer'
import {
  backButtonStyle,
  createPageShellStyle,
  createPrimaryButtonStyle,
  heroActionRowStyle,
  maxWidthContainerStyle,
  transparentCtaButtonStyle
} from '../ui/servicePageStyles'

const rideHighlights = [
  {
    title: 'Golden Hour Cruising',
    detail: 'Private Dal Lake and Nigeen Lake rides timed for sunset light, calm water, and better photography.'
  },
  {
    title: 'Local Host Service',
    detail: 'Experienced rowers, cultural storytellers, and route guidance for a smooth lake experience.'
  },
  {
    title: 'Add-On Experiences',
    detail: 'Kahwa tasting, floating market stops, flower garlands, and houseboat pickup on request.'
  }
]

const ridePackages = [
  {
    name: 'Sunset Ride',
    duration: '45-60 mins',
    price: 'INR 1,499',
    note: 'Best for first-time visitors and photo sessions'
  },
  {
    name: 'Private Couple Cruise',
    duration: '75 mins',
    price: 'INR 2,499',
    note: 'Flowers, kahwa, and a quiet premium route'
  },
  {
    name: 'Family Lake Experience',
    duration: '90 mins',
    price: 'INR 3,499',
    note: 'Spacious ride with flexible stops for all ages'
  }
]

const rideMoments = [
  {
    label: 'Best Time',
    value: '6:00 AM to 7:30 PM'
  },
  {
    label: 'Pickup',
    value: 'Houseboat, hotel, or lakefront jetty'
  },
  {
    label: 'Add-ons',
    value: 'Kahwa, flowers, musicians, and photography'
  }
]

const scenicStops = [
  'Dal Lake boulevard',
  'Nigeen Lake quieter routes',
  'Floating vegetable market area',
  'Royal houseboat lanes'
]

export default function ShikaraRide() {
  const navigate = useNavigate()

  return (
    <div style={createPageShellStyle('#f8fbff')}>
      <style>{`
        .shikara-sheen {
          animation: shikaraFloat 6s ease-in-out infinite;
        }

        .shikara-fade {
          opacity: 0;
          transform: translateY(16px);
          animation: shikaraFade 650ms ease forwards;
        }

        .shikara-fade.delay-1 { animation-delay: 100ms; }
        .shikara-fade.delay-2 { animation-delay: 220ms; }
        .shikara-fade.delay-3 { animation-delay: 340ms; }

        .shikara-card {
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .shikara-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 38px rgba(8, 45, 71, 0.12) !important;
        }

        @keyframes shikaraFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shikaraFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 980px) {
          .shikara-grid,
          .shikara-hero-grid {
            grid-template-columns: 1fr !important;
          }

          .shikara-title {
            font-size: 38px !important;
          }
        }
      `}</style>

      <section
        style={{
          background: 'linear-gradient(135deg, #071b2c 0%, #0e3b57 55%, #1d7a8c 100%)',
          color: '#fff',
          padding: '74px 24px 82px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          className="shikara-sheen"
          style={{
            position: 'absolute',
            right: '-90px',
            top: '-70px',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(132, 227, 255, 0.42) 0%, rgba(132, 227, 255, 0) 72%)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '-80px',
            bottom: '-90px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 212, 157, 0.34) 0%, rgba(255, 212, 157, 0) 72%)'
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

          <div className="shikara-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.18fr 0.82fr', gap: '28px', alignItems: 'center' }}>
            <div>
              <p className="shikara-fade" style={{ letterSpacing: '1.8px', fontSize: '12px', marginBottom: '14px', color: '#a8e9ff' }}>
                DAL LAKE EXPERIENCE
              </p>
              <h1 className="shikara-title shikara-fade delay-1" style={{ fontSize: '58px', lineHeight: 1.08, margin: '0 0 18px', maxWidth: '700px' }}>
                Shikara Ride Designed for Calm Water, Sunset Views, and Kashmir's Slow Beauty
              </h1>
              <p className="shikara-fade delay-2" style={{ fontSize: '17px', lineHeight: 1.7, color: '#d7f5ff', maxWidth: '650px', marginBottom: '28px' }}>
                This page focuses on the iconic lake journey itself. Pick a private or family-friendly ride, add local touches,
                and enjoy a softer, more scenic way to experience Srinagar.
              </p>

              <div className="shikara-fade delay-3" style={heroActionRowStyle}>
                <button
                  type="button"
                  onClick={() => navigate('/alltrips')}
                  style={createPrimaryButtonStyle('#ffd49d', '#10314b')}
                >
                  View Kashmir Trips
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/services/hotel-booking')}
                  style={transparentCtaButtonStyle}
                >
                  Pair With Stay
                </button>
              </div>
            </div>

            <div
              className="shikara-fade delay-2"
              style={{
                borderRadius: '22px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
                border: '1px solid rgba(255,255,255,0.22)',
                padding: '20px',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 18px 40px rgba(0, 0, 0, 0.14)'
              }}
            >
              <img
                src="https://picsum.photos/id/13/1200/800"
                alt="Shikara on Dal Lake"
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '16px', display: 'block', marginBottom: '16px' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px' }}>
                {rideMoments.map((item) => (
                  <div key={item.label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '14px', padding: '12px' }}>
                    <p style={{ margin: '0 0 6px', color: '#a8e9ff', fontSize: '11px', letterSpacing: '1px', fontWeight: 700 }}>{item.label}</p>
                    <p style={{ margin: 0, color: '#f7fcff', fontSize: '13px', lineHeight: 1.5 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1150px', margin: '0 auto', padding: '54px 24px 72px' }}>
        <div className="shikara-grid" style={{ display: 'grid', gridTemplateColumns: '1.02fr 0.98fr', gap: '22px', alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: '22px' }}>
              <p style={{ color: '#0a6b84', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
                WHY THIS RIDE STANDS OUT
              </p>
              <h2 style={{ margin: 0, fontSize: '34px', color: '#10263b' }}>A page built around the lake, not just a dropdown item</h2>
            </div>

            <div className="shikara-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
              {rideHighlights.map((item) => (
                <article
                  key={item.title}
                  className="shikara-card"
                  style={{ background: '#fff', borderRadius: '16px', border: '1px solid #dfeaf1', boxShadow: '0 14px 32px rgba(10, 35, 58, 0.08)', padding: '18px' }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #0e6f8c, #19b4d8)', marginBottom: '14px' }} />
                  <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#12304c' }}>{item.title}</h3>
                  <p style={{ margin: 0, color: '#51667a', fontSize: '14px', lineHeight: 1.7 }}>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <aside
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #f4fbff 100%)',
              borderRadius: '20px',
              border: '1px solid #dce9f2',
              boxShadow: '0 16px 36px rgba(10, 35, 58, 0.08)',
              padding: '22px'
            }}
          >
            <p style={{ color: '#0a6b84', letterSpacing: '1.2px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              WHAT TO EXPECT
            </p>
            <h3 style={{ margin: '0 0 18px', fontSize: '24px', color: '#10263b' }}>Simple, scenic, and easy to book</h3>

            {scenicStops.map((stop) => (
              <div key={stop} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
                <span style={{ color: '#0ea5c0', marginTop: '2px' }}>-</span>
                <p style={{ margin: 0, color: '#486074', fontSize: '14px', lineHeight: 1.6 }}>{stop}</p>
              </div>
            ))}

            <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid #e4eef5' }}>
              <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#6b859b', fontWeight: 700 }}>Recommended booking style</p>
              <p style={{ margin: 0, color: '#10263b', fontSize: '15px', lineHeight: 1.7 }}>
                Pair the ride with a Srinagar hotel or houseboat stay so pickup and return stay seamless.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section style={{ background: '#eef8fc', padding: '10px 24px 72px' }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <p style={{ color: '#0a6b84', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              SHIKARA PACKAGES
            </p>
            <h2 style={{ margin: 0, fontSize: '34px', color: '#10263b' }}>Choose the ride length that fits your pace</h2>
          </div>

          <div className="shikara-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '18px' }}>
            {ridePackages.map((item) => (
              <div
                key={item.name}
                className="shikara-card"
                style={{ background: '#fff', borderRadius: '18px', border: '1px solid #d8e6ef', boxShadow: '0 12px 28px rgba(10, 35, 58, 0.07)', padding: '20px' }}
              >
                <p style={{ margin: '0 0 10px', color: '#0a6b84', letterSpacing: '0.8px', fontSize: '12px', fontWeight: 700 }}>{item.duration}</p>
                <h3 style={{ margin: '0 0 8px', fontSize: '22px', color: '#10263b' }}>{item.name}</h3>
                <p style={{ margin: '0 0 18px', color: '#4f667a', fontSize: '14px', lineHeight: 1.7 }}>{item.note}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#10263b', fontSize: '18px', fontWeight: 800 }}>{item.price}</span>
                  <button
                    type="button"
                    onClick={() => navigate('/services/hotel-booking')}
                    style={{ ...createPrimaryButtonStyle('#0f6f8a', '#fff'), padding: '10px 14px' }}
                  >
                    Reserve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1150px', margin: '0 auto', padding: '56px 24px 72px' }}>
        <div className="shikara-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#0a6b84', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              MAP THE EXPERIENCE
            </p>
            <h2 style={{ margin: '0 0 14px', fontSize: '32px', color: '#10263b' }}>Add this ride to a wider Kashmir day plan</h2>
            <p style={{ margin: '0 0 22px', color: '#4f667a', fontSize: '15px', lineHeight: 1.8 }}>
              Use the shikara ride as a calm opening or closing activity for Srinagar, then continue into gardens,
              markets, or a lakeside dinner.
            </p>

            <div style={{ display: 'grid', gap: '12px' }}>
              {['Morning lake cruise and city sightseeing', 'Sunset shikara followed by dinner', 'Private couple package with houseboat stay'].map((item) => (
                <div key={item} style={{ background: '#fff', borderRadius: '14px', border: '1px solid #d9e6ef', padding: '14px 16px', color: '#31485d' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, #10263b 0%, #184d66 55%, #0f8db2 100%)',
              borderRadius: '22px',
              padding: '24px',
              color: '#fff',
              boxShadow: '0 18px 40px rgba(8, 45, 71, 0.16)'
            }}
          >
            <img
              src="https://picsum.photos/id/13/1200/800"
              alt="Kashmir lake view"
              style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px', marginBottom: '18px', display: 'block' }}
            />
            <p style={{ margin: '0 0 8px', color: '#a8e9ff', letterSpacing: '1px', fontSize: '12px', fontWeight: 700 }}>READY TO BOOK</p>
            <h3 style={{ margin: '0 0 12px', fontSize: '24px' }}>Shikara Ride with a curated Kashmir itinerary</h3>
            <p style={{ margin: '0 0 18px', color: '#d8f4ff', fontSize: '14px', lineHeight: 1.8 }}>
              Tell us your preferred time, number of guests, and whether you want a private, romantic, or family setup.
            </p>
            <div style={heroActionRowStyle}>
              <button
                type="button"
                onClick={() => navigate('/alltrips')}
                style={createPrimaryButtonStyle('#ffd49d', '#10314b')}
              >
                Explore More Trips
              </button>
              <button
                type="button"
                onClick={() => navigate('/services/group-tour')}
                style={transparentCtaButtonStyle}
              >
                Build Group Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
