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
} from '../shared/servicePageStyles'

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
    <div style={createPageShellStyle('#f8fbff')}>
      <style>{`
        .couple-float {
          animation: coupleFloat 6s ease-in-out infinite;
        }

        .couple-reveal {
          opacity: 0;
          transform: translateY(16px);
          animation: coupleReveal 650ms ease forwards;
        }

        .couple-reveal.delay-1 { animation-delay: 100ms; }
        .couple-reveal.delay-2 { animation-delay: 220ms; }
        .couple-reveal.delay-3 { animation-delay: 340ms; }

        @keyframes coupleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes coupleReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 960px) {
          .couple-grid {
            grid-template-columns: 1fr !important;
          }

          .couple-title {
            font-size: 36px !important;
          }
        }
      `}</style>

      <section
        style={{
          background: 'linear-gradient(135deg, #3a0f2b 0%, #7b1e57 45%, #d63384 100%)',
          color: '#fff',
          padding: '74px 24px 86px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          className="couple-float"
          style={{
            position: 'absolute',
            left: '-90px',
            top: '-80px',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,192,203,0.44) 0%, rgba(255,192,203,0) 72%)'
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: '-70px',
            bottom: '-85px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,243,176,0.35) 0%, rgba(255,243,176,0) 72%)'
          }}
        />

        <div style={maxWidthContainerStyle}>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={backButtonStyle}
          >
            ← Back to Home
          </button>

          <div className="couple-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '30px', alignItems: 'center' }}>
            <div>
              <p className="couple-reveal" style={{ letterSpacing: '1.8px', fontSize: '12px', marginBottom: '14px', color: '#ffd6e8' }}>
                ROMANTIC KASHMIR EDITION
              </p>

              <h1 className="couple-title couple-reveal delay-1" style={{ fontSize: '54px', lineHeight: 1.1, margin: '0 0 18px', maxWidth: '640px' }}>
                Couple Tour Crafted for Love, Slow Moments, and Mountain Magic
              </h1>

              <p className="couple-reveal delay-2" style={{ fontSize: '17px', lineHeight: 1.7, color: '#ffe4ef', maxWidth: '630px', marginBottom: '30px' }}>
                From candlelight dinners to private lakeside experiences, this package blends comfort and romance.
                We handle logistics, personalized stays, and dreamy experiences so every day feels cinematic.
              </p>

              <div className="couple-reveal delay-3" style={heroActionRowStyle}>
                <button
                  type="button"
                  onClick={() => navigate('/alltrips')}
                  style={createPrimaryButtonStyle('#ffe4ef', '#6b0f3a')}
                >
                  Explore Couple Packages
                </button>

                <button
                  type="button"
                  style={transparentCtaButtonStyle}
                >
                  Plan a Surprise Trip
                </button>
              </div>
            </div>

            <div
              className="couple-reveal delay-2"
              style={{
                borderRadius: '18px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.12) 100%)',
                border: '1px solid rgba(255,255,255,0.4)',
                backdropFilter: 'blur(2px)',
                padding: '22px'
              }}
            >
              <h3 style={{ margin: '0 0 14px', fontSize: '20px' }}>Signature Couple Experiences</h3>
              {romanticMoments.map((item) => (
                <div key={item.title} style={{ marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.16)' }}>
                  <p style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 700 }}>{item.title}</p>
                  <p style={{ margin: 0, color: '#ffe4ef', fontSize: '13px', lineHeight: 1.6 }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1150px', margin: '0 auto', padding: '52px 24px 74px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <p style={{ color: '#b4236d', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
            SAMPLE COUPLE FLOW
          </p>
          <h2 style={{ fontSize: '34px', margin: 0, color: '#4a1132' }}>4-Day Romantic Itinerary</h2>
        </div>

        <div className="couple-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px' }}>
          {itinerary.map((plan, index) => (
            <div
              key={plan.day}
              style={{
                background: '#fff',
                borderRadius: '14px',
                border: '1px solid #f3d6e6',
                boxShadow: '0 16px 34px rgba(84, 18, 53, 0.1)',
                padding: '18px'
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  background: index % 2 === 0 ? '#ffe4ef' : '#fff1c7',
                  color: '#5f1038',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginBottom: '10px'
                }}
              >
                {plan.day}
              </span>
              <h3 style={{ margin: '0 0 8px', fontSize: '21px', color: '#3d0b27' }}>{plan.title}</h3>
              <p style={{ margin: 0, color: '#6b3a53', fontSize: '14px', lineHeight: 1.7 }}>{plan.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
