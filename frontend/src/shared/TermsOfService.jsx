import Navbar from './Navbar'
import Footer from './Footer'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-275 mx-auto px-6 py-18 pb-14">
        {/* Header */}
        <div className="mb-7">
          <p className="text-[#3dba8f] text-xs font-bold tracking-[1.4px] uppercase mb-2">
            Legal
          </p>

          <h1 className="text-[44px] leading-[1.05] text-slate-900 mb-3">
            Terms of Service
          </h1>

          <p className="text-slate-500 text-base max-w-190 leading-[1.7]">
            These terms describe the basic rules for using the Haba Khatoon Travels website and booking travel-related services through it.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[20px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-gray-200 p-8 grid gap-6">

          {/* Section 1 */}
          <section>
            <h2 className="text-[22px] text-slate-900 mb-2">
              Use of the website
            </h2>
            <p className="text-slate-600 leading-[1.75]">
              You agree to use the site only for lawful purposes. Do not attempt to disrupt the site, collect data without permission, or submit false booking information.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-[22px] text-slate-900 mb-2">
              Bookings and quotations
            </h2>
            <p className="text-slate-600 leading-[1.75]">
              Any itinerary, fare, or package quotation shown on the site is informational until confirmed by our team. Final inclusions, pricing, and availability may change based on season, suppliers, and travel dates.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-[22px] text-slate-900 mb-2">
              Intellectual property
            </h2>
            <p className="text-slate-600 leading-[1.75]">
              The text, layout, visuals, and code used on this website are owned by Haba Khatoon Travels unless otherwise stated. You may not copy or redistribute them without permission.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-[22px] text-slate-900 mb-2">
              Limitation of liability
            </h2>
            <p className="text-slate-600 leading-[1.75]">
              We work to keep the information accurate, but travel conditions can change. We are not responsible for losses caused by third-party disruptions, weather, transportation delays, or incomplete information supplied by users.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-[22px] text-slate-900 mb-2">
              Contact
            </h2>

            <p className="text-slate-600 leading-[1.75] mb-2">
              Questions about these terms can be sent to{" "}
              <a
<<<<<<< HEAD
                href="mailto:info@habakhatoontravels.com"
                className="text-[#3dba8f] no-underline"
              >
                info@habakhatoontravels.com
=======
                href="mailto:info@habakhatoon.com"
                className="text-[#3dba8f] no-underline"
              >
                info@habakhatoon.com
>>>>>>> c785085ab22552ebaaba20b206ba389c4de6ae91
              </a>.
            </p>

            <p className="text-slate-600 leading-[1.75]">
              +91-7006259761
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  )
}