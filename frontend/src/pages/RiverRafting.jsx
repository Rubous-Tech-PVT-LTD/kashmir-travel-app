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

const raftingHighlights = [
  {
    title: 'Adrenaline on the River',
    detail: 'Fast-moving water, guide-led rapids, and the right balance of thrill and control.'
  },
  {
    title: 'Beginner to Advanced',
    detail: 'Routes can be matched to first-timers, families, or stronger adventure seekers.'
  },
  {
    title: 'Scenic Valley Setting',
    detail: 'Mountain banks, forest stretches, and dramatic river curves make the ride visual as well as exciting.'
  }
]

const raftingPackages = [
  {
    name: 'Beginner Run',
    duration: '4-6 km',
    price: 'INR 1,299',
    note: 'Shorter stretch with manageable rapids and guide support'
  },
  {
    name: 'Adventure Run',
    duration: '8-10 km',
    price: 'INR 2,199',
    note: 'The most balanced mix of thrill, scenery, and pacing'
  },
  {
    name: 'Full Expedition',
    duration: '12+ km',
    price: 'INR 3,499',
    note: 'Longer route for experienced groups and adventure travelers'
  }
]

const safetyGear = [
  'Certified life jacket and helmet',
  'Professional river guide',
  'Pre-ride safety briefing',
  'Emergency support and route checks',
  'Photo stop and rest points where available',
  'Transport can be arranged from Srinagar on request'
]

const raftingMoments = [
  {
    label: 'Best Season',
    value: 'April to September'
  },
  {
    label: 'River Style',
    value: 'Fast, scenic, and guide-led'
  },
  {
    label: 'Ideal For',
    value: 'Friends, couples, and adventure groups'
  }
]

const tripPhases = [
  {
    step: '01',
    title: 'Arrive and Gear Up',
    desc: 'Meet your guide, fit safety equipment, and learn the basic commands before launch.'
  },
  {
    step: '02',
    title: 'Hit the Rapids',
    desc: 'Paddle through fast sections with clear instructions and short bursts of teamwork.'
  },
  {
    step: '03',
    title: 'Cool Down on Shore',
    desc: 'Wrap up with riverbank views, photos, and time to relax before the return transfer.'
  }
]

const prepNotes = [
  'Wear quick-dry clothing and secure footwear',
  'Keep phones and valuables in a dry pouch',
  'Follow guide instructions closely during rapids'
]

export default function RiverRafting() {
  const navigate = useNavigate()

  return (
    <div style={createPageShellStyle('#f8fbff')}>
      <Navbar />
      <style>{`
        .rafting-glow {
          animation: raftingFloat 6s ease-in-out infinite;
        }

        .rafting-fade {
          opacity: 0;
          transform: translateY(16px);
          animation: raftingFade 650ms ease forwards;
        }

        .rafting-fade.delay-1 { animation-delay: 100ms; }
        .rafting-fade.delay-2 { animation-delay: 220ms; }
        .rafting-fade.delay-3 { animation-delay: 340ms; }

        .rafting-card {
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .rafting-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 38px rgba(12, 30, 55, 0.12) !important;
        }

        @keyframes raftingFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes raftingFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 980px) {
          .rafting-grid,
          .rafting-hero-grid {
            grid-template-columns: 1fr !important;
          }

          .rafting-title {
            font-size: 38px !important;
          }
        }
      `}</style>

      <section
        style={{
          background: 'linear-gradient(135deg, #07111d 0%, #12355a 52%, #1a78a6 100%)',
          color: '#fff',
          padding: '74px 24px 84px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          className="rafting-glow"
          style={{
            position: 'absolute',
            right: '-100px',
            top: '-80px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(136, 225, 255, 0.44) 0%, rgba(136, 225, 255, 0) 72%)'
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
            background: 'radial-gradient(circle, rgba(255, 202, 126, 0.34) 0%, rgba(255, 202, 126, 0) 72%)'
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

          <div className="rafting-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.18fr 0.82fr', gap: '28px', alignItems: 'center' }}>
            <div>
              <p className="rafting-fade" style={{ letterSpacing: '1.8px', fontSize: '12px', marginBottom: '14px', color: '#a6e7ff' }}>
                KASHMIR RIVER RAFTING
              </p>
              <h1 className="rafting-title rafting-fade delay-1" style={{ fontSize: '58px', lineHeight: 1.08, margin: '0 0 18px', maxWidth: '720px' }}>
                River Rafting Built for Real Adventure, Clear Guidance, and Big Valley Energy
              </h1>
              <p className="rafting-fade delay-2" style={{ fontSize: '17px', lineHeight: 1.75, color: '#d8edf8', maxWidth: '660px', marginBottom: '28px' }}>
                This page turns river rafting into a dedicated adventure destination with package tiers, safety guidance, and clear
                booking steps so the experience feels deliberate and easy to plan.
              </p>

              <div className="rafting-fade delay-3" style={heroActionRowStyle}>
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
              className="rafting-fade delay-2"
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
                alt="River rafting in the mountains"
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '16px', display: 'block', marginBottom: '16px' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px' }}>
                {raftingMoments.map((item) => (
                  <div key={item.label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '14px', padding: '12px' }}>
                    <p style={{ margin: '0 0 6px', color: '#a6e7ff', fontSize: '11px', letterSpacing: '1px', fontWeight: 700 }}>{item.label}</p>
                    <p style={{ margin: 0, color: '#f7fcff', fontSize: '13px', lineHeight: 1.5 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1150px', margin: '0 auto', padding: '54px 24px 72px' }}>
        <div className="rafting-grid" style={{ display: 'grid', gridTemplateColumns: '1.02fr 0.98fr', gap: '22px', alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: '22px' }}>
              <p style={{ color: '#0d6b95', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
                WHY THIS RUN STANDS OUT
              </p>
              <h2 style={{ margin: 0, fontSize: '34px', color: '#10263b' }}>A clear, energetic page for one of Kashmir’s strongest adventures</h2>
            </div>

            <div className="rafting-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
              {raftingHighlights.map((item) => (
                <article
                  key={item.title}
                  className="rafting-card"
                  style={{ background: '#fff', borderRadius: '16px', border: '1px solid #dfeaf1', boxShadow: '0 14px 32px rgba(10, 35, 58, 0.08)', padding: '18px' }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #0d6b95, #28a7d6)', marginBottom: '14px' }} />
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
            <p style={{ color: '#0d6b95', letterSpacing: '1.2px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              SAFETY GEAR
            </p>
            <h3 style={{ margin: '0 0 18px', fontSize: '24px', color: '#10263b' }}>Built around guide-led control and prep</h3>

            {safetyGear.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
                <span style={{ color: '#0d6b95', marginTop: '2px' }}>-</span>
                <p style={{ margin: 0, color: '#486074', fontSize: '14px', lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}

            <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid #e4eef5' }}>
              <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#6b859b', fontWeight: 700 }}>Best paired with</p>
              <p style={{ margin: 0, color: '#10263b', fontSize: '15px', lineHeight: 1.7 }}>
                A Srinagar stay, Gulmarg day trip, or a broader adventure circuit with transport support.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section style={{ background: '#eef7fc', padding: '10px 24px 72px' }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <p style={{ color: '#0d6b95', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              RAFTING PACKAGES
            </p>
            <h2 style={{ margin: 0, fontSize: '34px', color: '#10263b' }}>Choose the level of thrill you want</h2>
          </div>

          <div className="rafting-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '18px' }}>
            {raftingPackages.map((item) => (
              <div
                key={item.name}
                className="rafting-card"
                style={{ background: '#fff', borderRadius: '18px', border: '1px solid #d8e6ef', boxShadow: '0 12px 28px rgba(10, 35, 58, 0.07)', padding: '20px' }}
              >
                <p style={{ margin: '0 0 10px', color: '#0d6b95', letterSpacing: '0.8px', fontSize: '12px', fontWeight: 700 }}>{item.duration}</p>
                <h3 style={{ margin: '0 0 8px', fontSize: '22px', color: '#10263b' }}>{item.name}</h3>
                <p style={{ margin: '0 0 18px', color: '#4f667a', fontSize: '14px', lineHeight: 1.7 }}>{item.note}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#10263b', fontSize: '18px', fontWeight: 800 }}>{item.price}</span>
                  <button
                    type="button"
                    onClick={() => navigate('/services/hotel-booking')}
                    style={{ ...createPrimaryButtonStyle('#0d6b95', '#fff'), padding: '10px 14px' }}
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
        <div className="rafting-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
          <div>
            <p style={{ color: '#0d6b95', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
              TRIP FLOW
            </p>
            <h2 style={{ margin: '0 0 14px', fontSize: '32px', color: '#10263b' }}>From briefing to rapids in three steps</h2>

            <div style={{ display: 'grid', gap: '14px' }}>
              {tripPhases.map((item) => (
                <div key={item.step} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #d9e6ef', padding: '16px' }}>
                  <p style={{ margin: '0 0 6px', color: '#0d6b95', fontSize: '12px', fontWeight: 800, letterSpacing: '1px' }}>{item.step}</p>
                  <h3 style={{ margin: '0 0 8px', fontSize: '20px', color: '#10263b' }}>{item.title}</h3>
                  <p style={{ margin: 0, color: '#4f667a', fontSize: '14px', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, #10263b 0%, #15506e 55%, #0d6b95 100%)',
              borderRadius: '22px',
              padding: '24px',
              color: '#fff',
              boxShadow: '0 18px 40px rgba(8, 45, 71, 0.16)'
            }}
          >
            <img
              src="https://picsum.photos/id/10/1200/800"
              alt="Fast river in a valley"
              style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px', marginBottom: '18px', display: 'block' }}
            />
            <p style={{ margin: '0 0 8px', color: '#a6e7ff', letterSpacing: '1px', fontSize: '12px', fontWeight: 700 }}>READY TO PLAN</p>
            <h3 style={{ margin: '0 0 12px', fontSize: '24px' }}>River Rafting with a full Kashmir adventure plan</h3>
            <p style={{ margin: '0 0 18px', color: '#d8edf8', fontSize: '14px', lineHeight: 1.8 }}>
              Tell us your preferred route length, group size, and season. We can pair the raft with transport, stay, or a longer valley circuit.
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