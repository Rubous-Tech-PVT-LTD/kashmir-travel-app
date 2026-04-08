import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../shared/Footer'
import { carRentalAPI } from '../utils/api'
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
} from '../ui/servicePageStyles'

const rentalHighlights = [
  'With-driver and self-drive options',
  'Local verified drivers for mountain routes',
  'Transparent per-day pricing with no hidden fees',
  'Pickup and drop from airport, hotel, or houseboat'
]

export default function CarRentals() {
  const navigate = useNavigate()
  const [rentalFleet, setRentalFleet] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const handleWhatsAppEnquiry = (car) => {
    const phoneNumber = '919999999999'
    const message = `Hi, I want to enquire about ${car.name} (${car.type}) for ${car.route}. Please share availability and final price.`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    const fetchCarRentals = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await carRentalAPI.getAll()
        setRentalFleet(data)
      } catch (err) {
        console.error('Error fetching car rentals:', err)
        setError('Failed to load car rentals from server')
        setRentalFleet([])
      } finally {
        setLoading(false)
      }
    }

    fetchCarRentals()
  }, [])

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
          {loading ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontSize: '18px', color: '#3f5f89', margin: 0 }}>Loading car rentals...</p>
            </div>
          ) : error ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontSize: '18px', color: '#b42318', margin: 0 }}>{error}</p>
            </div>
          ) : rentalFleet.length > 0 ? (
            rentalFleet.map((car) => (
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
                    onClick={() => handleWhatsAppEnquiry(car)}
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
                    Get WhatsApp Enquiry
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontSize: '18px', color: '#3f5f89', margin: 0 }}>No car rentals available right now</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
