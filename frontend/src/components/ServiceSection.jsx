import React from 'react'
import { useNavigate } from 'react-router-dom'

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M19.11 17.2c-.28-.14-1.66-.82-1.92-.92-.26-.1-.44-.14-.62.14-.18.28-.71.92-.87 1.1-.16.18-.32.2-.6.06-.28-.14-1.18-.44-2.24-1.4-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.44.12-.58.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.04-.34-.02-.48-.06-.14-.62-1.5-.84-2.06-.22-.54-.44-.46-.62-.46h-.52c-.18 0-.48.06-.74.34-.26.28-1 1-.98 2.44.02 1.44 1.04 2.84 1.18 3.04.14.2 2.04 3.12 4.94 4.38.69.3 1.24.48 1.66.62.7.22 1.34.2 1.84.12.56-.08 1.66-.68 1.9-1.34.24-.66.24-1.22.16-1.34-.08-.12-.26-.18-.54-.32z" />
    <path d="M16.02 3.2c-6.98 0-12.66 5.66-12.66 12.62 0 2.2.58 4.34 1.68 6.22L3.2 28.8l6.94-1.82a12.71 12.71 0 0 0 5.88 1.5h.02c6.98 0 12.66-5.66 12.66-12.62S23.02 3.2 16.02 3.2zm.02 22.98h-.02a10.58 10.58 0 0 1-5.4-1.48l-.38-.22-4.12 1.08 1.1-4-.24-.4a10.46 10.46 0 0 1-1.6-5.52c0-5.78 4.74-10.48 10.58-10.48 5.84 0 10.58 4.7 10.58 10.48S21.88 26.18 16.04 26.18z" />
  </svg>
)

export default function ServiceSection() {
  const navigate = useNavigate()
  const adminWhatsAppNumber = '919149680276'

  const services = [
    {
      image: 'https://picsum.photos/id/10/1200/800',
      tagline: 'FAMILY & FUN',
      title: 'Family Tour',
      desc: 'Comfortable, kid-friendly itineraries with scenic spots, relaxed pacing, and experiences everyone in the family can enjoy.',
      path: '/services/family-tour'
    },
    {
      image: 'https://picsum.photos/id/10/1200/800',
      tagline: 'ROMANCE & ESCAPE',
      title: 'Couple Tour',
      desc: 'Romantic getaways with cozy stays, private sightseeing, and curated moments designed for couples.',
      path: '/services/couple-tour'
    },
    {
      image: 'https://picsum.photos/id/10/1200/800',
      tagline: 'TOGETHER & BOND',
      title: 'Group Tour',
      desc: 'Perfect for friends, families, and teams. Our guided plans make group travel smooth, social, and memorable.',
      path: '/services/group-tour'
    },
    {
      image: 'https://picsum.photos/id/10/1200/800',
      tagline: 'STAY & RELAX',
      title: 'Hotel Booking',
      desc: 'From boutique escapes to five-star resorts, we handpick stays that match your taste and budget.',
      path: '/services/hotel-booking'
    },
    {
      image: 'https://picsum.photos/id/10/1200/800',
      tagline: 'DRIVE & EXPLORE',
      title: 'Car Rentals',
      desc: 'Choose from sedans, SUVs, or convertibles — with or without a driver. GPS included, unlimited...',
      path: '/services/car-rentals'
    }
  ]

  const handleServiceClick = (path) => {
    if (!path) {
      return
    }
    navigate(path)
  }

  const handleWhatsAppClick = (serviceTitle) => {
    const message = encodeURIComponent(`Hi, I want details about ${serviceTitle}.`)
    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${message}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

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
          {services.map((service) => (
            <div
              key={service.title}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open ${service.title}`}
              onClick={() => handleServiceClick(service.path)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleServiceClick(service.path)
                }
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
              {/* Image Banner */}
              <div
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(10, 26, 52, 0.08) 0%, rgba(10, 26, 52, 0.42) 100%), url(${service.image})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  height: '160px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: '10px 12px'
                }}
              >
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    letterSpacing: '1.3px',
                    color: '#ffffff',
                    backgroundColor: 'rgba(10, 26, 52, 0.55)',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    padding: '6px 10px',
                    borderRadius: '999px',
                    textTransform: 'uppercase'
                  }}
                >
                  Kashmir Signature
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: '20px 16px' }}>
                <p style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '1.5px',
                  color: '#56AB91',
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

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#FF9A76',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease',
                      background: 'transparent',
                      border: 'none',
                      padding: 0,
                      cursor: service.path ? 'pointer' : 'default'
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleServiceClick(service.path)
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
                  </button>

                  <button
                    type="button"
                    style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#fff',
                      background: '#25D366',
                      border: 'none',
                      borderRadius: '999px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginLeft: 'auto'
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleWhatsAppClick(service.title)
                    }}
                    aria-label={`Get enquiry on WhatsApp for ${service.title}`}
                  >
                    <WhatsAppIcon />
                    Get Enquiry
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
