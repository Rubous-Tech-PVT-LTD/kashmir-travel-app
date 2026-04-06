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

const gondolaHighlights = [
  {
    title: 'High-Altitude Views',
    detail: 'Soar above pine forests and snowfields with open vistas across Gulmarg valley.'
  },
  {
    title: 'Two-Phase Adventure',
    detail: 'Enjoy the Gulmarg to Kongdoori and Kongdoori to Apharwat sections for a complete mountain ride.'
  },
  {
    title: 'Seasonal Magic',
    detail: 'Fresh meadows in summer, bright skies in autumn, and deep snow scenes in winter.'
  }
]

const rideTiers = [
  {
    name: 'Phase 1 Ticket',
    duration: 'Gulmarg to Kongdoori',
    price: 'INR 899',
    note: 'Best for scenic views, beginners, and families'
  },
  {
    name: 'Phase 2 Ticket',
    duration: 'Kongdoori to Apharwat',
    price: 'INR 1,499',
    note: 'For higher altitude, snow cover, and sharper panoramas'
  },
  {
    name: 'Full Mountain Pass',
    duration: 'Complete return ride',
    price: 'INR 2,199',
    note: 'Ideal for a full experience with flexible stops'
  }
]

const gondolaMoments = [
  {
    label: 'Best Season',
    value: 'December to March for snow, April to October for greenery'
  },
  {
    label: 'Starting Point',
    value: 'Gulmarg base station'
  },
  {
    label: 'Travel Style',
    value: 'Family, couple, adventure, or photo-focused'
  }
]

const activityFlow = [
  {
    step: '01',
    title: 'Reach Gulmarg',
    desc: 'Travel to the base station, collect tickets, and prepare for a smooth boarding sequence.'
  },
  {
    step: '02',
    title: 'Ride Upward',
    desc: 'Take in valley views, tree lines, and changing terrain as the cabin climbs toward the ridge.'
  },
  {
    step: '03',
    title: 'Explore the Peaks',
    desc: 'Pause for photos, snow play, or a short walk before returning to Gulmarg.'
  }
]

const seasonalNotes = [
  'Snow gear is recommended in peak winter months',
  'Early booking helps on busy weekends and holiday periods',
  'Cloud cover can change the view, so keep some schedule flexibility'
]

export default function GondolaRide() {
  const navigate = useNavigate()

  return (
    <div style={createPageShellStyle('#f8fbff')}>
      <style>{`
        .gondola-glow {
          animation: gondolaFloat 6s ease-in-out infinite;
        }

        .gondola-fade {
          opacity: 0;
          transform: translateY(16px);
          animation: gondolaFade 650ms ease forwards;
        }

        .gondola-fade.delay-1 { animation-delay: 100ms; }
        .gondola-fade.delay-2 { animation-delay: 220ms; }
        .gondola-fade.delay-3 { animation-delay: 340ms; }

        .gondola-card {
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .gondola-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 38px rgba(12, 30, 55, 0.12) !important;
        }

        @keyframes gondolaFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes gondolaFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 980px) {
          .gondola-grid,
          .gondola-hero-grid {
            grid-template-columns: 1fr !important;
          }

          .gondola-title {
            font-size: 38px !important;
          }
        }
      `}</style>

      <section
        style={{
          background: 'linear-gradient(135deg, #08131f 0%, #1d3557 52%, #4f7ea8 100%)',
          color: '#fff',
          padding: '74px 24px 84px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          className="gondola-glow"
          style={{
            position: 'absolute',
            right: '-100px',
            top: '-80px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(176, 223, 255, 0.42) 0%, rgba(176, 223, 255, 0) 72%)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '-90px',
            bottom: '-90px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 217, 156, 0.32) 0%, rgba(255, 217, 156, 0) 72%)'
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

          <div className="gondola-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.18fr 0.82fr', gap: '28px', alignItems: 'center' }}>
            <div>
              <p className="gondola-fade" style={{ letterSpacing: '1.8px', fontSize: '12px', marginBottom: '14px', color: '#d0ebff' }}>
                GULMARG GONDOLA EXPERIENCE
              </p>
              <h1 className="gondola-title gondola-fade delay-1" style={{ fontSize: '58px', lineHeight: 1.08, margin: '0 0 18px', maxWidth: '720px' }}>
                Gondola Ride Designed for Alpine Views, Snow Peaks, and a True Mountain High
              </h1>
              <p className="gondola-fade delay-2" style={{ fontSize: '17px', lineHeight: 1.75, color: '#d8ecf8', maxWidth: '660px', marginBottom: '28px' }}>
                This page gives the Gulmarg gondola its own destination with ticket tiers, seasonal guidance, and a clean booking flow.
                It is built for travelers who want the mountain cable car experience to feel distinct and easy to plan.
              </p>

              <div className="gondola-fade delay-3" style={heroActionRowStyle}>
                <button
                  type="button"
                  onClick={() => navigate('/alltrips')}
                  style={createPrimaryButtonStyle('#ffd99d', '#13263b')}
                >
                  View Kashmir Trips
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/services/group-tour')}
                  style={transparentCtaButtonStyle}
                >
                  Plan Group Visit
                </button>
              </div>
            </div>

            <div
              className="gondola-fade delay-2"
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
                src="https://picsum.photos/id/29/1200/800"
                alt="Gondola above the mountains"
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '16px', display: 'block', marginBottom: '16px' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px' }}>
                {gondolaMoments.map((item) => (
                  <div key={item.label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '14px', padding: '12px' }}>
                    <p style={{ margin: '0 0 6px', color: '#d0ebff', fontSize: '11px', letterSpacing: '1px', fontWeight: 700 }}>{item.label}</p>
                    <p style={{ margin: 0, color: '#f7fcff', fontSize: '13px', lineHeight: 1.5 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1150px', margin: '0 auto', padding: '54px 24px 72px' }}>
        <div className="gondola-grid" style={{ display: 'grid', gridTemplateColumns: '1.02fr 0.98fr', gap: '22px', alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: '22px' }}>
              <p style={{ color: '#1d5c86', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
                WHY THIS RIDE IS SPECIAL
              </p>
              <h2 style={{ margin: 0, fontSize: '34px', color: '#10263b' }}>A mountain experience with a clear route and clear value</h2>
            </div>

            <div className="gondola-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
              {gondolaHighlights.map((item) => (
                <article
                  key={item.title}
                  className="gondola-card"
                  style={{ background: '#fff', borderRadius: '16px', border: '1px solid #dfeaf1', boxShadow: '0 14px 32px rgba(10, 35, 58, 0.08)', padding: '18px' }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #1d5c86, #6bb6e3)', marginBottom: '14px' }} />
                  <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#12304c' }}>{item.title}</h3>
                  <p style={{ margin: 0, color: '#51667a', fontSize: '14px', lineHeight: 1.7 }}>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <aside
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #f5f9fc 100%)',
              borderRadius: '20px',
              border: '1px solid #dce6ef',
              boxShadow: '0 16px 36px rgba(10, 35, 58, 0.08)',
              padding: '22px'
            }}
          >
            <p style={{ color: '#1d5c86', letterSpacing: '1.2px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              SEASONAL NOTES
            </p>
            <h3 style={{ margin: '0 0 18px', fontSize: '24px', color: '#10263b' }}>Plan for weather, crowds, and visibility</h3>

            {seasonalNotes.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
                <span style={{ color: '#1d5c86', marginTop: '2px' }}>-</span>
                <p style={{ margin: 0, color: '#486074', fontSize: '14px', lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}

            <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid #e4eef5' }}>
              <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#6b859b', fontWeight: 700 }}>Best for</p>
              <p style={{ margin: 0, color: '#10263b', fontSize: '15px', lineHeight: 1.7 }}>
                Family outings, snow trips, honeymoon add-ons, or a mountain day trip from Srinagar.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section style={{ background: '#eef5fb', padding: '10px 24px 72px' }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <p style={{ color: '#1d5c86', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              GONDOLA TICKETS
            </p>
            <h2 style={{ margin: 0, fontSize: '34px', color: '#10263b' }}>Pick the phase that matches your pace</h2>
          </div>

          <div className="gondola-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '18px' }}>
            {rideTiers.map((item) => (
              <div
                key={item.name}
                className="gondola-card"
                style={{ background: '#fff', borderRadius: '18px', border: '1px solid #d8e6ef', boxShadow: '0 12px 28px rgba(10, 35, 58, 0.07)', padding: '20px' }}
              >
                <p style={{ margin: '0 0 10px', color: '#1d5c86', letterSpacing: '0.8px', fontSize: '12px', fontWeight: 700 }}>{item.duration}</p>
                <h3 style={{ margin: '0 0 8px', fontSize: '22px', color: '#10263b' }}>{item.name}</h3>
                <p style={{ margin: '0 0 18px', color: '#4f667a', fontSize: '14px', lineHeight: 1.7 }}>{item.note}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#10263b', fontSize: '18px', fontWeight: 800 }}>{item.price}</span>
                  <button
                    type="button"
                    onClick={() => navigate('/services/hotel-booking')}
                    style={{ ...createPrimaryButtonStyle('#1d5c86', '#fff'), padding: '10px 14px' }}
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
        <div className="gondola-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
          <div>
            <p style={{ color: '#1d5c86', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              HOW THE RIDE FLOWS
            </p>
            <h2 style={{ margin: '0 0 14px', fontSize: '32px', color: '#10263b' }}>Three clear steps from base station to ridge</h2>

            <div style={{ display: 'grid', gap: '14px' }}>
              {activityFlow.map((item) => (
                <div key={item.step} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #d9e6ef', padding: '16px' }}>
                  <p style={{ margin: '0 0 6px', color: '#1d5c86', fontSize: '12px', fontWeight: 800, letterSpacing: '1px' }}>{item.step}</p>
                  <h3 style={{ margin: '0 0 8px', fontSize: '20px', color: '#10263b' }}>{item.title}</h3>
                  <p style={{ margin: 0, color: '#4f667a', fontSize: '14px', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, #10263b 0%, #19486a 55%, #1d5c86 100%)',
              borderRadius: '22px',
              padding: '24px',
              color: '#fff',
              boxShadow: '0 18px 40px rgba(8, 45, 71, 0.16)'
            }}
          >
            <img
              src="https://picsum.photos/id/29/1200/800"
              alt="Mountain panorama"
              style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px', marginBottom: '18px', display: 'block' }}
            />
            <p style={{ margin: '0 0 8px', color: '#d0ebff', letterSpacing: '1px', fontSize: '12px', fontWeight: 700 }}>READY TO PLAN</p>
            <h3 style={{ margin: '0 0 12px', fontSize: '24px' }}>Gondola Ride with a curated Gulmarg day plan</h3>
            <p style={{ margin: '0 0 18px', color: '#d8ecf8', fontSize: '14px', lineHeight: 1.8 }}>
              Tell us your ride phase, season, and guest count. We can combine the gondola with a city transfer, hotel, or group outing.
            </p>
            <div style={heroActionRowStyle}>
              <button
                type="button"
                onClick={() => navigate('/alltrips')}
                style={createPrimaryButtonStyle('#ffd99d', '#13263b')}
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