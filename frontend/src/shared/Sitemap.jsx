import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const sectionStyle = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '72px 24px 56px',
}

const cardStyle = {
  background: '#fff',
  borderRadius: '20px',
  boxShadow: '0 20px 60px rgba(15, 23, 42, 0.08)',
  border: '1px solid #e5e7eb',
  padding: '32px',
}

const linkStyle = {
  color: '#0f172a',
  textDecoration: 'none',
  fontWeight: '600',
}

const routeGroups = [
  {
    title: 'Core Pages',
    items: [
      { label: 'Home', to: '/' },
      { label: 'All Trips', to: '/alltrips' },
      { label: 'All Daywise Trips', to: '/all-daywise-trips' },
    ],
  },
  {
    title: 'Services',
    items: [
      { label: 'Family Tour', to: '/services/family-tour' },
      { label: 'Couple Tour', to: '/services/couple-tour' },
      { label: 'Group Tour', to: '/services/group-tour' },
      { label: 'Hotel Booking', to: '/services/hotel-booking' },
      { label: 'Car Rentals', to: '/services/car-rentals' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms of Service', to: '/terms-of-service' },
      { label: 'Feedback', to: '/feedback' },
    ],
  },
]

export default function Sitemap() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />
      <main style={sectionStyle}>
        <div style={{ marginBottom: '28px' }}>
          <p style={{ color: '#3dba8f', fontSize: '12px', fontWeight: '700', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '10px' }}>
            Site Map
          </p>
          <h1 style={{ fontSize: '44px', lineHeight: 1.05, color: '#0f172a', margin: '0 0 12px' }}>Find what you need</h1>
          <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '760px', lineHeight: 1.7, margin: 0 }}>
            Use this directory to jump to the main pages, service routes, and legal pages in the travel app.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {routeGroups.map((group) => (
            <section key={group.title} style={cardStyle}>
              <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 16px' }}>{group.title}</h2>
              <div style={{ display: 'grid', gap: '12px' }}>
                {group.items.map((item) => (
                  <Link key={item.label} to={item.to} style={linkStyle}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
