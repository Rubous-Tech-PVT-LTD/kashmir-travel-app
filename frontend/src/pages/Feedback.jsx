import { useState } from 'react'
import { CheckCircle2, Loader2, Mail, Phone, Send, User } from 'lucide-react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { inquiryAPI } from '../utils/api'

const initialFormState = {
  name: '',
  email: '',
  whatsapp: '',
  profession: '',
  tripType: 'Honeymoon Tour',
}

export default function Feedback() {
  const [formData, setFormData] = useState(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await inquiryAPI.create(formData)
      setSuccessMessage('Thanks. Your feedback was sent successfully. We will contact you soon.')
      setFormData(initialFormState)
    } catch (error) {
      setErrorMessage(error?.message || 'Unable to send feedback right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="mb-10 max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-emerald-500">Feedback</p>
            <h1 className="mb-4 text-4xl font-bold text-slate-900">Share your travel request or feedback</h1>
            <p className="text-base leading-7 text-slate-600">
              Send us your details and we will follow up with a travel quote or support message. This form stores the inquiry in the backend and keeps the feedback loop on-site.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Full Name</span>
                  <span className="relative block">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
                      placeholder="Your name"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
                  <span className="relative block">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
                      placeholder="you@example.com"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">WhatsApp / Phone</span>
                  <span className="relative block">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      required
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
                      placeholder="+91 70000 00000"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Profession</span>
                  <input
                    required
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
                    placeholder="Your profession"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Interested In</span>
                  <select
                    name="tripType"
                    value={formData.tripType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
                  >
                    <option value="Honeymoon Tour">Honeymoon Tour</option>
                    <option value="Family Tour">Family Tour</option>
                    <option value="Adventure Trip">Adventure Trip</option>
                    <option value="Corporate Retreat">Corporate Retreat</option>
                    <option value="Budget Tour">Budget Tour</option>
                  </select>
                </label>
              </div>

              {successMessage && (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  <CheckCircle2 className="mr-2 inline-block h-4 w-4" />
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {isSubmitting ? 'Sending...' : 'Send Feedback'}
              </button>
            </form>

            <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Why use this form?</h2>
              <ul className="space-y-4 text-sm leading-6 text-slate-600">
                <li>• Submit your travel request directly to our team for a quicker response.</li>
                <li>• Share your preferences in one place and keep the booking process simple.</li>
                <li>• Our team reviews every message and follows up with the details you provide.</li>
              </ul>

              <div className="mt-8 rounded-2xl bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-700">Need a faster reply?</p>
                <p className="mt-2 text-sm text-slate-600">Use WhatsApp from the top bar or call the number listed in the footer for direct assistance.</p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}