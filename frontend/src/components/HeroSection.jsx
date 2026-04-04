import { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { adminAPI } from "../utils/api";

const defaultHeroImage =
  "https://camo.githubusercontent.com/1b18608c396cc46626637014a8bf370ee07b60dd7602cd58f55bf1a64c6aa23d/68747470733a2f2f696d616765732e756e73706c6173682e636f6d2f70686f746f2d313539353831353737313631342d6164653964363532613635643f69786c69623d72622d342e302e33266175746f3d666f726d6174266669743d63726f7026773d3132303026713d3830";

export default function HeroSection() {
  const [heroImages, setHeroImages] = useState([defaultHeroImage]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await adminAPI.getSettings();
        if (data.success && data.data.heroImages && data.data.heroImages.length > 0) {
          setHeroImages(data.data.heroImages);
        }
      } catch (err) {
        console.error("Error fetching hero banner:", err);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", margin: 0, width: "100%", padding: 0 }}>
      {/* Navbar with TopHeader */}
      <Navbar />
      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "420px",
          overflow: "hidden",
          backgroundColor: "#1a2b4a",
          margin: 0,
          padding: 0,
        }}
      >
        {/* Transparent Images Wrapper for Transitions */}
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
              opacity: idx === currentIndex ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
              zIndex: idx === currentIndex ? 1 : 0,
            }}
          />
        ))}
        {/* Dark overlay on left - Softened for 'Modern & Open' feel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)",
            zIndex: 2,
          }}
        />

        {/* Hero Content */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            padding: "60px 40px",
            maxWidth: "500px",
          }}
        >
          <p
            style={{
              color: "#3dba8f", // BRAND COLOR
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "10px",
              textShadow: "0 2px 4px rgba(0,0,0,0.4)",
            }}
          >
            Explore Kashmir with Trusted Local Travel Experts
          </p>
          <h1
            style={{
              color: "#fff",
              fontSize: "42px",
              fontWeight: "400",
              lineHeight: "1.1",
              margin: "0 0 24px 0",
              textShadow: "0 4px 10px rgba(0,0,0,0.5)",
            }}
          >
            Trust <strong style={{ fontWeight: "800", color: "#3dba8f" }}>Our Experience</strong>
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

      </div>
    </div>
  );
}
