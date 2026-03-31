import { useState } from "react";
 
const reasons = [
  
  {
    id: 1,
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    title: "Local Expert Guides",
    description: "Born-and-raised locals who know every hidden trail and secret viewpoint.",
    accent: "#2563eb",
    bg: "#eff6ff",
  },
  {
    id: 2,
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "50,000+ Happy Travelers",
    description: "A 4.9★ average across 12,000 verified reviews from real travelers.",
    accent: "#db2777",
    bg: "#fdf2f8",
  },
  
  {
    id: 3,
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    title: "No Hidden Charges",
    description: "All inclusions listed upfront. Best-price guarantee on every package.",
    accent: "#ea580c",
    bg: "#fff7ed",
  },
  {
    id: 4,
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 0111.62 19 19.5 19.5 0 015.8 13.18 19.79 19.79 0 013.1 4.2 2 2 0 015.08 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 9.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    title: "24/7 On-Trip Support",
    description: "Real humans available round the clock — not bots, not voicemail.",
    accent: "#0891b2",
    bg: "#ecfeff",
  },
 
 
];
 
const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "50K+", label: "Happy Travelers" },
  { value: "120+", label: "Destinations" },
  { value: "4.9★", label: "Avg. Rating" },
];
 
export default function WhyChooseUsWhite() {
  const [hovered, setHovered] = useState(null);
 
  return (
    <div style={{ backgroundColor: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
 
        .wcu-sm-card {
          transition: all 0.26s cubic-bezier(.22,.68,0,1.2);
          cursor: default;
        }
        .wcu-sm-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.09) !important;
        }
        .wcu-sm-icon {
          transition: transform 0.28s ease;
        }
        .wcu-sm-card:hover .wcu-sm-icon {
          transform: scale(1.18) rotate(-6deg);
        }
        .stat-item {
          transition: transform 0.2s ease;
        }
        .stat-item:hover { transform: translateY(-3px); }
      `}</style>
 
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "72px 32px 80px" }}>
 
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "52px", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div style={{ width: "28px", height: "3px", backgroundColor: "#3dba8f", borderRadius: "2px" }} />
              <span style={{
                color: "#3dba8f", fontSize: "11px", fontWeight: "700",
                letterSpacing: "3px", textTransform: "uppercase",
              }}>
                Why Kashmir Tour Travel?
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: "800",
              color: "#0f1923",
              margin: 0,
              lineHeight: "1.15",
            }}>
              Why Travelers Choose Us
            </h2>
          </div>
          <p style={{
            color: "#6b7280",
            fontSize: "14.5px",
            maxWidth: "380px",
            lineHeight: "1.75",
            fontWeight: "300",
            margin: 0,
          }}>
            We go beyond bookings — our experience, transparency, and care make every Kashmir trip extraordinary.
          </p>
        </div>
 
        {/* Stats Row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "48px",
        }}>
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-item"
              style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "22px 20px",
                textAlign: "center",
              }}
            >
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "32px",
                fontWeight: "800",
                color: "#1a2b4a",
                lineHeight: 1,
                marginBottom: "6px",
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "500", letterSpacing: "0.4px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
 
        {/* Cards Grid — 4 columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}>
          {reasons.map((r) => (
            <div
              key={r.id}
              className="wcu-sm-card"
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                backgroundColor: hovered === r.id ? r.bg : "#fff",
                border: `1.5px solid ${hovered === r.id ? r.accent + "44" : "#f0f0f0"}`,
                borderRadius: "14px",
                padding: "24px 22px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              {/* Icon box */}
              <div
                className="wcu-sm-icon"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: r.bg,
                  border: `1px solid ${r.accent}30`,
                  color: r.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                {r.icon}
              </div>
 
              {/* Title */}
              <h4 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "15px",
                fontWeight: "700",
                color: "#0f1923",
                margin: "0 0 8px",
                lineHeight: "1.35",
              }}>
                {r.title}
              </h4>
 
              {/* Description */}
              <p style={{
                color: "#6b7280",
                fontSize: "13px",
                lineHeight: "1.65",
                margin: "0 0 16px",
                fontWeight: "300",
              }}>
                {r.description}
              </p>
 
              {/* Accent underline */}
              <div style={{
                width: hovered === r.id ? "32px" : "20px",
                height: "2.5px",
                backgroundColor: r.accent,
                borderRadius: "2px",
                transition: "width 0.3s ease",
              }} />
            </div>
          ))}
        </div>
 
        {/* Bottom CTA row */}
        <div style={{
          marginTop: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#1a2b4a",
          borderRadius: "16px",
          padding: "32px 40px",
          flexWrap: "wrap",
          gap: "20px",
        }}>
          <div>
            <p style={{
              color: "#3dba8f",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              margin: "0 0 6px",
            }}>
              Ready to Explore Kashmir?
            </p>
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "22px",
              fontWeight: "700",
              color: "#fff",
              margin: 0,
            }}>
              Let our experts plan your perfect trip — free of charge.
            </h3>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button style={{
              backgroundColor: "#3dba8f",
              color: "#fff",
              border: "none",
              padding: "12px 28px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.3px",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#2ea87e"}
              onMouseLeave={e => e.currentTarget.style.background = "#3dba8f"}
            >
              Get Free Quote
            </button>
            <button style={{
              backgroundColor: "transparent",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.25)",
              padding: "12px 28px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"}
            >
              Talk to an Expert
            </button>
          </div>
        </div>
 
      </div>
    </div>
  );
}