import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getTripById } from "../data/popularTrips";

const NavDots = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="0" y="0" width="8" height="8" rx="1.5" fill="#38b2a3" />
    <rect x="14" y="0" width="8" height="8" rx="1.5" fill="#38b2a3" />
    <rect x="0" y="14" width="8" height="8" rx="1.5" fill="#38b2a3" />
    <rect x="14" y="14" width="8" height="8" rx="1.5" fill="#38b2a3" />
  </svg>
);

const Heart = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#ef4444" : "none"} stroke={filled ? "#ef4444" : "#334155"} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f4c430" stroke="none">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

export default function TripDetail() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [wishlisted, setWishlisted] = useState(false);

  const trip = useMemo(() => getTripById(tripId), [tripId]);

  if (!trip) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
        <h2 style={{ margin: 0, color: "#1a2b4a" }}>Trip not found</h2>
        <button
          onClick={() => navigate("/")}
          style={{ border: "none", background: "#3dba8f", color: "#fff", padding: "10px 16px", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}
        >
          Go to Home
        </button>
      </div>
    );
  }

  const [heroImage, ...smallImages] = trip.gallery;

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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 32px",
          borderBottom: "1px solid #e8e8e8",
          backgroundColor: "#fff",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <NavDots />
          <span style={{ fontSize: "22px", fontWeight: "700", color: "#1a2b4a", letterSpacing: "-0.3px" }}>Kashmir Tour Travel</span>
        </div>

        <button
          onClick={() => navigate("/alltrips")}
          style={{
            backgroundColor: "#3dba8f",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          View All Trips
        </button>
      </div>

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
            <span style={{ color: "#64748b", fontSize: 14 }}>By Kashmir Tour Travel</span>
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
                Check availability
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
