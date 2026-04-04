import { useState, useEffect } from "react";
import { Clock3, Grid2x2, Heart as HeartIcon, Phone, Search, Star as StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { itineraryAPI } from "../utils/api";

const Heart = ({ filled }) => (
  <HeartIcon width={20} height={20} fill={filled ? "#ff4757" : "none"} color={filled ? "#ff4757" : "#333"} strokeWidth={2} />
);

const Star = ({ filled }) => (
  <StarIcon width={14} height={14} fill={filled ? "#f4c430" : "#ddd"} color={filled ? "#f4c430" : "#ddd"} strokeWidth={1.5} />
);

const SearchIcon = () => (
  <Search width={18} height={18} color="white" strokeWidth={2.5} />
);



const ClockIcon = () => (
  <Clock3 width={14} height={14} strokeWidth={2} />
);

const filters = ["View all trips", "Family", "Honeymoon", "Adventure", "Winter"];

export default function Alltrip() {
  const [wishlist, setWishlist] = useState({});
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [managedTrips, setManagedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const data = await itineraryAPI.getByCategory('popular');
        const transformedTrips = data.map((trip) => ({
          id: trip._id,
          title: trip.title,
          meta: `${trip.duration}  Bestsellers`,
          price: trip.price,
          badge: trip.tag || "Popular",
          rating: 5,
          reviews: 24,
          image: trip.coverImage,
          tag: trip.tag,
        }));
        setManagedTrips(transformedTrips);
      } catch (err) {
        console.error('Error fetching popular trips:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const toggleWishlist = (id) => setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));

  const visibleTrips = managedTrips.filter((trip) =>
    trip.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f9fafb", minHeight: "100vh", color: "#111", display: "flex", flexDirection: "column" }}>
      {/* Top Bar */}
      
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
                maxWidth: "700px",
              }}
            >
              Discover all our curated Haba Khatoon Travels packages and find the perfect trip for your next adventure.
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
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
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
          )}

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