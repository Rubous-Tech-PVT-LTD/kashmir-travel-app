import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../shared/Footer";

const highlights = [
  {
    title: "Kid Friendly Activities",
    detail:
      "Shikara joy ride, pony trails, snow play zones, and picnic-friendly gardens.",
  },
  {
    title: "Comfort Stays",
    detail:
      "Family suites with heating, easy transfers, and top-rated hospitality.",
  },
  {
    title: "Balanced Pace",
    detail:
      "No rushed schedules. More breaks, local food stops, and relaxed sightseeing.",
  },
];

const samplePlan = [
  {
    day: "Day 1",
    title: "Srinagar Welcome",
    desc: "Airport pickup, Dal Lake shikara, boulevard sunset walk.",
  },
  {
    day: "Day 2",
    title: "Gulmarg Fun Day",
    desc: "Gondola ride, snow activities, family photo spots.",
  },
  {
    day: "Day 3",
    title: "Pahalgam Escape",
    desc: "River-side leisure, horse ride options, local market visit.",
  },
  {
    day: "Day 4",
    title: "Local Culture",
    desc:
      "Handicrafts, Kashmiri cuisine trail, evening houseboat stay.",
  },
];

export default function FamilyTour() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f8fbff]">
      {/* Animations */}
      <style>{`
        .family-hero-glow {
          animation: floatGlow 5s ease-in-out infinite;
        }

        .family-fade-up {
          opacity: 0;
          transform: translateY(16px);
          animation: fadeUp 600ms ease forwards;
        }

        .delay-1 { animation-delay: 120ms; }
        .delay-2 { animation-delay: 240ms; }
        .delay-3 { animation-delay: 360ms; }

        @keyframes floatGlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#122033] via-[#1d3557] to-[#2a9d8f] text-white px-6 py-16 md:py-20">
        
        {/* Glow */}
        <div className="family-hero-glow absolute -right-20 -top-12 w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(255,226,159,0.45)_0%,rgba(255,226,159,0)_68%)]" />

        <div className="max-w-6xl mx-auto">
          
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="mb-6 border border-white/50 px-4 py-2 rounded-md text-sm hover:bg-white/10 transition"
          >
            ← Back to Home
          </button>

          <div className="grid md:grid-cols-2 gap-7 items-center">
            
            {/* LEFT */}
            <div>
              <p className="family-fade-up text-xs tracking-widest text-[#ffe29f] mb-3">
                PREMIUM FAMILY EXPERIENCE
              </p>

              <h1 className="family-fade-up delay-1 text-3xl md:text-5xl leading-tight mb-4 max-w-xl">
                The Best Kashmir Family Tour Packages
              </h1>

              <p className="family-fade-up delay-2 text-base text-blue-100 leading-relaxed mb-6 max-w-xl">
                Explore valleys, lakes, and cozy stays with itineraries that keep every age group happy. Want to know the Kashmir trip cost for family? Our team offers transparent pricing, managing transport, hotel coordination, and family-safe activities while you focus on making memories.
              </p>

              <div className="family-fade-up delay-3 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/alltrips?category=family-tour")}
                  className="bg-[#ffe29f] text-[#1d3557] px-5 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Browse Family Tour
                </button>

                <button className="border border-white/40 px-5 py-3 rounded-lg hover:bg-white/10 transition">
                  Talk to Planner
                </button>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="family-fade-up delay-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl p-5">
              <h3 className="text-lg mb-4">Why Families Love This Tour</h3>

              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="mb-4 pb-3 border-b border-white/20"
                >
                  <p className="font-bold text-sm mb-1">{item.title}</p>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ITINERARY */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        
        <div className="text-center mb-8">
          <p className="text-[#2a9d8f] text-xs tracking-widest font-bold mb-2">
            SAMPLE ITINERARY
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1d3557]">
            4-Day Family Flow
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {samplePlan.map((plan, index) => (
            <div
              key={plan.day}
              className="bg-white rounded-xl border border-gray-200 shadow-md p-5"
            >
              <span
                className={`inline-block px-3 py-1 rounded-md text-xs font-bold mb-3 ${
                  index % 2 === 0
                    ? "bg-[#ffe29f] text-[#1d3557]"
                    : "bg-[#d7f5ee] text-[#1d3557]"
                }`}
              >
                {plan.day}
              </span>

              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                {plan.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {plan.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}