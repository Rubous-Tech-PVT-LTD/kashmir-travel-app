import { Link } from 'react-router-dom'

const websiteUrl = 'https://www.habakhatoontravels.com'

const quickLinks = [
  { label: 'About Us', to: '/' },
  { label: 'Operator Services in Kashmir', to: '/services/group-tour' },
  { label: 'Kashmir Trips & Itineraries', to: '/all-daywise-trips' },
  { label: 'Kashmir Honeymoon', to: '/all-daywise-trips?theme=honeymoon' },
  { label: 'Hotels', to: '/services/hotel-booking' },
  { label: 'Car Rental', to: '/services/car-rentals' },
  { label: 'Travel Blog', to: '/alltrips' },
  { label: 'Contact Us', href: 'mailto:info@habakhatoontravels.com' },
]

const popularPackages = [
  { label: '3 Days Kashmir Tour', to: '/all-daywise-trips?days=3' },
  { label: '5 Days Family Tour', to: '/all-daywise-trips?days=5&theme=family' },
  { label: '7 Days Complete Tour', to: '/all-daywise-trips?days=7' },
  { label: '6 Days Honeymoon', to: '/all-daywise-trips?days=6&theme=honeymoon' },
  { label: 'Adventure Tour', to: '/all-daywise-trips?theme=adventure' },
  { label: 'Srinagar-Gulmarg-Pahalgam', to: '/trips/3' },
]

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms-of-service' },
  { label: 'Sitemap', to: '/sitemap' },
]

const shareLinks = [
  {
    label: 'Facebook',
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}`,
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(websiteUrl)}&text=${encodeURIComponent('Haba Khatoon Travels')}`,
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'mailto:info@habakhatoontravels.com',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(websiteUrl)}`,
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(websiteUrl)}`,
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const renderLink = (item) => {
    if (item.to) {
      return (
        <Link
          key={item.label}
          to={item.to}
          className="block py-1.5 text-sm text-slate-400 no-underline transition-all duration-200 hover:text-emerald-400 hover:pl-1 focus-visible:text-emerald-400 focus-visible:outline-none font-['DM_Sans']"
        >
          {item.label}
        </Link>
      )
    }

    return (
      <a
        key={item.label}
        href={item.href}
        className="block py-1.5 text-sm text-slate-400 no-underline transition-all duration-200 hover:text-emerald-400 hover:pl-1 focus-visible:text-emerald-400 focus-visible:outline-none font-['DM_Sans']"
      >
        {item.label}
      </a>
    )
  }

  return (
    <footer className="bg-slate-900 text-slate-300 font-['DM_Sans'] pt-16">
      <div className="max-w-6xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14">

          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            {/* Logo area */}
            <div className="mb-5">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-xl font-bold text-white tracking-tight">
                  Kashmir{" "}
                  <span className="text-emerald-400">Tour</span>{" "}
                  <span className="text-slate-200">Travel</span>
                </span>
              </div>
              <div className="text-xs text-slate-500 font-normal tracking-wide italic">
                Unit of Himalaya Travels
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-3.5">
              Haba Khatoon Travels
            </h3>

            <p className="text-slate-400 text-sm leading-7 font-light mb-7 max-w-xs">
              Your trusted travel partner for unforgettable Kashmir experiences. We specialize in customized tours, hotel bookings, and authentic local experiences.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2.5">
              {shareLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="w-10 h-10 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-slate-400 cursor-pointer transition-all duration-300 hover:bg-emerald-400 hover:border-emerald-400 hover:text-white hover:-translate-y-1 no-underline"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  title={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4.5 tracking-wide">Quick Links</h4>
            <div className="w-9 h-0.5 bg-emerald-400 rounded-sm mb-6" />
            <nav>
              {quickLinks.map(renderLink)}
            </nav>
          </div>

          {/* Column 3 — Popular Packages */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4.5 tracking-wide">Popular Packages</h4>
            <div className="w-9 h-0.5 bg-emerald-400 rounded-sm mb-6" />
            <nav>
              {popularPackages.map(renderLink)}
            </nav>
          </div>

          {/* Column 4 — Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4.5 tracking-wide">Contact Info</h4>
            <div className="w-9 h-0.5 bg-emerald-400 rounded-sm mb-6" />

            {/* Address */}
            <div className="flex items-start gap-3 mb-4">
              <svg className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="text-slate-400 text-sm leading-relaxed font-normal">
                Humham Near Masjid Muhammadi, Budgam Road,<br />
                Srinagar, J&K, India - 190021
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 mb-4">
              <svg className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
              </svg>
              <span className="text-slate-400 text-sm leading-relaxed font-normal">
                <a href="tel:+917006259761" className="text-slate-400 no-underline transition-colors duration-200 hover:text-emerald-400">+91-7006259761</a>
              </span>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 mb-4">
              <svg className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="text-slate-400 text-sm leading-relaxed font-normal">
                <a href="mailto:info@habakhatoontravels.com" className="text-slate-400 no-underline transition-colors duration-200 hover:text-emerald-400">info@habakhatoontravels.com</a>
              </span>
            </div>

            {/* Website */}
            <div className="flex items-start gap-3 mb-4">
              <svg className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <span className="text-slate-400 text-sm leading-relaxed font-normal">
                <a href="https://www.habakhatoontravels.com" target="_blank" rel="noreferrer" className="text-slate-400 no-underline transition-colors duration-200 hover:text-emerald-400">
                  www.habakhatoontravels.com
                </a>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.07] bg-slate-950">
        <div className="max-w-6xl mx-auto px-10 py-4.5 flex flex-wrap justify-between items-center gap-3">
          <p className="text-slate-600 text-xs m-0 font-normal">
            © {new Date().getFullYear()} Haba Khatoon Travels. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-slate-600 text-xs no-underline transition-colors duration-200 hover:text-emerald-400"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}