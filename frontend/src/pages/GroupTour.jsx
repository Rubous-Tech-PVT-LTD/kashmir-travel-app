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

const groupHighlights = [
  {
    title: 'Smooth Group Logistics',
    detail: 'Coordinated transport, rooming plans, and timings that keep large groups stress free.'
  },
  {
    title: 'Shared Adventure Moments',
    detail: 'From gondola rides to valley camps, every day is planned for fun and bonding.'
  },
  {
    title: 'Custom Budget Bands',
    detail: 'Student squads, corporate teams, or family circles - choose a package that fits your group.'
  }
]

const groupPlan = [
  { day: 'Day 1', title: 'Srinagar Group Arrival', desc: 'Airport pickup, welcome briefing, room allocation, and Dal Lake evening cruise.' },
  { day: 'Day 2', title: 'Gulmarg Adventure Day', desc: 'Gondola phases, snow activities, and team challenge moments with guided support.' },
  { day: 'Day 3', title: 'Pahalgam Escape', desc: 'Riverside leisure, optional horse rides, picnic setup, and bonfire-style gathering.' },
  { day: 'Day 4', title: 'Culture and Departure', desc: 'Handicraft walk, local tasting trail, group photos, and coordinated airport drops.' }
]

export default function GroupTour() {
  const navigate = useNavigate()

  return (
    <div style={createPageShellStyle('#f8fbff')}>
      <style>{`
        .group-orb {
          animation: groupFloat 6.2s ease-in-out infinite;
        }

        .group-reveal {
          opacity: 0;
          transform: translateY(16px);
          animation: groupReveal 650ms ease forwards;
        }

        .group-reveal.delay-1 { animation-delay: 110ms; }
        .group-reveal.delay-2 { animation-delay: 220ms; }
        .group-reveal.delay-3 { animation-delay: 330ms; }

        @keyframes groupFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes groupReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 980px) {
          .group-grid {
            grid-template-columns: 1fr !important;
          }

          .group-title {
            font-size: 36px !important;
          }
        }
      `}</style>

      <section
        style={{
          background: 'linear-gradient(140deg, #13213b 0%, #3b2a78 45%, #5d47d8 100%)',
          color: '#fff',
          padding: '76px 24px 86px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          className="group-orb"
          style={{
            position: 'absolute',
            left: '-90px',
            top: '-85px',
            width: '270px',
            height: '270px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.48) 0%, rgba(167,139,250,0) 72%)'
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: '-80px',
            bottom: '-95px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,181,253,0.36) 0%, rgba(196,181,253,0) 72%)'
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

          <div className="group-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '30px', alignItems: 'center' }}>
            <div>
              <p className="group-reveal" style={{ letterSpacing: '1.8px', fontSize: '12px', marginBottom: '14px', color: '#ddd6fe' }}>
                GROUP JOURNEY EDITION
              </p>

              <h1 className="group-title group-reveal delay-1" style={{ fontSize: '54px', lineHeight: 1.1, margin: '0 0 18px', maxWidth: '670px' }}>
                Group Tour Built for Shared Adventures, Easy Planning, and Big Memories
              </h1>

              <p className="group-reveal delay-2" style={{ fontSize: '17px', lineHeight: 1.7, color: '#e9e5ff', maxWidth: '640px', marginBottom: '30px' }}>
                Perfect for friends, office teams, student circles, and extended families. We handle transport, stay coordination,
                activity timing, and group-friendly experiences so your trip runs smooth from start to finish.
              </p>

              <div className="group-reveal delay-3" style={heroActionRowStyle}>
                <button
                  type="button"
                  onClick={() => navigate('/alltrips')}
                  style={createPrimaryButtonStyle('#ddd6fe', '#2f236f')}
                >
                  Explore Group Packages
                </button>

                <button
                  type="button"
                  style={transparentCtaButtonStyle}
                >
                  Get Group Quote
                </button>
              </div>
            </div>

            <div
              className="group-reveal delay-2"
              style={{
                borderRadius: '18px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.1) 100%)',
                border: '1px solid rgba(255,255,255,0.4)',
                backdropFilter: 'blur(2px)',
                padding: '22px'
              }}
            >
              <h3 style={{ margin: '0 0 14px', fontSize: '20px' }}>Why Groups Choose Us</h3>
              {groupHighlights.map((item) => (
                <div key={item.title} style={{ marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.16)' }}>
                  <p style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 700 }}>{item.title}</p>
                  <p style={{ margin: 0, color: '#e9e5ff', fontSize: '13px', lineHeight: 1.6 }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1150px', margin: '0 auto', padding: '54px 24px 74px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <p style={{ color: '#5b4bc4', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
            SAMPLE GROUP FLOW
          </p>
          <h2 style={{ fontSize: '34px', margin: 0, color: '#1f2a56' }}>4-Day Group Itinerary</h2>
        </div>

        <div className="group-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px' }}>
          {groupPlan.map((plan, index) => (
            <div
              key={plan.day}
              style={{
                background: '#fff',
                borderRadius: '14px',
                border: '1px solid #e4e6fb',
                boxShadow: '0 16px 34px rgba(44, 35, 111, 0.11)',
                padding: '18px'
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  background: index % 2 === 0 ? '#ddd6fe' : '#dbeafe',
                  color: '#2f236f',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginBottom: '10px'
                }}
              >
                {plan.day}
              </span>
              <h3 style={{ margin: '0 0 8px', fontSize: '21px', color: '#1f2a56' }}>{plan.title}</h3>
              <p style={{ margin: 0, color: '#4b5563', fontSize: '14px', lineHeight: 1.7 }}>{plan.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
