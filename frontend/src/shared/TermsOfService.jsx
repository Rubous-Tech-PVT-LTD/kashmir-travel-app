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

export default function TermsOfService() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />
      <main style={sectionStyle}>
        <div style={{ marginBottom: '28px' }}>
          <p style={{ color: '#3dba8f', fontSize: '12px', fontWeight: '700', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '10px' }}>
            Legal
          </p>
          <h1 style={{ fontSize: '44px', lineHeight: 1.05, color: '#0f172a', margin: '0 0 12px' }}>Terms of Service</h1>
          <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '760px', lineHeight: 1.7, margin: 0 }}>
            These terms describe the basic rules for using the Kashmir Tour Travel website and booking travel-related services through it.
          </p>
        </div>

        <div style={{ ...cardStyle, display: 'grid', gap: '24px' }}>
          <section>
            <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 10px' }}>Use of the website</h2>
            <p style={{ color: '#475569', lineHeight: 1.75, margin: 0 }}>
              You agree to use the site only for lawful purposes. Do not attempt to disrupt the site, collect data without permission, or submit false booking information.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 10px' }}>Bookings and quotations</h2>
            <p style={{ color: '#475569', lineHeight: 1.75, margin: 0 }}>
              Any itinerary, fare, or package quotation shown on the site is informational until confirmed by our team. Final inclusions, pricing, and availability may change based on season, suppliers, and travel dates.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 10px' }}>Intellectual property</h2>
            <p style={{ color: '#475569', lineHeight: 1.75, margin: 0 }}>
              The text, layout, visuals, and code used on this website are owned by Kashmir Tour Travel unless otherwise stated. You may not copy or redistribute them without permission.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 10px' }}>Limitation of liability</h2>
            <p style={{ color: '#475569', lineHeight: 1.75, margin: 0 }}>
              We work to keep the information accurate, but travel conditions can change. We are not responsible for losses caused by third-party disruptions, weather, transportation delays, or incomplete information supplied by users.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 10px' }}>Contact</h2>
            <p style={{ color: '#475569', lineHeight: 1.75, margin: '0 0 8px' }}>
              Questions about these terms can be sent to <a href="mailto:info@kashmirtourtravel.com" style={{ color: '#3dba8f', textDecoration: 'none' }}>info@kashmirtourtravel.com</a>.
            </p>
            <p style={{ color: '#475569', lineHeight: 1.75, margin: 0 }}>
              +91-7006259761
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
