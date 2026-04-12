import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../shared/Footer";
import { hotelAPI } from "../utils/api";

const bookingHighlights = [
  "Verified stays with transparent rates",
  "Breakfast and airport transfers available",
  "24x7 travel support in Kashmir",
  "Family, honeymoon, and group-friendly options",
];

export default function HotelBooking() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await hotelAPI.getAll();
        setHotels(data.slice(0, 6));
      } catch (err) {
        console.error(err);
        setError("Failed to load featured hotels");
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="bg-[#f5f8fb]">
      {/* HERO */}
      <section className="bg-linear-to-r from-[#00142f] via-[#04213f] to-[#0a2f45] text-white px-6 py-20">
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
              <div className="inline-flex items-center gap-2 border border-yellow-300/30 bg-white/10 px-5 py-2 rounded-full text-yellow-300 text-xs font-bold tracking-widest mb-5">
                🏨 STAY & RELAX
              </div>

              <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-4">
                Find Your <br />
                <span className="text-[#f1c969]">Perfect Stay.</span>
              </h1>

              <p className="text-white/80 text-base md:text-lg mb-6 max-w-xl">
                From boutique escapes to five-star palaces, we handpick stays
                that match your taste, budget, and dreams.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/alltrips")}
                  className="bg-[#f1c969] text-[#0c1f38] px-6 py-3 rounded-lg font-semibold"
                >
                  View Stay Packages
                </button>

                <button
                  onClick={() => navigate("/services/family-tour")}
                  className="border border-white/40 px-6 py-3 rounded-lg hover:bg-white/10"
                >
                  Plan Full Kashmir Trip
                </button>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="bg-white/10 border border-white/20 rounded-xl p-5 backdrop-blur">
              <h3 className="text-lg mb-4">Why Book With Us</h3>

              {bookingHighlights.map((item) => (
                <div key={item} className="flex gap-2 mb-3">
                  <span className="text-[#f1c969]">●</span>
                  <p className="text-sm text-white/90">{item}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* HOTELS */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest text-[#1d3655] mb-2">
            TOP HOTELS IN KASHMIR
          </p>
          <h2 className="text-2xl md:text-3xl text-[#0f2946]">
            Handpicked Stays You Can Book With Confidence
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {loading ? (
            <div className="col-span-full text-center py-10">
              <p>Loading hotels...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-10 text-orange-400">
              <p>{error}</p>
            </div>
          ) : (
            hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-xl overflow-hidden border shadow-md hover:-translate-y-1 hover:shadow-lg transition"
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-45 object-cover"
                />

                <div className="p-4">
                  <p className="text-xs font-bold text-[#3f5f89] mb-1">
                    {hotel.location} • {hotel.nights}
                  </p>

                  <h3 className="text-lg font-semibold text-[#12263e] mb-2">
                    {hotel.name}
                  </h3>

                  <div className="flex justify-between items-center mb-3">
                    <p className="text-yellow-500 text-sm">
                      {"★".repeat(hotel.rating)}
                      {"☆".repeat(5 - hotel.rating)}
                    </p>

                    <p className="font-bold text-[#0f2946]">
                      ₹ {hotel.price}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/hotel/${hotel.id}`)}
                    className="w-full bg-linear-to-r from-[#0b3d66] to-[#1e5c91] text-white py-2 rounded-md font-semibold"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* VIEW ALL */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/all-hotels")}
            className="bg-linear-to-r from-[#0b3d66] to-[#1e5c91] text-white px-6 py-3 rounded-full font-semibold shadow-lg"
          >
            View All Hotels
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}