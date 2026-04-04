import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../shared/Footer'
import {
  backButtonStyle,
  cardBodyStyle,
  cardMetaRowStyle,
  centeredHeadingStyle,
  createPageShellStyle,
  createPrimaryButtonStyle,
  heroActionRowStyle,
  heroSplitGridStyle,
  listPanelRowStyle,
  maxWidthContainerStyle,
  sidePanelAlignStyle,
  standardSectionStyle,
  transparentCtaButtonStyle
} from '../shared/servicePageStyles'

const rentalFleet = [
  {
    id: 1,
    name: 'Swift Dzire Sedan',
    type: 'Comfort Sedan',
    route: 'Srinagar City + Airport',
    seats: '4 Seats',
    price: '2,499/day',
    image: 'https://picsum.photos/id/10/1200/800'
  },
  {
    id: 2,
    name: 'Innova Crysta',
    type: 'Family MPV',
    route: 'Gulmarg + Sonamarg',
    seats: '6-7 Seats',
    price: '4,999/day',
    image: 'https://picsum.photos/id/10/1200/800'
  },
  {
    id: 3,
    name: 'Mahindra Scorpio N',
    type: 'Mountain SUV',
    route: 'Pahalgam + Aru Valley',
    seats: '6 Seats',
    price: '5,499/day',
    image: 'https://picsum.photos/id/10/1200/800'
  },
  {
    id: 4,
    name: 'Tempo Traveller',
    type: 'Group Van',
    route: '8-12 Pax Group Transfer',
    seats: '12 Seats',
    price: '7,999/day',
    image: 'https://picsum.photos/id/10/1200/800'
  },
  {
    id: 5,
    name: 'Kia Seltos',
    type: 'Premium SUV',
    route: 'Kashmir Valley Circuit',
    seats: '5 Seats',
    price: '5,999/day',
    image: 'https://picsum.photos/id/10/1200/800'
  },
  {
    id: 6,
    name: 'Toyota Fortuner',
    type: 'Luxury 4x4',
    route: 'Snow and Offbeat Routes',
    seats: '7 Seats',
    price: '8,999/day',
    image: 'https://picsum.photos/id/10/1200/800'
  }
]

const rentalHighlights = [
  'With-driver and self-drive options',
  'Local verified drivers for mountain routes',
  'Transparent per-day pricing with no hidden fees',
  'Pickup and drop from airport, hotel, or houseboat'
]

export default function CarRentals() {
  const navigate = useNavigate()

  return (
    <div style={createPageShellStyle('#f5f8fb')}>
      <style>{`
        .rental-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(255, 180, 90, 0.42);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.07);
          color: #ffd28f;
          letter-spacing: 2.8px;
          font-size: 12px;
          font-weight: 700;
          padding: 11px 22px;
        }

        .rental-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 68px;
          line-height: 1.06;
          margin: 0;
          color: #f8fbff;
          letter-spacing: -0.6px;
        }

        .rental-accent {
          color: #ffd28f;
        }

        .rental-hero-panel {
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.16);
          padding: 20px;
        }

        .rental-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          width: 100%;
        }

        .rental-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 14px 34px rgba(15, 32, 56, 0.11);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          border: 1px solid #e5e9ef;
        }

        .rental-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 42px rgba(15, 32, 56, 0.16);
        }

        .rental-card-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 980px) {
          .rental-layout {
            grid-template-columns: 1fr !important;
          }

          .rental-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .rental-title {
            font-size: 50px;
          }
        }

        @media (max-width: 680px) {
          .rental-grid {
            grid-template-columns: 1fr;
          }

          .rental-title {
            font-size: 40px;
          }
        }
      `}</style>

      <section
        style={{
          background: 'linear-gradient(95deg, #0b1f3a 0%, #0d3553 50%, #145070 100%)',
          color: '#fff',
          padding: '72px 24px 78px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={maxWidthContainerStyle}>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={backButtonStyle}
          >
            ← Back to Home
          </button>

          <div className="rental-layout" style={heroSplitGridStyle}>
            <div>
              <div className="rental-badge" style={{ marginBottom: '20px' }}>
                <span>🚗</span>
                <span>DRIVE & EXPLORE</span>
              </div>

              <h1 className="rental-title" style={{ maxWidth: '760px', marginBottom: '18px' }}>
                Pick Your
                <br />
                <span className="rental-accent">Perfect Ride.</span>
              </h1>

              <p style={{ fontSize: '17px', lineHeight: 1.65, color: 'rgba(245, 247, 250, 0.76)', maxWidth: '700px', marginBottom: '26px' }}>
                From city drives to high-altitude valley routes, our Kashmir rental fleet gives you comfort, safety,
                and local route expertise for every trip style.
              </p>

              <div style={heroActionRowStyle}>
                <button
                  type="button"
                  onClick={() => navigate('/alltrips')}
                  style={createPrimaryButtonStyle('#ffd28f', '#0c1f38')}
                >
                  View Rental Packages
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/services/group-tour')}
                  style={transparentCtaButtonStyle}
                >
                  Plan Group Transfer
                </button>
              </div>
            </div>

            <div
              className="rental-hero-panel"
              style={sidePanelAlignStyle}
            >
              <h3 style={{ margin: '0 0 14px', fontSize: '22px', color: '#f6f8fa' }}>Rental Benefits</h3>
              {rentalHighlights.map((item) => (
                <div key={item} style={listPanelRowStyle}>
                  <span style={{ color: '#ffd28f', marginTop: '2px' }}>●</span>
                  <p style={{ margin: 0, color: 'rgba(245, 247, 250, 0.9)', fontSize: '14px', lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={standardSectionStyle}>
        <div style={centeredHeadingStyle}>
          <p style={{ color: '#17456d', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
            KASHMIR RENTAL FLEET
          </p>
          <h2 style={{ fontSize: '34px', margin: 0, color: '#0f2946' }}>Book Your Ride by Comfort, Group Size, and Route</h2>
        </div>

        <div className="rental-grid">
          {rentalFleet.map((car) => (
            <div key={car.id} className="rental-card">
              <img src={car.image} alt={car.name} className="rental-card-image" />

              <div style={cardBodyStyle}>
                <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: 700, color: '#3f5f89', letterSpacing: '0.6px' }}>
                  {car.type} • {car.route}
                </p>

                <h3 style={{ margin: '0 0 10px', fontSize: '20px', color: '#12263e', lineHeight: 1.25 }}>
                  {car.name}
                </h3>

                <div style={cardMetaRowStyle}>
                  <p style={{ margin: 0, color: '#456c94', fontWeight: 700, fontSize: '14px' }}>
                    {car.seats}
                  </p>
                  <p style={{ margin: 0, color: '#0f2946', fontWeight: 700, fontSize: '18px' }}>
                    INR {car.price}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/alltrips')}
                  style={{
                    width: '100%',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '11px 14px',
                    background: 'linear-gradient(90deg, #0b3d66 0%, #1e5c91 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
