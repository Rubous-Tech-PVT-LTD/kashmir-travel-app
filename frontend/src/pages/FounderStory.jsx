import { useState } from 'react'
import { ArrowRight, Quote, MapPin, Star, Heart } from 'lucide-react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
 
const fallbackFounderImage = '/images/operator/hero-bg.jpg'
 
const stats = [
  { value: '12+', label: 'Years in Kashmir Travel' },
  { value: '3,000+', label: 'Happy Travellers' },
  { value: '50+', label: 'Curated Routes' },
  { value: '4.9★', label: 'Average Rating' },
]
 
const values = [
  {
    icon: Heart,
    title: 'Rooted in Hospitality',
    body: 'Kashmiri culture treats every guest as an honoured family member. That warmth is built into every itinerary we craft.',
  },
  {
    icon: MapPin,
    title: 'Hyper-local Knowledge',
    body: 'We know which meadows bloom in May, which dhabas serve the best kahwa, and which roads open after the snow melts.',
  },
  {
    icon: Star,
    title: 'Transparent by Design',
    body: 'No hidden costs, no bait-and-switch upgrades. What we quote is what you pay — always.',
  },
]
 
export default function FounderStory() {
  const [founderImage, setFounderImage] = useState('/images/founder.jpg')
 
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
 
      <Navbar />
 
      <main className="flex-1">
        <section className="relative overflow-hidden bg-[#1a2b4a]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(61,186,143,0.22),transparent_40%),radial-gradient(circle_at_85%_70%,rgba(255,255,255,0.09),transparent_35%)]" />

          <div className="relative mx-auto max-w-6xl px-6 py-18 md:py-22">
            <span className="font-dm mb-3 inline-block text-[11px] font-bold uppercase tracking-[3px] text-[#3dba8f]">
              Our Story
            </span>
            <h1 className="font-playfair max-w-3xl text-[clamp(30px,4.4vw,56px)] font-extrabold leading-tight text-white">
              The story behind
              {' '}
              <span className="text-[#3dba8f]">Haba Khatoon Travels</span>
            </h1>
            <p className="font-dm mt-5 max-w-2xl text-[15px] leading-7 text-slate-200">
              Every unforgettable Kashmir journey starts with one conversation.
              Ours began with a local founder who believed travel should feel
              like coming home — honest, warm, and deeply rooted in place.
            </p>
 
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-[1px]"
                >
                  <p className="font-playfair text-2xl font-bold text-white">{s.value}</p>
                  <p className="font-dm mt-1 text-xs leading-5 text-slate-200">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        <section className="mx-auto max-w-6xl px-6 py-14 md:py-18">
          <div className="grid gap-8 lg:grid-cols-[420px_1fr] lg:items-start">
            <div className="flex flex-col gap-6">
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
                <img
                  src={founderImage}
                  alt="Founder of Haba Khatoon Travels"
                  className="h-[460px] w-full object-cover object-center"
                  loading="lazy"
                  onError={() => setFounderImage(fallbackFounderImage)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                  <p className="font-playfair text-xl font-bold text-white">Founder, Haba Khatoon Travels</p>
                  <div className="font-dm mt-1 flex items-center gap-1.5 text-xs text-[#8be0c1]">
                    <MapPin className="h-3 w-3" />
                    Srinagar, Jammu &amp; Kashmir
                  </div>
                </div>
              </div>
 
              <div className="rounded-2xl bg-[#1a2b4a] p-6 shadow-lg">
                <Quote className="mb-3 h-7 w-7 text-[#3dba8f]" />
                <p className="font-playfair text-lg font-semibold italic leading-8 text-white">
                  "Kashmir isn't just a destination — it's a feeling.
                  My job is to make sure you carry that feeling home."
                </p>
              </div>
 
              <p className="font-dm text-center text-xs text-slate-500">
                Replace founder photo at{' '}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-700">
                  public/images/founder.jpg
                </code>
              </p>
            </div>
 
            <div>
              <span className="font-dm text-[11px] font-bold uppercase tracking-[3px] text-[#3dba8f]">
                Chapter One
              </span>
 
              <h2 className="font-playfair mt-3 text-[clamp(28px,3.2vw,44px)] font-extrabold leading-tight text-[#1a2b4a]">
                From Local Roots to<br />Trusted Journeys
              </h2>
              <div className="mt-4 h-1 w-12 rounded-sm bg-[#3dba8f]" />
 
              <div className="font-dm mt-7 space-y-5 text-[15px] leading-7 text-slate-600">
                <p>
                  It started simply — helping friends and relatives discover corners of Kashmir
                  that never appear in glossy brochures. The hidden saffron fields of Pampore,
                  the family-run houseboats on Dal Lake, the forest trails above Pahalgam that
                  melt into silence. Word spread, and what began as a favour became a calling.
                </p>
                <p>
                  After years of coordinating trips on the ground, our founder made it official:
                  a travel brand built entirely on the opposite of tourism-as-usual. No overcrowded
                  package tours. No commissions hidden inside "complimentary" services. Just
                  honest itineraries, fair prices, and someone who genuinely knows the land
                  picking up the phone when you need them.
                </p>
                <p>
                  Today, Haba Khatoon Travels serves honeymooners, families, solo wanderers, and
                  corporate groups — each trip shaped by the same founding promise: you should
                  feel guided like family, never herded like a tourist.
                </p>
              </div>
 
              <div className="my-10 h-px bg-gradient-to-r from-emerald-200 to-transparent" />

              <h3 className="font-playfair mb-6 text-2xl font-bold text-[#1a2b4a]">
                What we stand for
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {values.map(({ icon: Icon, title, body }) => (
                  <div
                    key={title}
                    className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                      <Icon className="h-5 w-5 text-emerald-700" />
                    </div>
                    <p className="font-dm mb-2 text-sm font-semibold text-slate-800">{title}</p>
                    <p className="font-dm text-sm leading-6 text-slate-500">{body}</p>
                  </div>
                ))}
              </div>
 
              <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-[#1a2b4a] p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-playfair text-xl font-bold text-white">
                    Ready to experience Kashmir your way?
                  </p>
                  <p className="font-dm mt-1 text-sm text-slate-200">
                    Chat with the founder directly on WhatsApp.
                  </p>
                </div>
                <a
                  href="https://wa.me/919149680276?text=Hi!%20I%20read%20your%20founder%20story%20and%20want%20to%20plan%20a%20trip."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#3dba8f] px-6 py-3 text-sm font-semibold text-white no-underline transition-colors duration-200 hover:bg-[#2ea87e]"
                >
                  Plan My Trip
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
 
        <section className="bg-white py-14">
          <div className="mx-auto max-w-6xl px-6">
            <span className="font-dm text-[11px] font-bold uppercase tracking-[3px] text-[#3dba8f]">
              The Journey So Far
            </span>
            <h2 className="font-playfair mt-2 mb-10 text-3xl font-extrabold text-[#1a2b4a]">
              Milestones that shaped us
            </h2>
 
            <div className="relative">
              <div className="absolute bottom-2 left-[11px] top-2 w-[2px] bg-emerald-200 md:left-1/2 md:-ml-px" />
 
              <div className="space-y-8">
                {[
                  { year: '2012', title: 'First guided trek', body: 'Led a small group of friends through the Kolahoi Glacier trail — the trip that started it all.' },
                  { year: '2015', title: 'First paying group', body: 'Word-of-mouth brought the first family group from Delhi. Five-star review, lifelong friendship.' },
                  { year: '2018', title: 'Haba Khatoon Travels registered', body: 'Formalised as a business, with a focus on transparency, local partnerships, and zero hidden fees.' },
                  { year: '2022', title: '1,000 happy travellers', body: 'Crossed the thousand-family milestone — every one of them has our founder\'s personal WhatsApp number.' },
                  { year: '2024', title: 'Featured in national media', body: 'Recognised as one of Kashmir\'s most trusted boutique travel operators by a leading travel publication.' },
                ].map((m, i) => (
                  <div key={m.year} className={`relative flex items-start gap-6 md:w-[46%] ${i % 2 === 0 ? 'md:ml-auto md:pl-10' : 'md:mr-auto md:pl-0 md:pr-10 md:text-right md:flex-row-reverse'}`}>
                    <div className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-[#3dba8f]" />
                    <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
                      <span className="font-dm mb-1 inline-block text-xs font-bold uppercase tracking-widest text-[#3dba8f]">
                        {m.year}
                      </span>
                      <p className="font-playfair mb-1 text-lg font-bold text-[#1a2b4a]">{m.title}</p>
                      <p className="font-dm text-sm leading-6 text-slate-600">{m.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
 
      </main>
 
      <Footer />
    </div>
  )
}