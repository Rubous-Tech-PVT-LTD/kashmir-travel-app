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

const paraglideHighlights = [
  {
    title: 'Soar over Alpine Peaks',
    detail: 'Float above Kashmir\'s most dramatic mountain landscapes with professional pilots and thermal expertise.'
  },
  {
    title: 'Safe, Instructed Flights',
    detail: 'Tandem flights with certified instructors mean you experience the thrill while they handle the technique.'
  },
  {
    title: 'Aerial Photo Moments',
    detail: 'Capture your flight from angles no ground camera can match—with optional video packages included.'
  }
]

const flightPackages = [
  {
    name: 'Scenic Flight',
    duration: '15–20 min',
    price: 'INR 2,999',
    note: 'Perfect introduction to paragliding with beautiful low-altitude valley and peak views.'
  },
  {
    name: 'Mountain Flight',
    duration: '25–30 min',
    price: 'INR 4,999',
    note: 'Extended flight covering higher peaks, thermals, and wider mountain panoramas.'
  },
  {
    name: 'Premium Adventure',
    duration: '40–50 min',
    price: 'INR 7,499',
    note: 'Full experience with acrobatics, maximum altitude, and cinematic aerial footage.'
  }
]

const flightMoments = [
  {
    label: 'Best Season',
    value: 'April to October'
  },
  {
    label: 'Flight Type',
    value: 'Tandem with certified pilots'
  },
  {
    label: 'Weather Dependent',
    value: 'Clear skies required'
  }
]

const flightGear = [
  'Tandem paraglider with backup parachute',
  'Full body harness and helmet',
  'Safety briefing and certification',
  'Thermal awareness training',
  'Emergency landing gear checks',
  'Professional video/photo package'
]

const flightPhases = [
  {
    step: '01',
    title: 'Launch Preparation',
    desc: 'Suit up at the launch point, receive final briefing, check wind direction and thermal conditions.'
  },
  {
    step: '02',
    title: 'Lift and Soar',
    desc: 'Gentle tow or running start, then catch thermals to climb higher and float longer over the landscape.'
  },
  {
    step: '03',
    title: 'Smooth Landing',
    desc: 'Pilot guides you down with perfect landing technique, then walk back to base for debrief and footage.'
  }
]

const prepNotes = [
  'Wear layers—temperature drops significantly at altitude',
  'Secure all loose items; bring only essentials in flight harness',
  'Follow pilot instructions exactly and embrace the weightless freedom'
]

export default function ParaGliding() {
  const navigate = useNavigate()

  return (
    <div style={createPageShellStyle('#f8fbff')}>
      <style>{`
        .paraglide-glow {
          animation: paraglideFloat 6s ease-in-out infinite;
        }

        .paraglide-fade {
          opacity: 0;
          transform: translateY(16px);
          animation: paraglideFade 650ms ease forwards;
        }

        .paraglide-fade.delay-1 { animation-delay: 100ms; }
        .paraglide-fade.delay-2 { animation-delay: 220ms; }
        .paraglide-fade.delay-3 { animation-delay: 340ms; }

        .paraglide-card {
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .paraglide-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 38px rgba(12, 30, 55, 0.12) !important;
        }

        @keyframes paraglideFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes paraglideFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 980px) {
          .paraglide-grid,
          .paraglide-hero-grid {
            grid-template-columns: 1fr !important;
          }

          .paraglide-title {
            font-size: 38px !important;
          }
        }
      `}</style>

      <section
        style={{
          background: 'linear-gradient(135deg, #0a1929 0%, #1e5a8e 52%, #3b8bc9 100%)',
          color: '#fff',
          padding: '74px 24px 84px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          className="paraglide-glow"
          style={{
            position: 'absolute',
            right: '-100px',
            top: '-80px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(100, 200, 255, 0.44) 0%, rgba(100, 200, 255, 0) 72%)'
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
            background: 'radial-gradient(circle, rgba(200, 220, 255, 0.34) 0%, rgba(200, 220, 255, 0) 72%)'
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

          <div className="paraglide-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.18fr 0.82fr', gap: '28px', alignItems: 'center' }}>
            <div>
              <p className="paraglide-fade" style={{ letterSpacing: '1.8px', fontSize: '12px', marginBottom: '14px', color: '#a8d5ff' }}>
                KASHMIR PARAGLIDING
              </p>
              <h1 className="paraglide-title paraglide-fade delay-1" style={{ fontSize: '58px', lineHeight: 1.08, margin: '0 0 18px', maxWidth: '720px' }}>
                Soar Above the Himalayas with World-Class Pilots and Unforgettable Thrills
              </h1>
              <p className="paraglide-fade delay-2" style={{ fontSize: '17px', lineHeight: 1.75, color: '#d8edf8', maxWidth: '660px', marginBottom: '28px' }}>
                Experience Kashmir's most stunning aerial view—tandem paragliding for every confidence level, with safety gear, thermal training, and cinematic footage of your adventure.
              </p>

              <div className="paraglide-fade delay-3" style={heroActionRowStyle}>
                <button
                  type="button"
                  onClick={() => navigate('/alltrips')}
                  style={createPrimaryButtonStyle('#ffd79d', '#13263b')}
                >
                  View Kashmir Trips
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/services/group-tour')}
                  style={transparentCtaButtonStyle}
                >
                  Plan Group Adventure
                </button>
              </div>
            </div>

            <div
              className="paraglide-fade delay-2"
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
                src="https://picsum.photos/id/10/1200/800"
                alt="Paragliding over mountain peaks"
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '16px', display: 'block', marginBottom: '16px' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px' }}>
                {flightMoments.map((item) => (
                  <div key={item.label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '14px', padding: '12px' }}>
                    <p style={{ margin: '0 0 6px', color: '#a8d5ff', fontSize: '11px', letterSpacing: '1px', fontWeight: 700 }}>{item.label}</p>
                    <p style={{ margin: 0, color: '#f7fcff', fontSize: '13px', lineHeight: 1.5 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1150px', margin: '0 auto', padding: '54px 24px 72px' }}>
        <div className="paraglide-grid" style={{ display: 'grid', gridTemplateColumns: '1.02fr 0.98fr', gap: '22px', alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: '22px' }}>
              <p style={{ color: '#1e5a8e', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
                WHY PARAGLIDE IN KASHMIR
              </p>
              <h2 style={{ margin: 0, fontSize: '34px', color: '#10263b' }}>An epic aerial adventure with certified pilots and world-class views</h2>
            </div>

            <div className="paraglide-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
              {paraglideHighlights.map((item) => (
                <article
                  key={item.title}
                  className="paraglide-card"
                  style={{ background: '#fff', borderRadius: '16px', border: '1px solid #dfeaf1', boxShadow: '0 14px 32px rgba(10, 35, 58, 0.08)', padding: '18px' }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #1e5a8e, #3b8bc9)', marginBottom: '14px' }} />
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
            <p style={{ color: '#1e5a8e', letterSpacing: '1.2px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              FLIGHT SAFETY PACKAGE
            </p>
            <h3 style={{ margin: '0 0 18px', fontSize: '24px', color: '#10263b' }}>Complete paragliding setup with backup systems</h3>

            {flightGear.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
                <span style={{ color: '#1e5a8e', marginTop: '2px' }}>-</span>
                <p style={{ margin: 0, color: '#486074', fontSize: '14px', lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}

            <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid #e4eef5' }}>
              <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#6b859b', fontWeight: 700 }}>Perfect add-on to</p>
              <p style={{ margin: 0, color: '#10263b', fontSize: '15px', lineHeight: 1.7 }}>
                A Srinagar base with multi-day adventure packages or Gulmarg alpine experiences.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section style={{ background: '#eef7fc', padding: '10px 24px 72px' }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <p style={{ color: '#1e5a8e', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              FLIGHT PACKAGES
            </p>
            <h2 style={{ margin: 0, fontSize: '34px', color: '#10263b' }}>Choose your flight duration and intensity</h2>
          </div>

          <div className="paraglide-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '18px' }}>
            {flightPackages.map((item) => (
              <div
                key={item.name}
                className="paraglide-card"
                style={{ background: '#fff', borderRadius: '18px', border: '1px solid #d8e6ef', boxShadow: '0 12px 28px rgba(10, 35, 58, 0.07)', padding: '20px' }}
              >
                <p style={{ margin: '0 0 10px', color: '#1e5a8e', letterSpacing: '0.8px', fontSize: '12px', fontWeight: 700 }}>{item.duration}</p>
                <h3 style={{ margin: '0 0 8px', fontSize: '22px', color: '#10263b' }}>{item.name}</h3>
                <p style={{ margin: '0 0 18px', color: '#4f667a', fontSize: '14px', lineHeight: 1.7 }}>{item.note}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#10263b', fontSize: '18px', fontWeight: 800 }}>{item.price}</span>
                  <button
                    type="button"
                    onClick={() => navigate('/services/hotel-booking')}
                    style={{ ...createPrimaryButtonStyle('#1e5a8e', '#fff'), padding: '10px 14px' }}
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
        <div className="paraglide-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
          <div>
            <p style={{ color: '#1e5a8e', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              FLIGHT FLOW
            </p>
            <h2 style={{ margin: '0 0 14px', fontSize: '32px', color: '#10263b' }}>From launch to landing in three thrilling steps</h2>

            <div style={{ display: 'grid', gap: '14px' }}>
              {flightPhases.map((item) => (
                <div key={item.step} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #d9e6ef', padding: '16px' }}>
                  <p style={{ margin: '0 0 6px', color: '#1e5a8e', fontSize: '12px', fontWeight: 800, letterSpacing: '1px' }}>{item.step}</p>
                  <h3 style={{ margin: '0 0 8px', fontSize: '20px', color: '#10263b' }}>{item.title}</h3>
                  <p style={{ margin: 0, color: '#4f667a', fontSize: '14px', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, #10263b 0%, #1e5a8e 55%, #3b8bc9 100%)',
              borderRadius: '22px',
              padding: '24px',
              color: '#fff',
              boxShadow: '0 18px 40px rgba(8, 45, 71, 0.16)'
            }}
          >
            <img
              src="https://picsum.photos/id/10/1200/800"
              alt="Mountain landscape from aerial view"
              style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px', marginBottom: '18px', display: 'block' }}
            />
            <p style={{ margin: '0 0 8px', color: '#a8d5ff', letterSpacing: '1px', fontSize: '12px', fontWeight: 700 }}>READY TO TAKE FLIGHT</p>
            <h3 style={{ margin: '0 0 12px', fontSize: '24px' }}>Paragliding with a full Kashmir adventure plan</h3>
            <p style={{ margin: '0 0 18px', color: '#d8edf8', fontSize: '14px', lineHeight: 1.8 }}>
              Choose your flight time, pair it with Gulmarg or Pahalgam stays, and combine with other aerial activities or mountain tours.
            </p>
            <div style={heroActionRowStyle}>
              <button
                type="button"
                onClick={() => navigate('/alltrips')}
                style={createPrimaryButtonStyle('#ffd79d', '#13263b')}
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
