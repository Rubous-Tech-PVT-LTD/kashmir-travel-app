import { useState, useEffect } from "react";
import { ArrowRight as ArrowRightIcon, Clock3, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { itineraryAPI } from "../utils/api";
import { sectionStyles } from "../ui/tripSectionStyles";
import ui from "../ui/tripSection.module.css";

const filters = ["View all trips", "Operator services", "Kashmir Honeymoon Packages"];
const bottomCtaStyle = {
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
};

const ArrowRight = () => (
  <ArrowRightIcon width={14} height={14} strokeWidth={2.2} />
);

const ClockIcon = () => (
  <Clock3 width={13} height={13} strokeWidth={2} />
);

export default function PopularKashmirTrips() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("View all trips");
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true)
      try {
        const data = await itineraryAPI.getByCategory('popular')
        const transformed = data.map((trip) => ({
          id: trip._id,
          category: trip.category,
          title: trip.title,
          description: trip.description || '',
          image: trip.coverImage,
          duration: trip.itinerary ? 
            `${trip.itinerary.length} Days / ${Math.max(0, trip.itinerary.length - 1)} Nights` : 
            'N/A',
          price: trip.price,
          tag: trip.tag || 'Kashmir Tour',
          tagColor: trip.tagColor || '#2563eb',
          isComingSoon: trip.isComingSoon || false,
          itinerary: trip.itinerary || []
        }))
        setTrips(transformed)
      } catch (err) {
        console.error('Error fetching trips:', err)
        setTrips([])
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [])

  const openTrip = (tripId) => navigate(`/trips/${tripId}`);

  const visibleTrips = trips.filter((trip) => trip.category === 'popular').filter((trip) => {
    if (activeFilter === "View all trips") {
      return true;
    }

    const honeymoonMatch = /honeymoon|romantic/i.test(`${trip.title} ${trip.tag}`);

    if (activeFilter === "Kashmir Honeymoon Packages") {
      return honeymoonMatch;
    }

    if (activeFilter === "Operator services") {
      return !honeymoonMatch;
    }

    return true;
  });

  return (
    <div style={sectionStyles.page}>
      <div style={sectionStyles.container}>
 
        {loading ? (
          <div style={sectionStyles.loadingWrap}>
            <Loader size={40} className={ui.spin} />
          </div>
        ) : (
          <>
        {/* Header Row */}
        <div style={sectionStyles.headerRow}>
          <div>
            <h2 style={sectionStyles.title}>
              Popular Kashmir Trips
            </h2>
            {/* Blue underline */}
            <div style={sectionStyles.titleUnderline} />
          </div>
          <p style={{ ...sectionStyles.subtitle, maxWidth: '480px' }}>
            Explore our complete collection of trips with pricing, inclusions, and itineraries — crafted by local Kashmir experts.
          </p>
        </div>
 
        {/* See all link + Filters */}
        <div style={sectionStyles.sectionRow}>
          <button
            onClick={() => navigate("/alltrips")}
            className={ui.linkButton}
            style={sectionStyles.linkButton}
          >
            See all Kashmir trips →
          </button>
 
          {/* Filter Pills */}
          <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
            {filters.map((filterLabel, filterIndex) => (
              <span key={filterLabel} style={{ display: "flex", alignItems: "center" }}>
                <button
                  className={ui.filterButton}
                  onClick={() => setActiveFilter(filterLabel)}
                  style={{
                    ...sectionStyles.filterButtonBase,
                    ...(activeFilter === filterLabel ? sectionStyles.filterButtonActive : null),
                  }}
                >
                  {filterLabel}
                </button>
                {filterIndex < filters.length - 1 && (
                  <span style={sectionStyles.filterSeparator}>|</span>
                )}
              </span>
            ))}
          </div>
        </div>
 
        {/* Cards Grid */}
        <div style={sectionStyles.cardsGrid}>
          {visibleTrips.length > 0 ? (
            visibleTrips.map((trip) => (
            <div
              key={trip.id}
              className={ui.card}
              onClick={() => openTrip(trip.id)}
              style={sectionStyles.card}
            >
              {/* Image */}
              <div style={sectionStyles.imageWrap}>
                <img
                  className={ui.image}
                  src={trip.image}
                  alt={trip.title}
                  style={sectionStyles.image}
                />
                {/* Tag badge */}
                <div style={{ ...sectionStyles.badge, backgroundColor: trip.tagColor }}>
                  {trip.tag}
                </div>
                {/* Coming Soon Badge */}
                {trip.isComingSoon && (
                  <div style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "#f59e0b",
                    color: "#000",
                    fontSize: "10px",
                    fontWeight: "800",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    boxShadow: "0 4px 12px rgba(245, 158, 11, 0.4)",
                    zIndex: 10
                  }}>
                    Coming Soon
                  </div>
                )}
              </div>
 
              {/* Body */}
              <div style={sectionStyles.cardBody}>
                {/* Duration */}
                <div style={sectionStyles.duration}>
                  <ClockIcon />
                  {trip.duration}
                </div>
 
                {/* Title */}
                <h3 style={sectionStyles.cardTitle}>
                  {trip.title}
                </h3>
 
                {/* Description */}
                <p style={sectionStyles.cardDescription}>
                  {trip.description}
                </p>
 
                {/* Price + CTA row */}
                <div style={sectionStyles.priceRow}>
                  <div>
                    <span style={sectionStyles.priceMeta}>
                      Starting from
                    </span>
                    <span style={sectionStyles.priceValue}>
                      {trip.isComingSoon ? 'TBA' : trip.price}
                    </span>
                    <span style={sectionStyles.priceSuffix}>
                      /person
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (trip.isComingSoon) {
                        const msg = encodeURIComponent(`Hi! I'm interested in the upcoming trip: ${trip.title}`);
                        window.open(`https://wa.me/919149680276?text=${msg}`, '_blank');
                      } else {
                        openTrip(trip.id);
                      }
                    }}
                    className={ui.readMore}
                    style={{ 
                      border: 'none', 
                      background: trip.isComingSoon ? '#f59e0b22' : 'none', 
                      padding: trip.isComingSoon ? '6px 12px' : 0, 
                      borderRadius: '6px',
                      color: trip.isComingSoon ? '#f59e0b' : 'inherit',
                      fontWeight: trip.isComingSoon ? 'bold' : 'normal',
                      cursor: 'pointer' 
                    }}
                  >
                    {trip.isComingSoon ? 'Enquire' : 'View Trip'} <ArrowRight />
                  </button>
                </div>
              </div>
            </div>
            ))
          ) : (
            <div style={sectionStyles.emptyStateWrap}>
              <p style={sectionStyles.emptyStateText}>No trips available. Please check back soon.</p>
            </div>
          )}
        </div>
 
        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "52px" }}>
          <button
            onClick={() => navigate("/alltrips")}
            style={bottomCtaStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
          >
            See All Kashmir Trips <ArrowRight />
          </button>
        </div>
          </>
        )}
      </div>
    </div>
  );
}