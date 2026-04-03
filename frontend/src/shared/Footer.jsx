import { Link } from 'react-router-dom'

const websiteUrl = 'https://www.kashmirtourtravel.com'

const quickLinks = [
  { label: 'About Us', to: '/' },
  { label: 'Operator Services in Kashmir', to: '/services/group-tour' },
  { label: 'Kashmir Trips & Itineraries', to: '/all-daywise-trips' },
  { label: 'Kashmir Honeymoon', to: '/all-daywise-trips?theme=honeymoon' },
  { label: 'Hotels', to: '/services/hotel-booking' },
  { label: 'Car Rental', to: '/services/car-rentals' },
  { label: 'Travel Blog', to: '/alltrips' },
  { label: 'Contact Us', href: 'mailto:info@kashmirtourtravel.com' },
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
    href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(websiteUrl)}&text=${encodeURIComponent('Kashmir Tour Travel')}`,
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'mailto:info@kashmirtourtravel.com',
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
        <Link key={item.label} to={item.to} className="footer-link">
          {item.label}
        </Link>
      )
    }

    return (
      <a key={item.label} href={item.href} className="footer-link">
        {item.label}
      </a>
    )
  }
 
  return (
    <footer
      style={{
        backgroundColor: "#0f1923",
        color: "#cbd5e1",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        padding: "64px 0 0",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
 
        .footer-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.5;
          transition: color 0.2s ease, padding-left 0.2s ease;
          display: block;
          padding: 5px 0;
        }
        .footer-link:hover,
        .footer-link:focus-visible {
          color: #3dba8f;
          padding-left: 4px;
          outline: none;
        }
        .social-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
        }
        .social-btn:hover {
          background: #3dba8f;
          border-color: #3dba8f;
          color: #fff;
          transform: translateY(-3px);
        }
        .contact-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }
        .contact-icon {
          width: 18px;
          height: 18px;
          color: #3dba8f;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .contact-text {
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.6;
          font-weight: 400;
        }
        .contact-text a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.2s;
        }
        .contact-text a:hover { color: #3dba8f; }
        .footer-heading {
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 18px;
          letter-spacing: 0.2px;
        }
        .green-bar {
          width: 36px;
          height: 3px;
          background: #3dba8f;
          border-radius: 2px;
          margin-bottom: 24px;
        }
      `}</style>
 
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
          gap: "48px",
          paddingBottom: "56px",
        }}>
 
          {/* Column 1 — Brand */}
          <div>
            {/* Logo area */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <span style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#fff",
                  letterSpacing: "-0.2px",
                }}>
                  Kashmir{" "}
                  <span style={{ color: "#3dba8f" }}>Tour</span>{" "}
                  <span style={{ color: "#e2e8f0" }}>Travel</span>
                </span>
              </div>
              <div style={{
                fontSize: "11px",
                color: "#64748b",
                fontWeight: "400",
                letterSpacing: "0.3px",
                fontStyle: "italic",
              }}>
                Unit of Himalaya Travels
              </div>
            </div>
 
            <h3 style={{
              fontSize: "17px",
              fontWeight: "700",
              color: "#fff",
              margin: "0 0 14px",
            }}>
              Kashmir Tour Travel
            </h3>
 
            <p style={{
              color: "#94a3b8",
              fontSize: "14px",
              lineHeight: "1.75",
              fontWeight: "300",
              margin: "0 0 28px",
              maxWidth: "280px",
            }}>
              Your trusted travel partner for unforgettable Kashmir experiences. We specialize in customized tours, hotel bookings, and authentic local experiences.
            </p>
 
            {/* Social Icons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {shareLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="social-btn"
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
            <h4 className="footer-heading">Quick Links</h4>
            <div className="green-bar" />
            <nav>
              {quickLinks.map(renderLink)}
            </nav>
          </div>
 
          {/* Column 3 — Popular Packages */}
          <div>
            <h4 className="footer-heading">Popular Packages</h4>
            <div className="green-bar" />
            <nav>
              {popularPackages.map(renderLink)}
            </nav>
          </div>
 
          {/* Column 4 — Contact Info */}
          <div>
            <h4 className="footer-heading">Contact Info</h4>
            <div className="green-bar" />
 
            {/* Address */}
            <div className="contact-row">
              <svg className="contact-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="contact-text">
                Humham Near Masjid Muhammadi, Budgam Road,<br />
                Srinagar, J&K, India - 190021
              </span>
            </div>
 
            {/* Phone */}
            <div className="contact-row">
              <svg className="contact-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
              </svg>
              <span className="contact-text">
                <a href="tel:+917006259761">+91-7006259761</a>
              </span>
            </div>
 
            {/* Email */}
            <div className="contact-row">
              <svg className="contact-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="contact-text">
                <a href="mailto:info@kashmirtourtravel.com">info@kashmirtourtravel.com</a>
              </span>
            </div>
 
            {/* Website */}
            <div className="contact-row">
              <svg className="contact-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <span className="contact-text">
                <a href="https://www.kashmirtourtravel.com" target="_blank" rel="noreferrer">
                  www.kashmirtourtravel.com
                </a>
              </span>
            </div>
          </div>
 
        </div>
      </div>
 
      {/* Bottom Bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        backgroundColor: "#0a1118",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "18px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <p style={{ color: "#475569", fontSize: "13px", margin: 0, fontWeight: "400" }}>
            © {new Date().getFullYear()} Kashmir Tour Travel. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                style={{
                  color: "#475569",
                  fontSize: "13px",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#3dba8f"}
                onMouseLeave={e => e.currentTarget.style.color = "#475569"}
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