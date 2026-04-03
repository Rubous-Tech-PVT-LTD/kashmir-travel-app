import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import {
  backButtonStyle,
  cardBodyStyle,
  cardMetaRowStyle,
  centeredHeadingStyle,
  createPageShellStyle,
  createPrimaryButtonStyle,
  maxWidthContainerStyle,
  standardSectionStyle
} from '../shared/servicePageStyles'

const kashmirHotels = [
  {
    id: 1,
    name: 'The Khyber Himalayan Resort',
    location: 'Gulmarg',
    nights: '2N/3D Stay',
    rating: 5,
    price: '24,999',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Kareem Houseboat Retreat',
    location: 'Dal Lake, Srinagar',
    nights: '1N/2D Stay',
    rating: 4,
    price: '9,499',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Welcomhotel Pine N Peak',
    location: 'Pahalgam',
    nights: '2N/3D Stay',
    rating: 5,
    price: '18,999',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Lidder Spring Boutique Stay',
    location: 'Aru Valley',
    nights: '3N/4D Stay',
    rating: 4,
    price: '12,499',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Vivanta Dal View Srinagar',
    location: 'Kralsangri',
    nights: '2N/3D Stay',
    rating: 5,
    price: '21,999',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Snow Crest Gulmarg Lodge',
    location: 'Gulmarg Bowl',
    nights: '2N/3D Stay',
    rating: 4,
    price: '14,999',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    name: 'Radisson Srinagar',
    location: 'Boulevard Road',
    nights: '2N/3D Stay',
    rating: 4,
    price: '16,999',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    name: 'The Chinar Resort',
    location: 'Pahalgam',
    nights: '2N/3D Stay',
    rating: 4,
    price: '13,999',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 9,
    name: 'Hotel Himalaya',
    location: 'Srinagar City',
    nights: '1N/2D Stay',
    rating: 3,
    price: '7,999',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 10,
    name: 'Fern Hill Resort',
    location: 'Gulmarg',
    nights: '2N/3D Stay',
    rating: 5,
    price: '19,999',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 11,
    name: 'Grand Heritage Houseboat',
    location: 'Dal Lake, Srinagar',
    nights: '1N/2D Stay',
    rating: 5,
    price: '11,499',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 12,
    name: 'Pine View Retreat',
    location: 'Aru Valley',
    nights: '3N/4D Stay',
    rating: 4,
    price: '15,499',
    image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=900&q=80'
  }
]

export default function AllHotels() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredHotels = kashmirHotels.filter((hotel) =>
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
            {filteredHotels.length > 0 ? (
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
