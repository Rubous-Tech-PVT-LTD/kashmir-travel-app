import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="10" y1="18" x2="14" y2="18" />
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
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
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#fff", minHeight: "100vh", color: "#111" }}>
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
          onClick={() => navigate("/")}
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
          Back to Home
        </button>
      </div>

      
        <div style={{ display: "flex", alignItems: "center", gap: 0, width: "100%", maxWidth: 520 }}>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Kashmir trips"
            style={{ flex: 1, border: "1.5px solid #ccc", borderRight: "none", borderRadius: "24px 0 0 24px", padding: "10px 18px", fontSize: 14, outline: "none", color: "#333" }}
          />
          <button style={{ background: "#0066ff", border: "1.5px solid #0066ff", borderRadius: "0 24px 24px 0", padding: "10px 16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", height: 43 }}>
            <SearchIcon />
          </button>
        </div>
      

      <div style={{ borderBottom: "1px solid #e8e8e8", padding: "0 24px", display: "flex", alignItems: "center", gap: 32, height: 48 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#111", borderBottom: "2px solid #ff4500", paddingBottom: 2, cursor: "pointer" }}>
          Explore Jammu and Kashmir
        </span>
      </div>

      <div style={{ padding: "14px 24px", display: "flex", alignItems: "center", gap: 10, overflowX: "auto", scrollbarWidth: "none" }}>
        <button
          onClick={() => setActiveFilter(null)}
          style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6, border: "1.5px solid #ccc", borderRadius: 24, padding: "8px 16px", background: "#fff", fontSize: 13, cursor: "pointer", fontWeight: 500, color: "#333" }}
        >
          <FilterIcon /> Filters
        </button>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f === activeFilter ? null : f)}
            style={{
              flexShrink: 0,
              border: `1.5px solid ${activeFilter === f ? "#0066ff" : "#ccc"}`,
              borderRadius: 24,
              padding: "8px 16px",
              background: activeFilter === f ? "#e8f0ff" : "#fff",
              fontSize: 13,
              cursor: "pointer",
              color: activeFilter === f ? "#0055cc" : "#333",
              fontWeight: 500,
              transition: "all 0.15s",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ padding: "4px 24px 16px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14, color: "#333", fontWeight: 500 }}>{visibleTrips.length} popular trips:</span>
        <InfoIcon />
      </div>

      <div style={{ padding: "0 24px 40px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {visibleTrips.map((act) => (
          <div
            key={act.id}
            onClick={() => navigate(`/trips/${act.id}`)}
            style={{ borderRadius: 12, overflow: "hidden", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.13)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.08)";
            }}
          >
            <div style={{ position: "relative", height: 200 }}>
              <img src={act.image} alt={act.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              {act.badge && (
                <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.75)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 4 }}>
                  {act.badge}
                </div>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(act.id);
                }}
                style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }}
              >
                <Heart filled={wishlist[act.id]} />
              </button>
            </div>

            <div style={{ padding: "14px 14px 16px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111", lineHeight: 1.4, marginBottom: 8, minHeight: 56 }}>{act.title}</div>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 10 }}>{act.meta}</div>

              {act.rating && (
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} filled={i < act.rating} />
                  ))}
                  <span style={{ fontSize: 12, color: "#666" }}>({act.reviews})</span>
                </div>
              )}

              <div style={{ fontSize: 13, color: "#333" }}>
                From <span style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>{act.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleTrips.length === 0 && (
        <div style={{ textAlign: "center", padding: "0 24px 36px", color: "#64748b", fontSize: 15 }}>
          No trips found for "{searchQuery}".
        </div>
      )}
      <Footer />
    </div>
  );
}