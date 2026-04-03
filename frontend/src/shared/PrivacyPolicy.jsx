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

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />
      <main style={sectionStyle}>
        <div style={{ marginBottom: '28px' }}>
          <p style={{ color: '#3dba8f', fontSize: '12px', fontWeight: '700', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '10px' }}>
            Legal
          </p>
          <h1 style={{ fontSize: '44px', lineHeight: 1.05, color: '#0f172a', margin: '0 0 12px' }}>Privacy Policy</h1>
          <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '760px', lineHeight: 1.7, margin: 0 }}>
            This page explains how Kashmir Tour Travel collects and uses information when you contact us, request a quote, or browse our site.
          </p>
        </div>

        <div style={{ ...cardStyle, display: 'grid', gap: '24px' }}>
          <section>
            <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 10px' }}>Information we collect</h2>
            <p style={{ color: '#475569', lineHeight: 1.75, margin: 0 }}>
              We may collect your name, phone number, email address, trip preferences, and any details you submit through contact or booking forms. We may also collect basic technical data such as browser type and pages visited to help us improve the site.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 10px' }}>How we use it</h2>
            <ul style={{ color: '#475569', lineHeight: 1.8, margin: 0, paddingLeft: '20px' }}>
              <li>To respond to inquiries and prepare tour quotations.</li>
              <li>To arrange travel support, bookings, and customer assistance.</li>
              <li>To improve our website, services, and communication.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 10px' }}>Sharing and security</h2>
            <p style={{ color: '#475569', lineHeight: 1.75, margin: 0 }}>
              We do not sell your personal information. We only share it with trusted service providers when needed to deliver a booking or support request. Reasonable safeguards are used to protect the data we hold, but no online transmission is completely secure.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 10px' }}>Contact</h2>
            <p style={{ color: '#475569', lineHeight: 1.75, margin: '0 0 8px' }}>
              For privacy questions, email <a href="mailto:info@kashmirtourtravel.com" style={{ color: '#3dba8f', textDecoration: 'none' }}>info@kashmirtourtravel.com</a>.
            </p>
            <p style={{ color: '#475569', lineHeight: 1.75, margin: 0 }}>
              Humham Near Masjid Muhammadi, Budgam Road, Srinagar, J&K, India - 190021
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
