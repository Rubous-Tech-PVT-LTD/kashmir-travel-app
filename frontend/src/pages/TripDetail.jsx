import { useEffect, useState } from "react";
import { Calendar, Check, Grid2x2, Heart as HeartIcon, Share2, Star as StarIcon, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { itineraryAPI } from "../utils/api";
import TripReviews from "../components/TripReviews";



const Heart = ({ filled }) => (
  <HeartIcon width={18} height={18} fill={filled ? "#ef4444" : "none"} color={filled ? "#ef4444" : "#334155"} strokeWidth={2} />
);

const ShareIcon = () => (
  <Share2 width={16} height={16} strokeWidth={2} />
);

const Star = () => (
  <StarIcon width={14} height={14} fill="#f4c430" color="#f4c430" strokeWidth={1.5} />
);

const UserIcon = () => (
  <User width={16} height={16} color="#64748b" strokeWidth={2} />
);

const CalendarIcon = () => (
  <Calendar width={16} height={16} color="#64748b" strokeWidth={2} />
);

const CheckIcon = () => (
  <Check width={16} height={16} color="#16a34a" strokeWidth={2.5} />
);

export default function TripDetail() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '917006259761';
  const [wishlisted, setWishlisted] = useState(false);
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const fetchTrip = async () => {
      setLoading(true);
      setError('');

      const data = await itineraryAPI.getById(tripId);

      if (!mounted) {
        return;
      }

      if (!data) {
        setTrip(null);
        setError('Trip not found');
        setLoading(false);
        return;
      }

      setTrip(data);
      setLoading(false);
    };

    fetchTrip();

    return () => {
      mounted = false;
    };
  }, [tripId]);

  const handleTripInquiry = () => {
    if (!trip) {
      return;
    }

    const message = encodeURIComponent(
      `Hi, I want to check availability for ${trip.title}. Please share dates and best pricing.`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a2b4a", fontWeight: 600 }}>
        Loading trip details...
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, backgroundColor: "#f8fafc", padding: "20px" }}>
        <div style={{ fontSize: "64px" }}>🏔️</div>
        <h2 style={{ margin: 0, color: "#1e293b", fontSize: "24px", textAlign: "center" }}>
          {error === 'Trip not found' ? "Oops! This trip doesn't exist yet." : (error || 'Trip not found')}
        </h2>
        <p style={{ color: "#64748b", textAlign: "center", maxWidth: "400px", margin: "0 0 8px" }}>
          The trip you're looking for might have been moved or is currently unavailable. Try exploring our popular packages instead.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => navigate("/alltrips")}
            style={{ border: "none", background: "#2563eb", color: "#fff", padding: "12px 24px", borderRadius: 8, cursor: "pointer", fontWeight: 700, transition: "all 0.2s" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2563eb")}
          >
            Browse All Trips
          </button>
          <button
            onClick={() => navigate("/")}
            style={{ border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", padding: "12px 24px", borderRadius: 8, cursor: "pointer", fontWeight: 700, transition: "all 0.2s" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f8fafc")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#fff")}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const galleryImages = trip.gallery?.length ? trip.gallery : [trip.coverImage].filter(Boolean);
  const [heroImage, ...smallImages] = galleryImages;

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: "#fff", color: "#1f2937", minHeight: "100vh" }}>
      <style>{`
        .trip-detail-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
          align-items: start;
        }
        .trip-detail-gallery {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 10px;
          min-height: 440px;
        }
        .trip-detail-gallery-small {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        @media (max-width: 980px) {
          .trip-detail-layout {
            grid-template-columns: 1fr;
          }
          .trip-detail-gallery {
            grid-template-columns: 1fr;
            min-height: 360px;
          }
          .trip-detail-gallery-small {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

     
      <Navbar />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "26px 24px 40px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: "none", border: "none", color: "#3dba8f", cursor: "pointer", fontWeight: 700, padding: 0, marginBottom: 10 }}
        >
          ← Back to trips
        </button>

        <h1 style={{ margin: "0 0 10px", color: "#1a2b4a", fontSize: "clamp(28px, 3.2vw, 42px)", lineHeight: 1.2 }}>{trip.title}</h1>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ background: "#eef2ff", color: "#1d4ed8", border: "1px solid #dbeafe", borderRadius: 4, fontSize: 12, fontWeight: 700, padding: "5px 10px" }}>
              {trip.tag}
            </span>
            <span style={{ color: "#64748b", fontSize: 14 }}>By Haba Khatoon Travels</span>
            <span style={{ color: "#94a3b8" }}>•</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#334155", fontSize: 14 }}>
              <Star /> <Star /> <Star /> <Star /> <Star />
              <span style={{ color: "#64748b" }}>(4.9)</span>
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <button
              onClick={() => setWishlisted((prev) => !prev)}
              style={{ background: "none", border: "none", color: "#334155", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}
            >
              <Heart filled={wishlisted} /> Wishlist
            </button>
            <button style={{ background: "none", border: "none", color: "#334155", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
              <ShareIcon /> Share
            </button>
          </div>
        </div>

        <div className="trip-detail-layout">
          <div>
            <div className="trip-detail-gallery" style={{ marginBottom: 20 }}>
              <img
                src={heroImage}
                alt={trip.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12, boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}
              />

              <div className="trip-detail-gallery-small">
                {smallImages.slice(0, 4).map((image, index) => (
                  <img
                    key={`${trip.id}-gallery-${index}`}
                    src={image}
                    alt={`${trip.title} ${index + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12, boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}
                  />
                ))}
              </div>
            </div>

            <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: "20px 18px", marginBottom: 18 }}>
              <h3 style={{ margin: "0 0 10px", color: "#1a2b4a", fontSize: 20 }}>Trip Overview</h3>
              <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 14 }}>{trip.description}</p>
            </div>

            <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: "20px 18px" }}>
              <h3 style={{ margin: "0 0 14px", color: "#1a2b4a", fontSize: 20 }}>What you get</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#334155", fontSize: 14 }}>
                  <CheckIcon /> {trip.duration}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#334155", fontSize: 14 }}>
                  <CheckIcon /> Private transport options
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#334155", fontSize: 14 }}>
                  <CheckIcon /> Local guide support
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#334155", fontSize: 14 }}>
                  <CheckIcon /> Free cancellation available
                </div>
              </div>
            </div>

            <TripReviews tripId={trip._id || trip.id} tripTitle={trip.title} />
          </div>

          <aside style={{ position: "sticky", top: 84 }}>
            <div style={{ border: "1px solid #dbe2ea", borderRadius: 14, padding: "20px 18px", boxShadow: "0 8px 18px rgba(26,43,74,0.08)" }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: "#64748b", fontSize: 13 }}>From</div>
                <div style={{ color: "#1a2b4a", fontSize: 32, fontWeight: 800, lineHeight: 1.2 }}>{trip.price}</div>
                <div style={{ color: "#64748b", fontSize: 13 }}>per person</div>
              </div>

              <button
                style={{
                  width: "100%",
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  background: "#f8fafc",
                  padding: "11px 12px",
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#334155",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <UserIcon /> Adult x 1
                </span>
                <span>⌄</span>
              </button>

              <button
                style={{
                  width: "100%",
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  background: "#f8fafc",
                  padding: "11px 12px",
                  marginBottom: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#334155",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CalendarIcon /> Select date
                </span>
                <span>⌄</span>
              </button>

              <button
                onClick={handleTripInquiry}
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: 10,
                  background: "#3dba8f",
                  color: "#fff",
                  padding: "12px 14px",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                  marginBottom: 14,
                }}
              >
                Check Availability
              </button>

              <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 12, color: "#475569", fontSize: 13, lineHeight: 1.6 }}>
                <p style={{ margin: "0 0 6px", color: "#16a34a", fontWeight: 700 }}>Free cancellation</p>
                <p style={{ margin: 0 }}>Cancel up to 24 hours in advance for a full refund.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
