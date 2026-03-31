import { useState } from "react";
import Navbar from "./Navbar";

const heroImage =
  "https://camo.githubusercontent.com/1b18608c396cc46626637014a8bf370ee07b60dd7602cd58f55bf1a64c6aa23d/68747470733a2f2f696d616765732e756e73706c6173682e636f6d2f70686f746f2d313539353831353737313631342d6164653964363532613635643f69786c69623d72622d342e302e33266175746f3d666f726d6174266669743d63726f7026773d3132303026713d3830";

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

export default function HeroSection() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", margin: 0, width: "100%", padding: 0 }}>
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
<Navbar/>
      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "420px",
          overflow: "hidden",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          margin: 0,
          padding: 0,
        }}
      >
        {/* Dark overlay on left */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
          }}
        />

        {/* Hero Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "80px 48px",
            maxWidth: "560px",
          }}
        >
          <p
            style={{
              color: "#e0e0e0",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Explore Kashmir with Trusted Local Travel Experts
          </p>
          <h1
            style={{
              color: "#fff",
              fontSize: "48px",
              fontWeight: "400",
              lineHeight: "1.15",
              margin: "0 0 32px 0",
            }}
          >
            Trust <strong style={{ fontWeight: "800" }}>Our Experience</strong>
          </h1>
          <button
            style={{
              backgroundColor: "transparent",
              color: "#fff",
              border: "2px solid #fff",
              padding: "12px 28px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              letterSpacing: "0.5px",
              transition: "all 0.25s",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.color = "#1a2b4a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#fff";
            }}
          >
            Get in touch
          </button>
        </div>

        {/* Slide Indicators */}
        <div
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            zIndex: 3,
          }}
        >
          {[true, false, false].map((active, i) => (
            <div
              key={i}
              style={{
                width: "10px",
                height: active ? "28px" : "10px",
                backgroundColor: active ? "#3dba8f" : "rgba(255,255,255,0.5)",
                borderRadius: "4px",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
