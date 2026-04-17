import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../shared/Footer";
import { activityAPI } from "../utils/api";

export default function GondolaRide() {
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleReserveClick = (packageTitle) => {
    const message = encodeURIComponent(`Hi, I want to reserve ${packageTitle} for Gondola Ride.`);
    const whatsappUrl = `https://wa.me/919149680276?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    let mounted = true;

    const loadActivity = async () => {
      setIsLoading(true);
      const data = await activityAPI.getBySlug("gondola-ride");

      if (!mounted) return;

      setActivityData(data);
      setIsLoading(false);
    };

    loadActivity();

    return () => (mounted = false);
  }, []);

  const gondolaHighlights = activityData?.gondolaHighlights || [];
  const rideTiers = activityData?.rideTiers || [];
  const gondolaMoments = activityData?.gondolaMoments || [];
  const activityFlow = activityData?.activityFlow || [];
  const seasonalNotes = activityData?.seasonalNotes || [];

  if (isLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-[#10263b] font-semibold">
        Loading activity...
      </div>
    );
  }

  if (!activityData) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-[#10263b] font-semibold">
        Unable to load gondola ride details.
      </div>
    );
  }

  return (
    <div className="bg-[#f8fbff]">
      {/* Animations */}
      <style>{`
        .gondola-glow { animation: float 6s ease-in-out infinite; }
        .fade-up { opacity: 0; transform: translateY(16px); animation: fade 650ms ease forwards; }
        .delay-1 { animation-delay: 100ms; }
        .delay-2 { animation-delay: 220ms; }
        .delay-3 { animation-delay: 340ms; }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fade {
          to { opacity:1; transform:translateY(0); }
        }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#08131f] via-[#1d3557] to-[#4f7ea8] text-white px-6 py-20">
        
        {/* Glow */}
        <div className="gondola-glow absolute -right-24 -top-20 w-70 h-70 rounded-full bg-[radial-gradient(circle,rgba(176,223,255,0.4)_0%,transparent_70%)]" />
        <div className="absolute -left-24 -bottom-24 w-75 h-75 rounded-full bg-[radial-gradient(circle,rgba(255,217,156,0.3)_0%,transparent_70%)]" />

        <div className="max-w-6xl mx-auto">
          
          <button
            onClick={() => navigate("/")}
            className="mb-6 px-4 py-2 border border-white/40 rounded-md hover:bg-white/10 transition"
          >
            Back to Home
          </button>

          <div className="grid md:grid-cols-2 gap-7 items-center">
            
            {/* LEFT */}
            <div>
              <p className="fade-up text-xs tracking-widest text-blue-200 mb-3">
                GULMARG GONDOLA EXPERIENCE
              </p>

              <h1 className="fade-up delay-1 text-3xl md:text-5xl leading-tight mb-4 max-w-xl">
                Gondola Ride Designed for Alpine Views, Snow Peaks, and a True Mountain High
              </h1>

              <p className="fade-up delay-2 text-blue-100 mb-6 leading-relaxed max-w-xl">
                This page gives the Gulmarg gondola its own destination with ticket tiers,
                seasonal guidance, and a clean booking flow.
              </p>

              <div className="fade-up delay-3 flex gap-4 flex-wrap">
                <button
                  onClick={() => navigate("/alltrips")}
                  className="bg-[#ffd99d] text-[#13263b] px-5 py-3 rounded-lg font-semibold"
                >
                  View Kashmir Trips
                </button>

                <button
                  onClick={() => navigate("/services/group-tour")}
                  className="border border-white/40 px-5 py-3 rounded-lg hover:bg-white/10"
                >
                  Plan Group Visit
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="fade-up delay-2 bg-white/10 border border-white/20 rounded-xl p-5 backdrop-blur">
              <img
                src="https://i.ibb.co/k21njFQ5/Gandola-ride.jpg"
                className="w-full h-62.5 object-cover rounded-lg mb-4"
                alt=""
              />

              <div className="grid grid-cols-3 gap-3">
                {gondolaMoments.map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-lg p-3">
                    <p className="text-xs text-blue-200 font-bold mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-6">
        
        <div>
          <p className="text-xs font-bold tracking-widest text-[#1d5c86] mb-2">
            WHY THIS RIDE IS SPECIAL
          </p>
          <h2 className="text-2xl md:text-3xl mb-5 text-[#10263b]">
            A mountain experience with a clear route and value
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gondolaHighlights.map((item) => (
              <div
                key={item.title}
                className="bg-white border rounded-xl p-4 shadow hover:-translate-y-1 transition"
              >
                <div className="w-10 h-10 bg-linear-to-br from-[#1d5c86] to-[#6bb6e3] rounded-lg mb-3" />
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="bg-white rounded-xl border p-5 shadow">
          <p className="text-xs font-bold text-[#1d5c86] mb-2">
            SEASONAL NOTES
          </p>
          <h3 className="text-xl mb-4">Plan for weather & crowds</h3>

          {seasonalNotes.map((item) => (
            <p key={item} className="text-sm text-gray-600 mb-2">
              • {item}
            </p>
          ))}
        </div>
      </section>

      {/* TICKETS */}
      <section className="bg-[#eef5fb] py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-[#1d5c86] mb-2">
              GONDOLA TICKETS
            </p>
            <h2 className="text-2xl md:text-3xl">
              Pick your ride phase
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {rideTiers.map((item) => (
              <div key={item.title || item.name || item.route || item.price} className="bg-white rounded-xl p-5 shadow">
                <p className="text-xs text-[#1d5c86] font-bold mb-2">
                  {item.route || item.duration || item.tier || 'Gondola Tier'}
                </p>
                <h3 className="text-lg font-semibold">{item.title || item.name || 'Ride Package'}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.description || item.note || item.detail || 'Scenic gondola experience package.'}</p>

                <div className="flex justify-between items-center">
                  <span className="font-bold">{item.price || 'Contact'}</span>
                  <button
                    onClick={() => handleReserveClick(item.title || item.name || 'Gondola package')}
                    className="bg-[#1d5c86] text-white px-4 py-2 rounded-md"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-6">
        
        <div>
          <h2 className="text-2xl mb-4">How the Ride Works</h2>

          {activityFlow.map((item) => (
            <div key={item.step} className="bg-white border rounded-lg p-4 mb-3">
              <p className="text-xs font-bold text-[#1d5c86]">{item.step}</p>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-linear-to-br from-[#10263b] to-[#1d5c86] text-white rounded-xl p-5">
          <img
            src="https://i.ibb.co/d0pHgY1p/Gandola-ride.jpg"
            className="w-full h-55 object-cover rounded-lg mb-4"
            alt=""
          />
          <h3 className="text-xl mb-2">Ready to Plan?</h3>
          <p className="text-sm mb-4">
            Combine gondola with hotel, transport, or group plans.
          </p>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate("/alltrips")}
              className="bg-[#ffd99d] text-[#13263b] px-4 py-2 rounded-md"
            >
              Explore Trips
            </button>

            <button
              onClick={() => navigate("/services/group-tour")}
              className="border border-white/40 px-4 py-2 rounded-md"
            >
              Group Plan
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}