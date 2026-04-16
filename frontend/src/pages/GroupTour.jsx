import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../shared/Footer";

const groupHighlights = [
  {
    title: "Smooth Group Logistics",
    detail:
      "Coordinated transport, rooming plans, and timings that keep large groups stress free.",
  },
  {
    title: "Shared Adventure Moments",
    detail:
      "From gondola rides to valley camps, every day is planned for fun and bonding.",
  },
  {
    title: "Custom Budget Bands",
    detail:
      "Student squads, corporate teams, or family circles - choose a package that fits your group.",
  },
];

const groupPlan = [
  {
    day: "Day 1",
    title: "Srinagar Group Arrival",
    desc:
      "Airport pickup, welcome briefing, room allocation, and Dal Lake evening cruise.",
  },
  {
    day: "Day 2",
    title: "Gulmarg Adventure Day",
    desc:
      "Gondola phases, snow activities, and team challenge moments with guided support.",
  },
  {
    day: "Day 3",
    title: "Pahalgam Escape",
    desc:
      "Riverside leisure, optional horse rides, picnic setup, and bonfire-style gathering.",
  },
  {
    day: "Day 4",
    title: "Culture and Departure",
    desc:
      "Handicraft walk, local tasting trail, group photos, and coordinated airport drops.",
  },
];

export default function GroupTour() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f8fbff]">
      {/* Animations */}
      <style>{`
        .group-orb { animation: float 6s ease-in-out infinite; }
        .fade-up { opacity: 0; transform: translateY(16px); animation: fade 650ms ease forwards; }
        .delay-1 { animation-delay: 110ms; }
        .delay-2 { animation-delay: 220ms; }
        .delay-3 { animation-delay: 330ms; }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes fade {
          to { opacity:1; transform:translateY(0); }
        }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#13213b] via-[#3b2a78] to-[#5d47d8] text-white px-6 py-20">
        
        {/* Glow Orbs */}
        <div className="group-orb absolute -left-24 -top-20 w-67.5 h-67.5 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.5)_0%,transparent_70%)]" />
        <div className="absolute -right-20 -bottom-24 w-75 h-75 rounded-full bg-[radial-gradient(circle,rgba(196,181,253,0.4)_0%,transparent_70%)]" />

        <div className="max-w-6xl mx-auto">
          
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="mb-6 px-4 py-2 border border-white/40 rounded-md hover:bg-white/10 transition"
          >
            ← Back to Home
          </button>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* LEFT */}
            <div>
              <p className="fade-up text-xs tracking-widest text-purple-200 mb-3">
                GROUP JOURNEY EDITION
              </p>

              <h1 className="fade-up delay-1 text-3xl md:text-5xl leading-tight mb-4 max-w-xl">
                Group Tour Built for Shared Adventures, Easy Planning, and Big Memories
              </h1>

              <p className="fade-up delay-2 text-purple-100 mb-6 leading-relaxed max-w-xl">
                Perfect for friends, office teams, student circles, and extended families.
                We handle transport, stay coordination, activity timing, and group-friendly experiences.
              </p>

              <div className="fade-up delay-3 flex gap-4 flex-wrap">
                <button
                  onClick={() => navigate("/alltrips?category=group-tour")}
                  className="bg-[#ddd6fe] text-[#2f236f] px-5 py-3 rounded-lg font-semibold"
                >
                  Browse Group Tour
                </button>

                <button className="border border-white/40 px-5 py-3 rounded-lg hover:bg-white/10">
                  Get Group Quote
                </button>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="fade-up delay-2 bg-white/10 border border-white/30 rounded-xl p-5 backdrop-blur">
              <h3 className="text-lg mb-4">Why Groups Choose Us</h3>

              {groupHighlights.map((item) => (
                <div
                  key={item.title}
                  className="mb-4 pb-3 border-b border-white/20"
                >
                  <p className="font-semibold text-sm mb-1">
                    {item.title}
                  </p>
                  <p className="text-sm text-purple-100 leading-relaxed">
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
          <p className="text-xs font-bold tracking-widest text-[#5b4bc4] mb-2">
            SAMPLE GROUP FLOW
          </p>
          <h2 className="text-2xl md:text-3xl text-[#1f2a56]">
            4-Day Group Itinerary
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {groupPlan.map((plan, index) => (
            <div
              key={plan.day}
              className="bg-white rounded-xl border border-[#e4e6fb] shadow-md p-5"
            >
              <span
                className={`inline-block px-3 py-1 rounded-md text-xs font-bold mb-3 ${
                  index % 2 === 0
                    ? "bg-[#ddd6fe] text-[#2f236f]"
                    : "bg-blue-100 text-[#2f236f]"
                }`}
              >
                {plan.day}
              </span>

              <h3 className="text-lg font-semibold mb-2 text-[#1f2a56]">
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