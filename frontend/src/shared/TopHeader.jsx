import { Grid2x2, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const NavDots = () => (
  <Grid2x2 width={22} height={22} color="#38b2a3" strokeWidth={2} />
);

const PhoneIcon = () => (
  <Phone width={18} height={18} color="#38b2a3" strokeWidth={2} />
);

export default function TopHeader() {
  return (
    <>
      {/* Beta Banner */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#ffc107",
          color: "#111",
          textAlign: "center",
          padding: "8px 16px",
          fontSize: "14px",
          fontWeight: "500",
          letterSpacing: "0.2px",
          boxSizing: "border-box"
        }}
      >
        🚧 This website is currently in Beta version. Some features may still be under development.
      </div>

      <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 32px",
        borderBottom: "1px solid #e8e8e8",
        backgroundColor: "#fff",
        width: "100%",
        boxSizing: "border-box",
        margin: 0,
      }}
    >
      {/* Logo */}
      <Link 
        to="/" 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "12px", 
          textDecoration: "none",
          cursor: "pointer" 
        }}
      >
        <img src="/logo.png" alt="Haba Khatoon Travels Logo" style={{ height: "70px", objectFit: "contain" }} />
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "28px",
            fontWeight: "600",
            color: "#1a2b4a",
            letterSpacing: "1px",
          }}
        >
          Haba Khatoon Travels
        </span>
      </Link>

      {/* Center Info */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#555", fontSize: "14px" }}>
          <PhoneIcon />
          <span>+91-9149680276</span>
        </div>
      </div>

      {/* CTA Button */}
      <a
        href="https://wa.me/919149680276?text=Hi!%20I%20would%20like%20to%20get%20a%20free%20quote%20for%20a%20trip."
        target="_blank"
        rel="noopener noreferrer"
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
          textDecoration: "none",
          display: "inline-block",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#2ea87e")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#3dba8f")}
      >
        Get a Free Quote
      </a>
    </div>
    </>
  );
}
