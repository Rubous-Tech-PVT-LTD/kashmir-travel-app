import { Link } from 'react-router-dom'
import Footer from '../shared/Footer'

const services = [
  {
    title: 'Custom Tour Planning',
    desc: 'Day-wise plans for families, honeymooners, and groups with flexible pace and seasonal recommendations.',
    image: '/images/operator/tour-planning.jpg',
  },
  {
    title: 'Hotel and Houseboat Booking',
    desc: 'Handpicked stays in Srinagar, Gulmarg, Pahalgam, and Sonmarg with transparent options for every budget.',
    image: '/images/operator/hotels-stays.jpg',
  },
  {
    title: 'Local Transport and Pickup',
    desc: 'Airport transfers, sightseeing cabs, and intercity travel with experienced local drivers.',
    image: '/images/operator/local-transport.jpg',
  },
  {
    title: 'Adventure Activities',
    desc: 'Pre-arranged gondola rides, skiing, rafting, and guided adventure slots with local support.',
    image: '/images/operator/adventure-fun.jpg',
  },
]

const supportPoints = [
  '24/7 on-trip assistance by local operators',
  'Route optimization based on weather and traffic',
  'Permits and activity slot guidance where required',
  'Quick support for date, stay, and transport updates',
]

const adminWhatsappNumber = '919149680276'
const whatsappMessage = encodeURIComponent('Hi Admin, I want a service plan for my Kashmir trip.')
const adminWhatsappAppLink = `whatsapp://send?phone=${adminWhatsappNumber}&text=${whatsappMessage}`
const adminWhatsappWebLink = `https://wa.me/${adminWhatsappNumber}?text=${whatsappMessage}`

export default function OperatorServicesKashmir() {
  const openAdminWhatsapp = (event) => {
    event.preventDefault()
    window.location.href = adminWhatsappAppLink

    setTimeout(() => {
      if (document.hasFocus()) {
        window.open(adminWhatsappWebLink, '_blank', 'noopener,noreferrer')
      }
    }, 700)
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f7fbff] to-[#eef5ff]">

      {/* HERO */}
      <section className="relative overflow-hidden text-white bg-[linear-gradient(120deg,rgba(10,25,47,0.92),rgba(20,57,95,0.88),rgba(17,97,117,0.8)),url('/images/general.jpg')] bg-cover bg-center py-24 px-6">

        {/* Floating blobs */}
        <div className="absolute w-65 h-65 -left-20 -top-16 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.35),transparent)] animate-pulse"></div>
        <div className="absolute w-[320px] h-80 -right-24 -bottom-28 rounded-full bg-[radial-gradient(circle,rgba(110,231,183,0.25),transparent)] animate-pulse"></div>

        <div className="max-w-295 mx-auto relative">
          <p className="mb-2 text-xs tracking-[1.7px] text-blue-200 font-bold">
            FULL-SERVICE LOCAL OPERATOR
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-190 mb-4">
            Operator Services in Kashmir
          </h1>

          <p className="text-blue-100 max-w-187.5 leading-7 mb-7">
            We manage your entire Kashmir travel flow - planning, stays, transport, activities, and support - so you enjoy the mountains without operational stress.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={adminWhatsappWebLink}
              onClick={openAdminWhatsapp}
              className="bg-green-500 text-teal-900 px-5 py-3 rounded-lg font-semibold text-sm"
            >
              Request Service Plan
            </a>

            <Link
              to="/"
              className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-lg font-semibold text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="max-w-295 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-10">
        {services.map((service) => (
          <article
            key={service.title}
            className="bg-white rounded-2xl overflow-hidden border border-blue-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-55 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-[#0f2a46] mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          </article>
        ))}
      </section>

      {/* SUPPORT SECTION */}
      <section className="max-w-295 mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-6 px-6 pb-16">

        {/* LEFT */}
        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-lg">
          <p className="text-xs tracking-wide text-teal-700 font-bold mb-2">
            HOW WE OPERATE
          </p>
          <h2 className="text-2xl font-semibold text-[#0f2a46] mb-3">
            On-ground support that stays with you
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            From your first message to final airport drop, our team coordinates hotels, car movement, local guides, and activity timing.
            We keep your trip practical, comfortable, and safe across changing weather and traffic conditions.
          </p>
        </div>

        {/* RIGHT */}
        <div className="bg-linear-to-b from-[#0f2a46] to-[#123c56] border border-[#1b4d70] rounded-2xl p-6 shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-3">
            Included Support
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-blue-100">
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