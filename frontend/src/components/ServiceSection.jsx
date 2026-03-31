import React from 'react'

export default function ServiceSection() {
  const services = [
    {
      icon: '👨‍👩‍👧‍👦',
      tagline: 'FAMILY & FUN',
      title: 'Family Tour',
      desc: 'Comfortable, kid-friendly itineraries with scenic spots, relaxed pacing, and experiences everyone in the family can enjoy.',
      gradient: 'linear-gradient(180deg, #FFE29F 0%, #FFA99F 100%)',
      borderColor: 'none'
    },
    {
      icon: '💑',
      tagline: 'ROMANCE & ESCAPE',
      title: 'Couple Tour',
      desc: 'Romantic getaways with cozy stays, private sightseeing, and curated moments designed for couples.',
      gradient: 'linear-gradient(180deg, #FFD1DC 0%, #F6A5C0 100%)',
      borderColor: 'none'
    },
    {
      icon: '👥',
      tagline: 'TOGETHER & BOND',
      title: 'Group Tour',
      desc: 'Perfect for friends, families, and teams. Our guided plans make group travel smooth, social, and memorable.',
      gradient: 'linear-gradient(180deg, #E6D4FF 0%, #B19CD9 100%)',
      borderColor: 'none'
    },
    {
      icon: '🏨',
      tagline: 'STAY & RELAX',
      title: 'Hotel Booking',
      desc: 'From boutique escapes to five-star resorts, we handpick stays that match your taste and budget.',
      gradient: 'linear-gradient(180deg, #A8E6CF 0%, #56AB91 100%)',
      borderColor: 'none'
    },
    {
      icon: '🚗',
      tagline: 'DRIVE & EXPLORE',
      title: 'Car Rentals',
      desc: 'Choose from sedans, SUVs, or convertibles — with or without a driver. GPS included, unlimited...',
      gradient: 'linear-gradient(180deg, #FFD4B4 0%, #FF9A76 100%)',
      borderColor: 'none'
    }
  ]

  return (
    <section style={{ padding: '40px 24px', backgroundColor: '#f3f4f6', width: '100%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#1a2b4a',
          textAlign: 'center',
          marginBottom: '40px',
          letterSpacing: '-0.5px'
        }}>
          Explore Our Services
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          width: '100%'
        }}>
          {services.map((service, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
                transition: 'all 0.3s ease',
                border: service.borderColor !== 'none' ? `3px solid ${service.borderColor}` : 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Gradient Background with Icon */}
              <div
                style={{
                  background: service.gradient,
                  height: '160px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px'
                }}
              >
                {service.icon}
              </div>

              {/* Content */}
              <div style={{ padding: '20px 16px' }}>
                <p style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '1.5px',
                  color: service.borderColor !== 'none' ? service.borderColor : '#56AB91',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>
                  {service.tagline}
                </p>

                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1a2b4a',
                  margin: '0 0 12px 0',
                  lineHeight: '1.2'
                }}>
                  {service.title}
                </h3>

                <p style={{
                  fontSize: '12px',
                  color: '#9CA3AF',
                  lineHeight: '1.5',
                  marginBottom: '16px',
                  minHeight: '45px'
                }}>
                  {service.desc}
                </p>

                <a
                  href="#"
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: service.borderColor !== 'none' ? service.borderColor : '#FF9A76',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = '10px'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = '6px'
                  }}
                >
                  Explore
                  <span style={{ fontSize: '16px' }}>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
