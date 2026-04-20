import { useState } from "react";
import { DollarSign, Globe, PhoneCall, Users } from "lucide-react";

const reasons = [
  {
    id: 1,
    icon: (
      <Globe width={24} height={24} strokeWidth={2} />
    ),
    title: "Local Expert Guides",
    description: "Born-and-raised locals who know every hidden trail and secret viewpoint.",
    accentClass: "bg-blue-600",
    softBgClass: "bg-blue-50",
    borderClass: "border-blue-200",
    textClass: "text-blue-600",
  },
  {
    id: 2,
    icon: (
      <Users width={24} height={24} strokeWidth={2} />
    ),
    title: "50,000+ Happy Travelers",
    description: "A 4.9★ average across 12,000 verified reviews from real travelers.",
    accentClass: "bg-pink-600",
    softBgClass: "bg-pink-50",
    borderClass: "border-pink-200",
    textClass: "text-pink-600",
  },
  {
    id: 3,
    icon: (
      <DollarSign width={24} height={24} strokeWidth={2} />
    ),
    title: "No Hidden Charges",
    description: "All inclusions listed upfront. Best-price guarantee on every package.",
    accentClass: "bg-orange-600",
    softBgClass: "bg-orange-50",
    borderClass: "border-orange-200",
    textClass: "text-orange-600",
  },
  {
    id: 4,
    icon: (
      <PhoneCall width={24} height={24} strokeWidth={2} />
    ),
    title: "24/7 On-Trip Support",
    description: "Real humans available round the clock — not bots, not voicemail.",
    accentClass: "bg-cyan-600",
    softBgClass: "bg-cyan-50",
    borderClass: "border-cyan-200",
    textClass: "text-cyan-600",
  },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "50K+", label: "Happy Travelers" },
  { value: "120+", label: "Destinations" },
  { value: "4.9★", label: "Avg. Rating" },
];

export default function WhyChooseUs() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="bg-white font-dm">
      <div className="max-w-290 mx-auto lg:px-8 px-6 py-18 pb-20">
        {/* Header */}
        <div className="flex justify-between items-end mb-13 flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-0.75 bg-[#3dba8f] rounded-sm" />
              <span className="text-[#3dba8f] text-[11px] font-bold tracking-[3px] uppercase">
                Why Haba Khatoon Travels?
              </span>
            </div>
            <h2 className="font-playfair text-[clamp(28px,4vw,44px)] font-extrabold text-[#0f1923] m-0 leading-tight">
              Why Travelers Choose Us
            </h2>
          </div>
          <p className="text-gray-500 text-[14.5px] max-w-95 leading-relaxed font-light m-0">
            We go beyond bookings — our experience, transparency, and care make every Kashmir trip extraordinary.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 mb-12">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="font-playfair text-3xl font-extrabold text-[#1a2b4a] leading-none mb-1.5">
                {s.value}
              </div>
              <div className="text-xs text-gray-400 font-medium tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Cards Grid — 4 columns */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {reasons.map((r) => (
            <div
              key={r.id}
              className={`rounded-xl border-2 p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl lg:p-6 ${hovered === r.id ? `${r.softBgClass} ${r.borderClass}` : 'border-gray-100 bg-white'}`}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Icon box */}
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border hover:-rotate-6 hover:scale-110 ${r.softBgClass} ${r.borderClass} ${r.textClass} transition-transform duration-300`}
              >
                {r.icon}
              </div>

              {/* Title */}
              <h4 className="font-playfair text-[15px] font-bold text-[#0f1923] m-0 mb-2 leading-tight">
                {r.title}
              </h4>

              {/* Description */}
              <p className="text-gray-500 text-[13px] leading-relaxed m-0 mb-4 font-light">
                {r.description}
              </p>

              {/* Accent underline */}
              <div className={`h-[2.5px] rounded-sm ${r.accentClass} transition-all duration-300 ${hovered === r.id ? 'w-8' : 'w-5'}`} />
            </div>
          ))}
        </div>

        {/* Bottom CTA row */}
        <div className="mt-14 flex items-center justify-between bg-[#1a2b4a] rounded-2xl p-8 flex-wrap gap-5">
          <div>
            <p className="text-[#3dba8f] text-[11px] font-bold tracking-wider uppercase m-0 mb-1.5">
              Ready to Explore Kashmir?
            </p>
            <h3 className="font-playfair text-xl font-bold text-white m-0">
              Let our experts plan your perfect trip — free of charge.
            </h3>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a
              href="https://wa.me/919149680276?text=Hi!%20I%20would%20like%20to%20get%20a%20free%20quote%20for%20a%20Kashmir%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#3dba8f] text-white border-none px-7 py-3 rounded-lg text-sm font-semibold cursor-pointer font-dm tracking-wide hover:bg-[#2ea87e] transition-colors duration-200 no-underline"
            >
              Get Free Quote
            </a>
            <a
              href="https://wa.me/919149680276?text=Hi!%20I%20would%20like%20to%20talk%20to%20a%20Kashmir%20travel%20expert."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent text-white border-2 border-white/25 px-7 py-3 rounded-lg text-sm font-medium cursor-pointer font-dm hover:border-white/60 transition-colors duration-200 no-underline"
            >
              Talk to an Expert
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}