import { useState } from "react";

const navLinks = ["Kashmir Packages", "Honeymoon", "Services", "Spiritual tour", "Activities"];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Kashmir Packages");

  return (
    <nav
      style={{
        backgroundColor: "#1a2b4a",
        display: "flex",
        
        justifyContent: "left",
        padding: "0 32px",
        width: "100%",
        boxSizing: "border-box",
        position:"sticky"
      }}
    >
      {navLinks.map((link) => (
        <button
          key={link}
          onClick={() => setActiveLink(link)}
          style={{
            background: activeLink === link ? "#243a5e" : "transparent",
            color: activeLink === link ? "#fff" : "#c5cdd8",
            border: "none",
            padding: "16px 20px",
            fontSize: "14px",
            fontWeight: activeLink === link ? "600" : "400",
            cursor: "pointer",
            letterSpacing: "0.2px",
            transition: "all 0.2s",
            borderBottom: activeLink === link ? "3px solid #3dba8f" : "3px solid transparent",
          }}
          onMouseEnter={(e) => {
            if (activeLink !== link) e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            if (activeLink !== link) e.currentTarget.style.color = "#c5cdd8";
          }}
        >
          {link}
        </button>
      ))}
    </nav>
  );
}