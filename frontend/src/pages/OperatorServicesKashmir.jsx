import { Link } from 'react-router-dom'
import Footer from '../shared/Footer'

const services = [
  {
    title: 'Custom Tour Planning',
    desc: 'Day-wise plans for families, honeymooners, and groups with flexible pace and seasonal recommendations.',
    image: '/images/general.jpg',
  },
  {
    title: 'Hotel and Houseboat Booking',
    desc: 'Handpicked stays in Srinagar, Gulmarg, Pahalgam, and Sonmarg with transparent options for every budget.',
    image: '/images/hotel.jpg',
  },
  {
    title: 'Local Transport and Pickup',
    desc: 'Airport transfers, sightseeing cabs, and intercity travel with experienced local drivers.',
    image: '/images/shikara.jpg',
  },
  {
    title: 'Adventure Activities',
    desc: 'Pre-arranged gondola rides, skiing, rafting, and guided adventure slots with local support.',
    image: '/images/gondola.jpg',
  },
]

const supportPoints = [
  '24/7 on-trip assistance by local operators',
  'Route optimization based on weather and traffic',
  'Permits and activity slot guidance where required',
  'Quick support for date, stay, and transport updates',
]

const adminWhatsappNumber = '917006259761'
const whatsappMessage = encodeURIComponent('Hi Admin, I want a service plan for my Kashmir trip.')
const adminWhatsappAppLink = `whatsapp://send?phone=${adminWhatsappNumber}&text=${whatsappMessage}`
const adminWhatsappWebLink = `https://wa.me/${adminWhatsappNumber}?text=${whatsappMessage}`

export default function OperatorServicesKashmir() {
  const openAdminWhatsapp = (event) => {
    event.preventDefault()
    window.location.href = adminWhatsappAppLink

    window.setTimeout(() => {
      if (document.hasFocus()) {
        window.open(adminWhatsappWebLink, '_blank', 'noopener,noreferrer')
      }
    }, 700)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f7fbff 0%, #eef5ff 100%)' }}>
      <style>{`
        .ops-hero {
          position: relative;
          overflow: hidden;
          color: #fff;
          background:
            linear-gradient(120deg, rgba(10, 25, 47, 0.92) 0%, rgba(20, 57, 95, 0.88) 45%, rgba(17, 97, 117, 0.8) 100%),
            url('/images/general.jpg') center/cover no-repeat;
          padding: 90px 24px 96px;
        }

        .ops-float {
          position: absolute;
          border-radius: 999px;
          filter: blur(1px);
          animation: opsFloat 7s ease-in-out infinite;
        }

        .ops-float.one {
          width: 260px;
          height: 260px;
          left: -80px;
          top: -70px;
          background: radial-gradient(circle, rgba(125, 211, 252, 0.35) 0%, rgba(125, 211, 252, 0) 70%);
        }

        .ops-float.two {
          width: 320px;
          height: 320px;
          right: -100px;
          bottom: -120px;
          background: radial-gradient(circle, rgba(110, 231, 183, 0.25) 0%, rgba(110, 231, 183, 0) 72%);
          animation-delay: 1.2s;
        }

        @keyframes opsFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }

        .ops-grid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
          padding: 42px 24px 18px;
        }

        .ops-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid #dbe7f7;
          box-shadow: 0 16px 36px rgba(17, 47, 85, 0.12);
          transform: translateY(0);
          transition: transform 240ms ease, box-shadow 240ms ease;
        }

        .ops-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 40px rgba(13, 45, 84, 0.16);
        }

        .ops-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
        }

        .ops-section {
          max-width: 1180px;
          margin: 0 auto;
          padding: 22px 24px 74px;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 22px;
        }

        .ops-panel {
          background: #ffffff;
          border: 1px solid #dbe7f7;
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 16px 34px rgba(17, 47, 85, 0.1);
        }

        @media (max-width: 940px) {
          .ops-grid {
            grid-template-columns: 1fr;
          }

          .ops-section {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="ops-hero">
        <div className="ops-float one" />
        <div className="ops-float two" />

        <div style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative' }}>
          <p style={{ margin: '0 0 10px', letterSpacing: '1.7px', fontSize: '12px', color: '#bfdbfe', fontWeight: 700 }}>
            FULL-SERVICE LOCAL OPERATOR
          </p>
          <h1 style={{ margin: '0 0 14px', fontSize: '52px', lineHeight: 1.05, maxWidth: '760px' }}>
            Operator Services in Kashmir
          </h1>
          <p style={{ margin: '0 0 28px', color: '#dbeafe', lineHeight: 1.8, fontSize: '16px', maxWidth: '750px' }}>
            We manage your entire Kashmir travel flow - planning, stays, transport, activities, and support - so you enjoy the mountains without operational stress.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href={adminWhatsappWebLink}
              onClick={openAdminWhatsapp}
              style={{
                textDecoration: 'none',
                background: '#22c55e',
                color: '#042f2e',
                padding: '12px 18px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '14px',
              }}
            >
              Request Service Plan
            </a>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.16)',
                color: '#fff',
                padding: '12px 18px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '14px',
                border: '1px solid rgba(255,255,255,0.28)',
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <section className="ops-grid">
        {services.map((service) => (
          <article className="ops-card" key={service.title}>
            <img src={service.image} alt={service.title} className="ops-img" />
            <div style={{ padding: '18px 18px 20px' }}>
              <h3 style={{ margin: '0 0 10px', color: '#0f2a46', fontSize: '23px' }}>{service.title}</h3>
              <p style={{ margin: 0, color: '#475569', fontSize: '15px', lineHeight: 1.7 }}>{service.desc}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="ops-section">
        <div className="ops-panel">
          <p style={{ margin: '0 0 8px', color: '#0f766e', letterSpacing: '1.4px', fontSize: '12px', fontWeight: 700 }}>
            HOW WE OPERATE
          </p>
          <h2 style={{ margin: '0 0 14px', color: '#0f2a46', fontSize: '31px' }}>On-ground support that stays with you</h2>
          <p style={{ margin: 0, color: '#475569', lineHeight: 1.8, fontSize: '15px' }}>
            From your first message to final airport drop, our team coordinates hotels, car movement, local guides, and activity timing.
            We keep your trip practical, comfortable, and safe across changing weather and traffic conditions.
          </p>
        </div>

        <div className="ops-panel" style={{ background: 'linear-gradient(180deg, #0f2a46 0%, #123c56 100%)', borderColor: '#1b4d70' }}>
          <h3 style={{ margin: '0 0 14px', color: '#f8fafc', fontSize: '22px' }}>Included Support</h3>
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#dbeafe', lineHeight: 1.85, fontSize: '15px' }}>
            {supportPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  )
}
