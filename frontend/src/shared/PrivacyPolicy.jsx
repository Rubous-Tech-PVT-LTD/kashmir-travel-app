import Navbar from './Navbar'
import Footer from './Footer'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-8">
          <p className="text-emerald-500 text-xs font-bold tracking-widest uppercase mb-2">
            Legal
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-3 leading-tight">
            Privacy Policy
          </h1>

          <p className="text-slate-500 text-base max-w-2xl leading-7">
            This page explains how Haba Khatoon Travels collects and uses
            information when you contact us, request a quote, or browse our site.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-6">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Information we collect
            </h2>
            <p className="text-slate-600 leading-7">
              We may collect your name, phone number, email address, trip
              preferences, and any details you submit through contact or booking
              forms. We may also collect basic technical data such as browser
              type and pages visited to help us improve the site.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              How we use it
            </h2>
            <ul className="text-slate-600 leading-7 list-disc pl-5 space-y-1">
              <li>To respond to inquiries and prepare tour quotations.</li>
              <li>To arrange travel support, bookings, and customer assistance.</li>
              <li>To improve our website, services, and communication.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Sharing and security
            </h2>
            <p className="text-slate-600 leading-7">
              We do not sell your personal information. We only share it with
              trusted service providers when needed to deliver a booking or
              support request. Reasonable safeguards are used to protect the
              data we hold, but no online transmission is completely secure.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Contact
            </h2>
            <p className="text-slate-600 leading-7 mb-2">
              For privacy questions, email{" "}
              <a
                href="mailto:info@habakhatoontravels.com"
                className="text-emerald-500 hover:underline"
              >
                info@habakhatoontravels.com
              </a>
            </p>
            <p className="text-slate-600 leading-7">
              Humham Near Masjid Muhammadi, Budgam Road, Srinagar, J&K, India -
              190021
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  )
}