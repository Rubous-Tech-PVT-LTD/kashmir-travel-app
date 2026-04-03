import { Grid2x2, Phone } from "lucide-react";

const NavDots = () => (
  <Grid2x2 width={22} height={22} color="#38b2a3" strokeWidth={2} />
);

const PhoneIcon = () => (
  <Phone width={18} height={18} color="#38b2a3" strokeWidth={2} />
);

export default function TopHeader() {
  return (
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
  );
}
