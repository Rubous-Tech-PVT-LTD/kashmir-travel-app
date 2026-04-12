import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../shared/Footer";
import { activityAPI } from "../utils/api";

export default function RiverRafting() {
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadActivity = async () => {
      setIsLoading(true);
      const data = await activityAPI.getBySlug("river-rafting");

      if (!mounted) return;

      setActivityData(data);
      setIsLoading(false);
    };

    loadActivity();

    return () => {
      mounted = false;
    };
  }, []);

  const raftingHighlights = activityData?.raftingHighlights || [];
  const raftingPackages = activityData?.raftingPackages || [];
  const safetyGear = activityData?.safetyGear || [];
  const raftingMoments = activityData?.raftingMoments || [];
  const tripPhases = activityData?.tripPhases || [];

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
        Unable to load river rafting details.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbff]">
      {/* HERO */}
      <section className="relative overflow-hidden text-white bg-linear-to-br from-[#07111d] via-[#12355a] to-[#1a78a6] px-6 py-20">
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-24 w-70 h-70 rounded-full bg-[radial-gradient(circle,rgba(136,225,255,0.4)_0%,transparent_70%)] animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-75 h-75 rounded-full bg-[radial-gradient(circle,rgba(255,202,126,0.3)_0%,transparent_70%)]" />

        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="mb-6 px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition"
          >
            Back to Home
          </button>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs tracking-widest text-cyan-200 mb-3">
                KASHMIR RIVER RAFTING
              </p>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                River Rafting Built for Real Adventure, Clear Guidance, and Big
                Valley Energy
              </h1>

              <p className="text-blue-100 mb-6 leading-relaxed">
                This page turns river rafting into a dedicated adventure
                destination with package tiers, safety guidance, and clear
                booking steps.
              </p>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => navigate("/alltrips")}
                  className="bg-[#ffd79d] text-[#13263b] px-5 py-2 rounded-lg font-semibold"
                >
                  View Kashmir Trips
                </button>
                <button
                  onClick={() => navigate("/services/group-tour")}
                  className="border border-white/40 px-5 py-2 rounded-lg"
                >
                  Plan Group Adventure
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20 shadow-lg">
              <img
                src="https://picsum.photos/id/10/1200/800"
                className="w-full h-64 object-cover rounded-xl mb-4"
              />

              <div className="grid grid-cols-3 gap-3">
                {raftingMoments.map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/10 rounded-lg p-2"
                  >
                    <p className="text-[10px] text-cyan-200 font-bold">
                      {item.label}
                    </p>
                    <p className="text-xs">{item.value}</p>
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
          <p className="text-xs text-[#0d6b95] font-bold tracking-widest mb-2">
            WHY THIS RUN STANDS OUT
          </p>
          <h2 className="text-3xl font-bold text-[#10263b] mb-6">
            A clear, energetic page for one of Kashmir’s strongest adventures
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {raftingHighlights.map((item) => (
              <div
                key={item.title}
                className="bg-white border rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <div className="w-10 h-10 rounded-lg bg-linear-to-r from-[#0d6b95] to-[#28a7d6] mb-3" />
                <h3 className="font-semibold text-[#12304c] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border shadow">
          <p className="text-xs text-[#0d6b95] font-bold mb-2">
            SAFETY GEAR
          </p>
          <h3 className="text-xl font-semibold text-[#10263b] mb-4">
            Built around guide-led control and prep
          </h3>

          {safetyGear.map((item) => (
            <div key={item} className="flex gap-2 mb-2">
              <span>-</span>
              <p className="text-sm text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section className="bg-[#eef7fc] py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-[#10263b] mb-8">
            Choose the level of thrill you want
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {raftingPackages.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-xl p-5 border shadow hover:shadow-lg"
              >
                <p className="text-xs text-[#0d6b95] font-bold">
                  {item.duration}
                </p>
                <h3 className="text-xl font-semibold text-[#10263b] mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{item.note}</p>

                <div className="flex justify-between items-center">
                  <span className="font-bold">{item.price}</span>
                  <button
                    onClick={() => navigate("/services/hotel-booking")}
                    className="bg-[#0d6b95] text-white px-4 py-2 rounded-lg"
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
          <h2 className="text-2xl font-bold mb-6 text-[#10263b]">
            From briefing to rapids in three steps
          </h2>

          {tripPhases.map((item) => (
            <div key={item.step} className="bg-white p-4 rounded-xl border mb-3">
              <p className="text-xs text-[#0d6b95] font-bold">{item.step}</p>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-linear-to-br from-[#10263b] via-[#15506e] to-[#0d6b95] text-white p-6 rounded-2xl shadow">
          <img
            src="https://picsum.photos/id/10/1200/800"
            className="w-full h-60 object-cover rounded-xl mb-4"
          />

          <h3 className="text-xl font-semibold mb-3">
            River Rafting with a full Kashmir adventure plan
          </h3>

          <p className="text-sm text-blue-100 mb-4">
            Tell us your preferred route length, group size, and season.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/alltrips")}
              className="bg-[#ffd79d] text-[#13263b] px-4 py-2 rounded-lg font-semibold"
            >
              Explore Trips
            </button>
            <button
              onClick={() => navigate("/services/group-tour")}
              className="border border-white px-4 py-2 rounded-lg"
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