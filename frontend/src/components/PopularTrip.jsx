import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { popularTrips as trips } from "../data/popularTrips";
 
const filters = ["View all trips", "Operator services", "Kashmir Honeymoon Packages"];
 
const ArrowRight = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
 
const ClockIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
 
export default function PopularKashmirTrips() {
  const [activeFilter, setActiveFilter] = useState("View all trips");
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const openTrip = (tripId) => navigate(`/trips/${tripId}`);
 
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        backgroundColor: "#fff",
        padding: "48px 0 72px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
 
        .pkт-card {
          transition: box-shadow 0.28s ease, transform 0.28s ease;
          cursor: pointer;
        }
        .pkт-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.12) !important;
        }
        .pkт-card:hover .card-img {
          transform: scale(1.04);
        }
        .card-img {
          transition: transform 0.5s ease;
        }
        .pkт-link {
          transition: color 0.2s, gap 0.2s;
          text-decoration: none;
        }
        .pkт-link:hover { color: #1d4ed8 !important; }
        .filter-btn {
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
          font-family: 'DM Sans', sans-serif;
          padding: 0;
        }
        .read-more {
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          font-weight: 600;
          color: #2563eb;
          text-decoration: none;
          border-bottom: 1.5px solid transparent;
          padding-bottom: 1px;
        }
        .read-more:hover {
          border-bottom-color: #2563eb;
          gap: 8px;
        }
      `}</style>
 
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>
 
        {/* Header Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "6px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: "800",
                color: "#0f1923",
                margin: "0 0 10px",
                lineHeight: "1.1",
              }}
            >
              Popular Kashmir Trips
            </h2>
            {/* Blue underline */}
            <div
              style={{
                width: "52px",
                height: "3.5px",
                backgroundColor: "#2563eb",
                borderRadius: "2px",
              }}
            />
          </div>
          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              maxWidth: "480px",
              lineHeight: "1.65",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: "300",
              paddingTop: "6px",
            }}
          >
            Explore our complete collection of trips with pricing, inclusions, and itineraries — crafted by local Kashmir experts.
          </p>
        </div>
 
        {/* See all link + Filters */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "24px 0 32px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <button
            onClick={() => navigate('/alltrips')}
            className="pkт-link"
            style={{
              color: "#2563eb",
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "'DM Sans', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0
            }}
          >
            See all Kashmir trips →
          </button>
 
          {/* Filter Pills */}
          <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
            {filters.map((f, i) => (
              <span key={f} style={{ display: "flex", alignItems: "center" }}>
                <button
                  className="filter-btn"
                  onClick={() => setActiveFilter(f)}
                  style={{
                    fontSize: "14px",
                    fontWeight: activeFilter === f ? "600" : "400",
                    color: activeFilter === f ? "#0f1923" : "#6b7280",
                    borderBottom: activeFilter === f ? "2px solid #2563eb" : "2px solid transparent",
                    paddingBottom: "3px",
                  }}
                >
                  {f}
                </button>
                {i < filters.length - 1 && (
                  <span style={{ color: "#d1d5db", margin: "0 14px", fontSize: "16px" }}>|</span>
                )}
              </span>
            ))}
          </div>
        </div>
 
        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
          }}
        >
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="pkт-card"
              onClick={() => openTrip(trip.id)}
              onMouseEnter={() => setHoveredCard(trip.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", overflow: "hidden", height: "210px" }}>
                <img
                  className="card-img"
                  src={trip.image}
                  alt={trip.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {/* Tag badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    backgroundColor: trip.tagColor,
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: "700",
                    letterSpacing: "0.8px",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontFamily: "'DM Sans', sans-serif",
                    textTransform: "uppercase",
                  }}
                >
                  {trip.tag}
                </div>
              </div>
 
              {/* Body */}
              <div style={{ padding: "22px 22px 26px" }}>
                {/* Duration */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#9ca3af",
                    fontSize: "12px",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: "8px",
                  }}
                >
                  <ClockIcon />
                  {trip.duration}
                </div>
 
                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "19px",
                    fontWeight: "700",
                    color: "#0f1923",
                    margin: "0 0 10px",
                    lineHeight: "1.3",
                  }}
                >
                  {trip.title}
                </h3>
 
                {/* Description */}
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "13.5px",
                    lineHeight: "1.65",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: "300",
                    margin: "0 0 18px",
                  }}
                >
                  {trip.description}
                </p>
 
                {/* Price + CTA row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "16px",
                    borderTop: "1px solid #f3f4f6",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#9ca3af",
                        fontFamily: "'DM Sans', sans-serif",
                        display: "block",
                        marginBottom: "2px",
                      }}
                    >
                      Starting from
                    </span>
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#0f1923",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {trip.price}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#9ca3af",
                        fontFamily: "'DM Sans', sans-serif",
                        marginLeft: "3px",
                      }}
                    >
                      /person
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openTrip(trip.id);
                    }}
                    className="read-more"
                    style={{ border: "none", background: "none", padding: 0, cursor: "pointer" }}
                  >
                    View Trip <ArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
 
        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "52px" }}>
          <button
            onClick={() => navigate('/alltrips')}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#2563eb",
              color: "#fff",
              padding: "13px 32px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.3px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
          >
            See All Kashmir Trips <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}