import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

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
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-8">
          <p className="text-emerald-500 text-xs font-bold tracking-widest uppercase mb-2">
            Site Map
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-3 leading-tight">
            Find what you need
          </h1>

          <p className="text-slate-500 text-base max-w-2xl leading-7">
            Use this directory to jump to the main pages, service routes, and legal pages in the travel app.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {routeGroups.map((group) => (
            <section
              key={group.title}
              className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                {group.title}
              </h2>

              <div className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="font-semibold text-slate-800 hover:text-emerald-500 transition"
                  >
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