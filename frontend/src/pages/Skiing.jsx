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

const skiHighlights = [
  {
    title: 'Pristine Alpine Slopes',
    detail: 'Powder-filled runs from beginner greens to expert black diamonds, all in Kashmir\'s Himalayan setting.'
  },
  {
    title: 'Certified Instruction',
    detail: 'Professional ski guides adapt to your level—whether you\'re learning or seeking backcountry challenges.'
  },
  {
    title: 'Winter Magic Landscape',
    detail: 'Snow-draped peaks, peaceful valleys, and world-class views that make every run feel like a postcard.'
  }
]

const skiPackages = [
  {
    name: 'Beginner Slopes',
    terrain: 'Green & Blue Runs',
    price: 'INR 2,199',
    note: 'Perfect for first-time skiers with equipment rental, lessons, and all-day lift passes.'
  },
  {
    name: 'Intermediate Carving',
    terrain: 'Blue & Red Runs',
    price: 'INR 3,899',
    note: 'Progress your technique across scenic varied terrain with moderate challenge and stunning views.'
  },
  {
    name: 'Expert Backcountry',
    terrain: 'Black Diamonds & Off-Piste',
    price: 'INR 6,499',
    note: 'Advanced terrain, backcountry access, avalanche training, and certified mountain guides included.'
  }
]

const seasonalMoments = [
  {
    label: 'Best Season',
    value: 'December to March'
  },
  {
    label: 'Snow Type',
    value: 'Powder and packed runs'
  },
  {
    label: 'Altitude Range',
    value: '2000–4000m'
  }
]

const skiIncluded = [
  'Full ski equipment rental (skis, boots, poles)',
  'Professional certified instructor',
  'Lift pass and slope access ',
  'Safety briefing and avalanche beacon',
  'Warm lodge and hot beverages',
  'Photo stops at scenic viewpoints'
]

const skiPhases = [
  {
    step: '01',
    title: 'Fit and Learn',
    desc: 'Equipment fitting, stance and balance instruction, safety briefing, and slopes introduction.'
  },
  {
    step: '02',
    title: 'Carve and Conquer',
    desc: 'Progress through easier slopes, build speed and control, try steeper runs as confidence grows.'
  },
  {
    step: '03',
    title: 'Warm Up & Celebrate',
    desc: 'Hot beverages and warm meals at the lodge, share stories, and plan your next run.'
  }
]

const prepNotes = [
  'Layer up with thermal underwear and waterproof outer shell—high altitude gets very cold',
  'Bring sunscreen, goggles, and lip balm—snow reflection intensifies sun exposure',
  'Leave valuables in lodge; take only essentials (ID, small wallet) in your jacket pocket'
]

export default function Skiing() {
  const navigate = useNavigate()

  return (
    <div style={createPageShellStyle('#f8fbff')}>
      <Navbar />
      <style>{`
        .ski-glow {
          animation: skiFloat 6s ease-in-out infinite;
        }

        .ski-fade {
          opacity: 0;
          transform: translateY(16px);
          animation: skiFade 650ms ease forwards;
        }

        .ski-fade.delay-1 { animation-delay: 100ms; }
        .ski-fade.delay-2 { animation-delay: 220ms; }
        .ski-fade.delay-3 { animation-delay: 340ms; }

        .ski-card {
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .ski-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 38px rgba(12, 30, 55, 0.12) !important;
        }

        @keyframes skiFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes skiFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 980px) {
          .ski-grid,
          .ski-hero-grid {
            grid-template-columns: 1fr !important;
          }

          .ski-title {
            font-size: 38px !important;
          }
        }
      `}</style>

      <section
        style={{
          background: 'linear-gradient(135deg, #0f1823 0%, #1a3f5d 52%, #2980b9 100%)',
          color: '#fff',
          padding: '74px 24px 84px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          className="ski-glow"
          style={{
            position: 'absolute',
            right: '-100px',
            top: '-80px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(120, 210, 250, 0.44) 0%, rgba(120, 210, 250, 0) 72%)'
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
            background: 'radial-gradient(circle, rgba(180, 230, 255, 0.34) 0%, rgba(180, 230, 255, 0) 72%)'
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

          <div className="ski-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.18fr 0.82fr', gap: '28px', alignItems: 'center' }}>
            <div>
              <p className="ski-fade" style={{ letterSpacing: '1.8px', fontSize: '12px', marginBottom: '14px', color: '#a0d8ff' }}>
                KASHMIR SKIING
              </p>
              <h1 className="ski-title ski-fade delay-1" style={{ fontSize: '58px', lineHeight: 1.08, margin: '0 0 18px', maxWidth: '720px' }}>
                Carve the Himalayan Slopes with Expert Guides and Pristine Powder Runs
              </h1>
              <p className="ski-fade delay-2" style={{ fontSize: '17px', lineHeight: 1.75, color: '#d8edf8', maxWidth: '660px', marginBottom: '28px' }}>
                Experience world-class winter skiing across Kashmir's best alpine terrain—from gentle beginner slopes to challenging off-piste adventures, all set in breathtaking mountain scenery.
              </p>

              <div className="ski-fade delay-3" style={heroActionRowStyle}>
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
              className="ski-fade delay-2"
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
                alt="Skier carving down snowy slopes"
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '16px', display: 'block', marginBottom: '16px' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px' }}>
                {seasonalMoments.map((item) => (
                  <div key={item.label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '14px', padding: '12px' }}>
                    <p style={{ margin: '0 0 6px', color: '#a0d8ff', fontSize: '11px', letterSpacing: '1px', fontWeight: 700 }}>{item.label}</p>
                    <p style={{ margin: 0, color: '#f7fcff', fontSize: '13px', lineHeight: 1.5 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1150px', margin: '0 auto', padding: '54px 24px 72px' }}>
        <div className="ski-grid" style={{ display: 'grid', gridTemplateColumns: '1.02fr 0.98fr', gap: '22px', alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: '22px' }}>
              <p style={{ color: '#1a3f5d', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
                WHY SKI IN KASHMIR
              </p>
              <h2 style={{ margin: 0, fontSize: '34px', color: '#10263b' }}>A premier winter ski destination with pristine slopes and certified guides</h2>
            </div>

            <div className="ski-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
              {skiHighlights.map((item) => (
                <article
                  key={item.title}
                  className="ski-card"
                  style={{ background: '#fff', borderRadius: '16px', border: '1px solid #dfeaf1', boxShadow: '0 14px 32px rgba(10, 35, 58, 0.08)', padding: '18px' }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #1a3f5d, #2980b9)', marginBottom: '14px' }} />
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
            <p style={{ color: '#1a3f5d', letterSpacing: '1.2px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              COMPLETE SKI PACKAGE
            </p>
            <h3 style={{ margin: '0 0 18px', fontSize: '24px', color: '#10263b' }}>Everything you need for a perfect day on the slopes</h3>

            {skiIncluded.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
                <span style={{ color: '#1a3f5d', marginTop: '2px' }}>-</span>
                <p style={{ margin: 0, color: '#486074', fontSize: '14px', lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}

            <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid #e4eef5' }}>
              <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#6b859b', fontWeight: 700 }}>Perfect addition to</p>
              <p style={{ margin: 0, color: '#10263b', fontSize: '15px', lineHeight: 1.7 }}>
                A full winter Kashmir experience with stays in Gulmarg or Pahalgam, combined with cultural and adventure activities.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section style={{ background: '#eef7fc', padding: '10px 24px 72px' }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <p style={{ color: '#1a3f5d', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              SKI PACKAGES
            </p>
            <h2 style={{ margin: 0, fontSize: '34px', color: '#10263b' }}>Choose your slope difficulty and ski intensity</h2>
          </div>

          <div className="ski-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '18px' }}>
            {skiPackages.map((item) => (
              <div
                key={item.name}
                className="ski-card"
                style={{ background: '#fff', borderRadius: '18px', border: '1px solid #d8e6ef', boxShadow: '0 12px 28px rgba(10, 35, 58, 0.07)', padding: '20px' }}
              >
                <p style={{ margin: '0 0 10px', color: '#1a3f5d', letterSpacing: '0.8px', fontSize: '12px', fontWeight: 700 }}>{item.terrain}</p>
                <h3 style={{ margin: '0 0 8px', fontSize: '22px', color: '#10263b' }}>{item.name}</h3>
                <p style={{ margin: '0 0 18px', color: '#4f667a', fontSize: '14px', lineHeight: 1.7 }}>{item.note}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#10263b', fontSize: '18px', fontWeight: 800 }}>{item.price}</span>
                  <button
                    type="button"
                    onClick={() => navigate('/services/hotel-booking')}
                    style={{ ...createPrimaryButtonStyle('#1a3f5d', '#fff'), padding: '10px 14px' }}
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
        <div className="ski-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
          <div>
            <p style={{ color: '#1a3f5d', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              SKI DAY FLOW
            </p>
            <h2 style={{ margin: '0 0 14px', fontSize: '32px', color: '#10263b' }}>From equipment fitting to final runs in three steps</h2>

            <div style={{ display: 'grid', gap: '14px' }}>
              {skiPhases.map((item) => (
                <div key={item.step} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #d9e6ef', padding: '16px' }}>
                  <p style={{ margin: '0 0 6px', color: '#1a3f5d', fontSize: '12px', fontWeight: 800, letterSpacing: '1px' }}>{item.step}</p>
                  <h3 style={{ margin: '0 0 8px', fontSize: '20px', color: '#10263b' }}>{item.title}</h3>
                  <p style={{ margin: 0, color: '#4f667a', fontSize: '14px', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, #10263b 0%, #1a3f5d 55%, #2980b9 100%)',
              borderRadius: '22px',
              padding: '24px',
              color: '#fff',
              boxShadow: '0 18px 40px rgba(8, 45, 71, 0.16)'
            }}
          >
            <img
              src="https://picsum.photos/id/29/1200/800"
              alt="Snowy mountain slopes at sunrise"
              style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px', marginBottom: '18px', display: 'block' }}
            />
            <p style={{ margin: '0 0 8px', color: '#a0d8ff', letterSpacing: '1px', fontSize: '12px', fontWeight: 700 }}>READY TO SKI</p>
            <h3 style={{ margin: '0 0 12px', fontSize: '24px' }}>Winter skiing with a full Kashmir adventure plan</h3>
            <p style={{ margin: '0 0 18px', color: '#d8edf8', fontSize: '14px', lineHeight: 1.8 }}>
              Book your ski days, add Gulmarg lodge stays, combine with snowshoeing or heli-skiing, and plan a complete winter Kashmir experience.
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
