import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Heart = ({ filled }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#ff4757" : "none"} stroke={filled ? "#ff4757" : "#333"} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const Star = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#f4c430" : "#ddd"} stroke="none">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const NavDots = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="0" y="0" width="8" height="8" rx="1.5" fill="#38b2a3" />
    <rect x="14" y="0" width="8" height="8" rx="1.5" fill="#38b2a3" />
    <rect x="0" y="14" width="8" height="8" rx="1.5" fill="#38b2a3" />
    <rect x="14" y="14" width="8" height="8" rx="1.5" fill="#38b2a3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" fill="none" stroke="#38b2a3" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const activities = [
  {
    id: 1,
    title: "Classic Family Trip",
    meta: "6 Days / 5 Nights  Bestsellers",
    price: "18,999",
    badge: "Popular",
    rating: 5,
    reviews: 26,
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    title: "Kashmir Summer Trip",
    meta: "5 Days / 4 Nights  Summer Special",
    price: "14,999",
    badge: "Summer",
    rating: 4,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    title: "Winter Kashmir Trip",
    meta: "7 Days / 6 Nights  Winter Escape",
    price: "22,499",
    badge: "Winter",
    rating: 5,
    reviews: 34,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    title: "Kashmir Honeymoon Package",
    meta: "8 Days / 7 Nights  Most Romantic",
    price: "27,999",
    badge: "Honeymoon",
    rating: 5,
    reviews: 41,
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    title: "Adventure Kashmir Trek",
    meta: "9 Days / 8 Nights  Adventure",
    price: "24,999",
    badge: "Adventure",
    rating: 4,
    reviews: 17,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 6,
    title: "Weekend Kashmir Getaway",
    meta: "4 Days / 3 Nights  Quick Escape",
    price: "10,999",
    badge: "Weekend",
    rating: 4,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1571992440736-8f6c4db3a670?auto=format&fit=crop&w=700&q=80",
  },
];

const filters = ["View all trips", "Family", "Honeymoon", "Adventure", "Winter"];

export default function Alltrip() {
  const [wishlist, setWishlist] = useState({});
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleWishlist = (id) => setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));

  const visibleTrips = activities.filter((trip) =>
    trip.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f9fafb", minHeight: "100vh", color: "#111", display: "flex", flexDirection: "column" }}>
      {/* Top Bar */}
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
          margin: 0,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <NavDots />
          <span
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#1a2b4a",
              letterSpacing: "-0.3px",
            }}
          >
            Kashmir Tour Travel
          </span>
        </div>

        {/* Center Info */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#555", fontSize: "14px" }}>
            <PhoneIcon />
            <span>+1 323-913-4688</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          style={{
            backgroundColor: "#3dba8f",
            color: "#fff",
            border: "none",
            padding: "11px 24px",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            letterSpacing: "0.3px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#2ea87e")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#3dba8f")}
        >
          Get a Free Quote
        </button>
      </div>
      <Navbar />

      <div style={{ flex: 1 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 20px" }}>
          {/* Header */}
          <div style={{ marginBottom: "40px" }}>
            <button
              onClick={() => navigate("/")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#2563eb",
                fontSize: "14px",
                fontWeight: "600",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0",
                marginBottom: "16px",
              }}
            >
              ← Back to Home
            </button>
            <h1
              style={{
                fontSize: "42px",
                fontWeight: "700",
                color: "#0f1923",
                margin: "0 0 12px",
                lineHeight: "1.2",
              }}
            >
              All Kashmir Tours
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "#6b7280",
                margin: "0",
                maxWidth: "600px",
              }}
            >
              Discover all our curated Kashmir travel packages and find the perfect trip for your next adventure.
            </p>
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: "40px", display: "flex", alignItems: "center", gap: 0, maxWidth: 520 }}>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Kashmir trips"
              style={{
                flex: 1,
                border: "1.5px solid #d1d5db",
                borderRight: "none",
                borderRadius: "8px 0 0 8px",
                padding: "12px 16px",
                fontSize: "14px",
                outline: "none",
                color: "#333",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <button
              style={{
                background: "#2563eb",
                border: "1.5px solid #2563eb",
                borderRadius: "0 8px 8px 0",
                padding: "12px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "44px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#2563eb")}
            >
              <SearchIcon />
            </button>
          </div>

          {/* Trips Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
          >
            {visibleTrips.map((act) => (
              <div
                key={act.id}
                onClick={() => navigate(`/trips/${act.id}`)}
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: "1px solid #e5e7eb",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                }}
              >
                <div style={{ position: "relative", height: "210px", overflow: "hidden" }}>
                  <img
                    src={act.image}
                    alt={act.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  {act.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        background: "rgba(0,0,0,0.75)",
                        color: "#fff",
                        fontSize: "10px",
                        fontWeight: "600",
                        padding: "4px 10px",
                        borderRadius: "4px",
                        textTransform: "uppercase",
                      }}
                    >
                      {act.badge}
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(act.id);
                    }}
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "rgba(255,255,255,0.95)",
                      border: "none",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    }}
                  >
                    <Heart filled={wishlist[act.id]} />
                  </button>
                </div>

                <div style={{ padding: "18px 16px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "#9ca3af",
                      fontSize: "12px",
                      fontFamily: "'DM Sans', sans-serif",
                      marginBottom: "8px",
                    }}
                  >
                    <ClockIcon />
                    {act.meta.split("  ")[0]}
                  </div>

                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#0f1923",
                      margin: "0 0 10px",
                      lineHeight: "1.4",
                      minHeight: "40px",
                    }}
                  >
                    {act.title}
                  </h3>

                  {act.rating && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        marginBottom: "10px",
                      }}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} filled={i < act.rating} />
                      ))}
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          marginLeft: "4px",
                        }}
                      >
                        ({act.reviews})
                      </span>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "6px",
                      fontSize: "13px",
                      color: "#6b7280",
                    }}
                  >
                    From{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#0f1923",
                      }}
                    >
                      ₹{act.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleTrips.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#6b7280",
              }}
            >
              <p style={{ fontSize: "16px" }}>
                No trips found for "{searchQuery}".
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}