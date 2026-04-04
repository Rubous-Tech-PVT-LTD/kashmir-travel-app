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

const kashmirHotels = [
  {
    id: 1,
    name: 'The Khyber Himalayan Resort',
    location: 'Gulmarg',
    nights: '2N/3D Stay',
    rating: 5,
    price: '24,999',
    image: 'https://picsum.photos/id/16/1200/800'
  },
  {
    id: 2,
    name: 'Kareem Houseboat Retreat',
    location: 'Dal Lake, Srinagar',
    nights: '1N/2D Stay',
    rating: 4,
    price: '9,499',
    image: 'https://picsum.photos/id/16/1200/800'
  },
  {
    id: 3,
    name: 'Welcomhotel Pine N Peak',
    location: 'Pahalgam',
    nights: '2N/3D Stay',
    rating: 5,
    price: '18,999',
    image: 'https://picsum.photos/id/16/1200/800'
  },
  {
    id: 4,
    name: 'Lidder Spring Boutique Stay',
    location: 'Aru Valley',
    nights: '3N/4D Stay',
    rating: 4,
    price: '12,499',
    image: 'https://picsum.photos/id/16/1200/800'
  },
  {
    id: 5,
    name: 'Vivanta Dal View Srinagar',
    location: 'Kralsangri',
    nights: '2N/3D Stay',
    rating: 5,
    price: '21,999',
    image: 'https://picsum.photos/id/16/1200/800'
  },
  {
    id: 6,
    name: 'Snow Crest Gulmarg Lodge',
    location: 'Gulmarg Bowl',
    nights: '2N/3D Stay',
    rating: 4,
    price: '14,999',
    image: 'https://picsum.photos/id/16/1200/800'
  }
]

const bookingHighlights = [
  'Verified stays with transparent rates',
  'Breakfast and airport transfers available',
  '24x7 travel support in Kashmir',
  'Family, honeymoon, and group-friendly options'
]

export default function HotelBooking() {
  const navigate = useNavigate()

  return (
    <div style={createPageShellStyle('#f5f8fb')}>
      <style>{`
        .hotel-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(224, 185, 106, 0.35);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          color: #f1c969;
          letter-spacing: 3px;
          font-size: 13px;
          font-weight: 700;
          padding: 12px 24px;
        }

        .hotel-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 74px;
          line-height: 1.04;
          margin: 0;
          color: #f5f7fa;
          letter-spacing: -0.7px;
        }

        .hotel-accent {
          color: #f1c969;
        }

        .hotel-hero-panel {
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          padding: 20px;
        }

        .hotel-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          width: 100%;
        }

        .hotel-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 14px 34px rgba(15, 32, 56, 0.11);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          border: 1px solid #e5e9ef;
        }

        .hotel-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 42px rgba(15, 32, 56, 0.16);
        }

        .hotel-card-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 980px) {
          .hotel-layout {
            grid-template-columns: 1fr !important;
          }

          .hotel-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hotel-title {
            font-size: 52px;
          }
        }

        @media (max-width: 680px) {
          .hotel-grid {
            grid-template-columns: 1fr;
          }

          .hotel-title {
            font-size: 42px;
          }
        }
      `}</style>

      <section
        style={{
          background: 'linear-gradient(90deg, #00142f 0%, #04213f 55%, #0a2f45 100%)',
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

          <div className="hotel-layout" style={heroSplitGridStyle}>
            <div>
              <div className="hotel-badge" style={{ marginBottom: '20px' }}>
                <span>🏨</span>
                <span>STAY & RELAX</span>
              </div>

              <h1 className="hotel-title" style={{ maxWidth: '700px', marginBottom: '18px' }}>
                Find Your
                <br />
                <span className="hotel-accent">Perfect Stay.</span>
              </h1>

              <p style={{ fontSize: '17px', lineHeight: 1.65, color: 'rgba(245, 247, 250, 0.74)', maxWidth: '700px', marginBottom: '26px' }}>
                From boutique escapes to five-star palaces, we handpick stays that match your taste, budget, and dreams.
              </p>

              <div style={heroActionRowStyle}>
                <button
                  type="button"
                  onClick={() => navigate('/alltrips')}
                  style={createPrimaryButtonStyle('#f1c969', '#0c1f38')}
                >
                  View Stay Packages
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/services/family-tour')}
                  style={transparentCtaButtonStyle}
                >
                  Plan Full Kashmir Trip
                </button>
              </div>
            </div>

            <div
              className="hotel-hero-panel"
              style={sidePanelAlignStyle}
            >
              <h3 style={{ margin: '0 0 14px', fontSize: '22px', color: '#f6f8fa' }}>Why Book With Us</h3>
              {bookingHighlights.map((item) => (
                <div key={item} style={listPanelRowStyle}>
                  <span style={{ color: '#f1c969', marginTop: '2px' }}>●</span>
                  <p style={{ margin: 0, color: 'rgba(245, 247, 250, 0.9)', fontSize: '14px', lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={standardSectionStyle}>
        <div style={centeredHeadingStyle}>
          <p style={{ color: '#1d3655', letterSpacing: '1.4px', fontSize: '12px', marginBottom: '10px', fontWeight: 700 }}>
            TOP HOTELS IN KASHMIR
          </p>
          <h2 style={{ fontSize: '34px', margin: 0, color: '#0f2946' }}>Handpicked Stays You Can Book With Confidence</h2>
        </div>

        <div className="hotel-grid">
          {kashmirHotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <img src={hotel.image} alt={hotel.name} className="hotel-card-image" />

              <div style={cardBodyStyle}>
                <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: 700, color: '#3f5f89', letterSpacing: '0.6px' }}>
                  {hotel.location} • {hotel.nights}
                </p>

                <h3 style={{ margin: '0 0 10px', fontSize: '20px', color: '#12263e', lineHeight: 1.25 }}>
                  {hotel.name}
                </h3>

                <div style={cardMetaRowStyle}>
                  <p style={{ margin: 0, color: '#f4c430', letterSpacing: '1px', fontSize: '14px' }}>
                    {'★'.repeat(hotel.rating)}{'☆'.repeat(5 - hotel.rating)}
                  </p>
                  <p style={{ margin: 0, color: '#0f2946', fontWeight: 700, fontSize: '18px' }}>
                    INR {hotel.price}
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
                  Book This Stay
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
          <button
            type="button"
            onClick={() => navigate('/all-hotels')}
            style={{
              border: 'none',
              borderRadius: '999px',
              padding: '13px 22px',
              background: 'linear-gradient(90deg, #0b3d66 0%, #1e5c91 100%)',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 12px 26px rgba(11, 61, 102, 0.22)'
            }}
          >
            View All Hotels
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
