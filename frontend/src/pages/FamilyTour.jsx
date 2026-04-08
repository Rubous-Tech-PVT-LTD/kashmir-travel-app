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

const highlights = [
  {
    title: 'Kid Friendly Activities',
    detail: 'Shikara joy ride, pony trails, snow play zones, and picnic-friendly gardens.'
  },
  {
    title: 'Comfort Stays',
    detail: 'Family suites with heating, easy transfers, and top-rated hospitality.'
  },
  {
    title: 'Balanced Pace',
    detail: 'No rushed schedules. More breaks, local food stops, and relaxed sightseeing.'
  }
]

const samplePlan = [
  { day: 'Day 1', title: 'Srinagar Welcome', desc: 'Airport pickup, Dal Lake shikara, boulevard sunset walk.' },
  { day: 'Day 2', title: 'Gulmarg Fun Day', desc: 'Gondola ride, snow activities, family photo spots.' },
  { day: 'Day 3', title: 'Pahalgam Escape', desc: 'River-side leisure, horse ride options, local market visit.' },
  { day: 'Day 4', title: 'Local Culture', desc: 'Handicrafts, Kashmiri cuisine trail, evening houseboat stay.' }
]

export default function FamilyTour() {
  const navigate = useNavigate()

  return (
    <div style={createPageShellStyle('#f8fbff')}>
      <style>{`
        .family-hero-glow {
          animation: floatGlow 5s ease-in-out infinite;
        }

        .family-fade-up {
          opacity: 0;
          transform: translateY(16px);
          animation: fadeUp 600ms ease forwards;
        }

        .family-fade-up.delay-1 { animation-delay: 120ms; }
        .family-fade-up.delay-2 { animation-delay: 240ms; }
        .family-fade-up.delay-3 { animation-delay: 360ms; }

        @keyframes floatGlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 900px) {
          .family-grid {
            grid-template-columns: 1fr !important;
          }
          .family-hero-title {
            font-size: 34px !important;
          }
        }
      `}</style>

      <section
        style={{
          background: 'linear-gradient(135deg, #122033 0%, #1d3557 55%, #2a9d8f 100%)',
          color: '#fff',
          padding: '72px 24px 80px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          className="family-hero-glow"
          style={{
            position: 'absolute',
            right: '-80px',
            top: '-50px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,226,159,0.45) 0%, rgba(255,226,159,0) 68%)'
          }}
        />

        <div style={maxWidthContainerStyle}>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{ ...backButtonStyle, marginBottom: '26px', border: '1px solid rgba(255,255,255,0.45)' }}
          >
            ← Back to Home
          </button>

          <div className="family-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px', alignItems: 'center' }}>
            <div>
              <p className="family-fade-up" style={{ letterSpacing: '1.6px', fontSize: '12px', marginBottom: '14px', color: '#ffe29f' }}>
                PREMIUM FAMILY EXPERIENCE
              </p>
              <h1 className="family-hero-title family-fade-up delay-1" style={{ fontSize: '54px', lineHeight: 1.1, margin: '0 0 18px', maxWidth: '620px' }}>
                Family Tour in Kashmir Designed for Joy, Comfort, and Togetherness
              </h1>
              <p className="family-fade-up delay-2" style={{ fontSize: '17px', lineHeight: 1.7, color: '#dbeafe', maxWidth: '620px', marginBottom: '28px' }}>
                Explore valleys, lakes, and cozy stays with itineraries that keep every age group happy. Our team manages transport,
                hotel coordination, and family-safe activities while you focus on making memories.
              </p>

              <div className="family-fade-up delay-3" style={heroActionRowStyle}>
                <button
                  type="button"
                  onClick={() => navigate('/alltrips?category=family-tour')}
                  style={createPrimaryButtonStyle('#ffe29f', '#1d3557')}
                >
                  Browse Family Tour
                </button>
                <button
                  type="button"
                  style={transparentCtaButtonStyle}
                >
                  Talk to Planner
                </button>
              </div>
            </div>

            <div
              className="family-fade-up delay-2"
              style={{
                borderRadius: '18px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.19) 0%, rgba(255,255,255,0.09) 100%)',
                backdropFilter: 'blur(2px)',
                border: '1px solid rgba(255,255,255,0.35)',
                padding: '22px'
              }}
            >
              <h3 style={{ margin: '0 0 14px', fontSize: '19px' }}>Why Families Love This Tour</h3>
              {highlights.map((item) => (
                <div key={item.title} style={{ marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                  <p style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 700 }}>{item.title}</p>
                  <p style={{ margin: 0, color: '#e2e8f0', fontSize: '13px', lineHeight: 1.6 }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1150px', margin: '0 auto', padding: '52px 24px 70px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <p style={{ color: '#2a9d8f', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
            SAMPLE ITINERARY
          </p>
          <h2 style={{ fontSize: '34px', margin: 0, color: '#1d3557' }}>4-Day Family Flow</h2>
        </div>

        <div className="family-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px' }}>
          {samplePlan.map((plan, index) => (
            <div
              key={plan.day}
              style={{
                background: '#fff',
                borderRadius: '14px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 14px 34px rgba(15, 23, 42, 0.08)',
                padding: '18px'
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  background: index % 2 === 0 ? '#ffe29f' : '#d7f5ee',
                  color: '#1d3557',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginBottom: '10px'
                }}
              >
                {plan.day}
              </span>
              <h3 style={{ margin: '0 0 8px', fontSize: '21px', color: '#0f172a' }}>{plan.title}</h3>
              <p style={{ margin: 0, color: '#475569', fontSize: '14px', lineHeight: 1.7 }}>{plan.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
