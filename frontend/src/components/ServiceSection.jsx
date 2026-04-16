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
      image: 'https://i.ibb.co/DfbJP98Q/OIP.webp',
      tagline: 'FAMILY & FUN',
      title: 'Family Tour',
      desc: 'Comfortable, kid-friendly itineraries with scenic spots, relaxed pacing, and experiences everyone in the family can enjoy.',
      path: '/services/family-tour'
    },
    {
      image: 'https://i.ibb.co/cXxKzH6x/OIP.webp',
      tagline: 'ROMANCE & ESCAPE',
      title: 'Couple Tour',
      desc: 'Romantic getaways with cozy stays, private sightseeing, and curated moments designed for couples.',
      path: '/services/couple-tour'
    },
    {
      image: 'https://i.ibb.co/vCyq3RJn/OIP.webp',
      tagline: 'TOGETHER & BOND',
      title: 'Group Tour',
      desc: 'Perfect for friends, families, and teams. Our guided plans make group travel smooth, social, and memorable.',
      path: '/services/group-tour'
    },
    {
      image: 'https://i.ibb.co/FkpB4YsD/facade.jpg',
      tagline: 'STAY & RELAX',
      title: 'Hotel Booking',
      desc: 'From boutique escapes to five-star resorts, we handpick stays that match your taste and budget.',
      path: '/services/hotel-booking'
    },
    {
      image: 'https://i.ibb.co/hFgSc0Xq/OIP.webp',
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
    <section className="w-full bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-300">
        <h2 className="mb-10 text-center text-4xl font-bold tracking-[-0.5px] text-[#1a2b4a]">
          Explore Our Services
        </h2>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
            >
              <div
                className="flex h-40 items-start justify-start bg-cover bg-center p-3"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(10, 26, 52, 0.08) 0%, rgba(10, 26, 52, 0.42) 100%), url(${service.image})` }}
              >
                <span className="rounded-full border border-white/35 bg-[#0a1a348c] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[1.3px] text-white">
                  Kashmir Signature
                </span>
              </div>

              <div className="p-4">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#56AB91]">
                  {service.tagline}
                </p>

                <h3 className="mb-3 text-xl font-bold leading-tight text-[#1a2b4a]">
                  {service.title}
                </h3>

                <p className="mb-4 min-h-11.25 text-xs leading-relaxed text-gray-400">
                  {service.desc}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <button
                    type="button"
                    className="group inline-flex items-center gap-1.5 bg-transparent p-0 text-xs font-semibold text-[#FF9A76] transition-all duration-200 hover:gap-2.5"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleServiceClick(service.path)
                    }}
                  >
                    Explore
                    <span className="text-base">→</span>
                  </button>

                  <button
                    type="button"
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2 text-xs font-bold text-white"
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
