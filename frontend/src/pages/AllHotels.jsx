import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { hotelAPI } from '../utils/api'
import {
  backButtonStyle,
  cardBodyStyle,
  cardMetaRowStyle,
  centeredHeadingStyle,
  createPageShellStyle,
  createPrimaryButtonStyle,
  maxWidthContainerStyle,
  standardSectionStyle
} from '../ui/servicePageStyles'

export default function AllHotels() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await hotelAPI.getAll()
        setHotels(data)
      } catch (err) {
        console.error('Error fetching hotels:', err)
        setError('Failed to load hotels from server')
        setHotels([])
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", margin: 0, width: '100%', padding: 0 }}>
      <Navbar />

      <div style={createPageShellStyle('#f4f6f8')}>
        <style>{`
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

          .hotel-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;
            width: 100%;
          }

          @media (max-width: 980px) {
            .hotel-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 680px) {
            .hotel-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <section style={{ ...standardSectionStyle, paddingTop: '24px' }}>
          <div style={maxWidthContainerStyle}>
            <div style={centeredHeadingStyle}>
              <h2 style={{ fontSize: '42px', margin: '0 0 16px', color: '#0f2946' }}>All Kashmir Hotels</h2>
              <p style={{ fontSize: '16px', color: '#3f5f89', maxWidth: '700px', margin: '0 auto' }}>
                Browse through our complete collection of handpicked hotels and stays across Kashmir
              </p>
            </div>

            {/* Search Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '24px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: '#fff',
                  border: '1px solid #d0d6e0',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  width: '100%',
                  maxWidth: '500px',
                  boxShadow: '0 2px 8px rgba(15, 32, 56, 0.08)'
                }}
              >
                <Search width={20} height={20} color="#3f5f89" strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Search hotel name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    color: '#0f2946',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
            </div>
          </div>

          <div className="hotel-grid" style={{ marginTop: '40px', maxWidth: '1200px', margin: '40px auto 0' }}>
            {loading ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
                <p style={{ fontSize: '18px', color: '#3f5f89', margin: 0 }}>Loading hotels...</p>
              </div>
            ) : error ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
                <p style={{ fontSize: '18px', color: '#b42318', margin: 0 }}>{error}</p>
              </div>
            ) : filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
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
                    onClick={() => navigate(`/hotel/${hotel.id}`)}
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
                    View Details
                  </button>
                </div>
              </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
                <p style={{ fontSize: '18px', color: '#3f5f89', margin: 0 }}>No hotels found matching "{searchQuery}"</p>
                <p style={{ fontSize: '14px', color: '#7a8fa5', marginTop: '8px' }}>Please try searching with different keywords</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
