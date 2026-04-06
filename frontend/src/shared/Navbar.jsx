import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopHeader from "./TopHeader";

const navLinks = ["Kashmir Packages", "Honeymoon",  "Services", "Spiritual tour", "Activities"];
const dropdownLinks = new Set(["Kashmir Packages", "Honeymoon",  "Services", "Spiritual tour", "Activities"]);

const kashimirPackagesDropdown = [
  "Adventure Tour Package",
  "3 Days Tour",
  "4 Days Tour",
  "7 Days Tour",
  "Family Tour Package",
  "All Kashmir Trips",
];

const honeymoonDropdown = [
  "Romantic Tour",
  "Couple Special",
  "3 Days Honeymoon",
  "4 Days Honeymoon",
  "6 Days Honeymoon",
  "View All Honeymoon",
];



const activitiesDropdown = [
  "Shikara Ride",
  "Houseboat Stay",
  "Gondola Ride",
  "River Rafting",
  "Paragliding",
  "Skiing",
];

const servicesDropdown = [
  "Family Tour",
  "Couple Tour",
  "Group Tour",
  "Hotel Booking",
  "Car Rentals",
];

const spiritualTourDropdown = [
  "Vaishno Devi Temple",
  "Mata Kheer Bhawani Temple",
  "Shankaracharya Temple",
  "Amar Nath Cave",
  "View All Temples",
];

const DropdownArrow = () => (
  <ChevronDown width={12} height={8} strokeWidth={1.5} />
);

export default function Navbar() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Kashmir Packages");
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const kashmirPackageRoutes = {
    "Adventure Tour Package": "/all-daywise-trips?theme=adventure",
    "3 Days Tour": "/all-daywise-trips?days=3",
    "4 Days Tour": "/all-daywise-trips?days=4",
    "7 Days Tour": "/all-daywise-trips?days=7",
    "Family Tour Package": "/all-daywise-trips?theme=family",
    "All Kashmir Trips": "/all-daywise-trips",
  };

  const honeymoonRoutes = {
    "Romantic Tour": "/all-daywise-trips?theme=honeymoon",
    "Couple Special": "/all-daywise-trips?theme=honeymoon",
    "3 Days Honeymoon": "/all-daywise-trips?days=3&theme=honeymoon",
    "4 Days Honeymoon": "/all-daywise-trips?days=4&theme=honeymoon",
    "6 Days Honeymoon": "/all-daywise-trips?days=6&theme=honeymoon",
    "View All Honeymoon": "/all-daywise-trips?theme=honeymoon",
  };

  const hotelRoutes = {
    "All Hotels": "/all-hotels",
    "Hotel Booking": "/services/hotel-booking",
  };

  const spiritualRoutes = {
    "Vaishno Devi Temple": "/all-daywise-trips?theme=spiritual&temple=vaishno-devi",
    "Mata Kheer Bhawani Temple": "/all-daywise-trips?theme=spiritual&temple=kheer-bhawani",
    "Shankaracharya Temple": "/all-daywise-trips?theme=spiritual&temple=shankaracharya",
    "Amar Nath Cave": "/all-daywise-trips?theme=spiritual&temple=amarnath",
   
    "View All Temples": "/all-daywise-trips?theme=spiritual",
  };

  const servicesRoutes = {
    "Family Tour": "/services/family-tour",
    "Couple Tour": "/services/couple-tour",
    "Group Tour": "/services/group-tour",
    "Hotel Booking": "/services/hotel-booking",
    "Car Rentals": "/services/car-rentals",
  };

  const activitiesRoutes = {
    "Shikara Ride": "/activities/shikara-ride",
    "Houseboat Stay": "/activities/houseboat-stay",
    "Gondola Ride": "/activities/gondola-ride",
    "River Rafting": "/activities/river-rafting",
    "Paragliding": "/activities/paragliding",
    "Skiing": "/activities/skiing",
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (link) => {
    if (dropdownLinks.has(link)) {
      setOpenDropdown(openDropdown === link ? null : link);
    } else {
      setOpenDropdown(null);
    }
    setActiveLink(link);
  };

  const handleKashmirPackageClick = (item) => {
    const targetRoute = kashmirPackageRoutes[item] || "/all-daywise-trips";
    setActiveLink("Kashmir Packages");
    setOpenDropdown(null);
    navigate(targetRoute);
  };

  const handleHoneymoonClick = (item) => {
    const targetRoute = honeymoonRoutes[item] || "/all-daywise-trips?theme=honeymoon";
    setActiveLink("Honeymoon");
    setOpenDropdown(null);
    navigate(targetRoute);
  };

  const handleHotelsClick = (item) => {
    const targetRoute = hotelRoutes[item] || "/all-hotels";
    setActiveLink("Hotels");
    setOpenDropdown(null);
    navigate(targetRoute);
  };

  const handleServicesClick = (item) => {
    const targetRoute = servicesRoutes[item] || "/";
    setActiveLink("Services");
    setOpenDropdown(null);
    navigate(targetRoute);
  };

  const handleSpiritualTourClick = (item) => {
    const targetRoute = spiritualRoutes[item] || "/all-daywise-trips?theme=spiritual";
    setActiveLink("Spiritual tour");
    setOpenDropdown(null);
    navigate(targetRoute);
  };

  return (
    <>
      <TopHeader />
      <nav
      style={{
        backgroundColor: "#1a2b4a",
        display: "flex",
        justifyContent: "left",
        padding: "0 32px",
        width: "100%",
        boxSizing: "border-box",
        position: "sticky",
        zIndex: 100,
      }}
    >
      {navLinks.map((link) => (
        <div 
          key={link} 
          style={{ position: "relative" }}
          onMouseEnter={() => {
            if (dropdownLinks.has(link)) {
              setOpenDropdown(link);
            }
          }}
          onMouseLeave={() => {
            setOpenDropdown(null);
          }}
        >
          <button
            onClick={() => handleNavClick(link)}
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
              display: "flex",
              alignItems: "center",
              gap: dropdownLinks.has(link) ? "8px" : "0",
            }}
            onMouseEnter={(e) => {
              if (activeLink !== link) e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              if (activeLink !== link) e.currentTarget.style.color = "#c5cdd8";
            }}
          >
            {link}
            {dropdownLinks.has(link) && <DropdownArrow />}
          </button>

          {/* Kashmir Packages Dropdown Menu */}
          {link === "Kashmir Packages" && openDropdown === "Kashmir Packages" && (
            <div
              ref={dropdownRef}
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                minWidth: "280px",
                zIndex: 9999,
                marginTop: "-3px",
              }}
            >
              {kashimirPackagesDropdown.map((item) => (
                <button
                  key={item}
                  onClick={() => handleKashmirPackageClick(item)}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                 background:"transparent",
                    border: "none",
                    textAlign: "left",
                    fontSize: "14px",
                    color: item === "All Kashmir Trips" ? "#059669" : "#1f2937",
                    fontWeight: item === "All Kashmir Trips" ? "700" : "500",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    borderBottom: item !== kashimirPackagesDropdown[kashimirPackagesDropdown.length - 1] ? "1px solid #f3f4f6" : "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                    e.currentTarget.style.color = "#3dba8f";
                  }}
                  onMouseLeave={(e) => {
                   
                    e.currentTarget.style.color = item === "All Kashmir Trips" ? "#059669" : "#1f2937";
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {/* Honeymoon Dropdown Menu */}
          {link === "Honeymoon" && openDropdown === "Honeymoon" && (
            <div
              ref={dropdownRef}
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                minWidth: "280px",
                zIndex: 9999,
                marginTop: "-3px",
              }}
            >
              {honeymoonDropdown.map((item) => (
                <button
                  key={item}
                  onClick={() => handleHoneymoonClick(item)}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    fontSize: "14px",
                    color: item === "View All Honeymoon" ? "#059669" : "#1f2937",
                    fontWeight: item === "View All Honeymoon" ? "700" : "500",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    borderBottom: item !== honeymoonDropdown[honeymoonDropdown.length - 1] ? "1px solid #f3f4f6" : "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                    e.currentTarget.style.color = "#3dba8f";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = item === "View All Honeymoon" ? "#059669" : "#1f2937";
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

         

          {/* Activities Dropdown Menu */}
          {link === "Activities" && openDropdown === "Activities" && (
            <div
              ref={dropdownRef}
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                minWidth: "280px",
                zIndex: 9999,
                marginTop: "-3px",
              }}
            >
              {activitiesDropdown.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const targetRoute = activitiesRoutes[item]
                    setActiveLink("Activities")
                    setOpenDropdown(null)
                    if (targetRoute) {
                      navigate(targetRoute)
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    fontSize: "14px",
                    color: "#1f2937",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    borderBottom: item !== activitiesDropdown[activitiesDropdown.length - 1] ? "1px solid #f3f4f6" : "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                    e.currentTarget.style.color = "#3dba8f";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#1f2937";
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {/* Services Dropdown Menu */}
          {link === "Services" && openDropdown === "Services" && (
            <div
              ref={dropdownRef}
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                minWidth: "280px",
                zIndex: 9999,
                marginTop: "-3px",
              }}
            >
              {servicesDropdown.map((item) => (
                <button
                  key={item}
                  onClick={() => handleServicesClick(item)}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    fontSize: "14px",
                    color: "#1f2937",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    borderBottom: item !== servicesDropdown[servicesDropdown.length - 1] ? "1px solid #f3f4f6" : "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                    e.currentTarget.style.color = "#3dba8f";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#1f2937";
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {/* Spiritual Tour Dropdown Menu */}
          {link === "Spiritual tour" && openDropdown === "Spiritual tour" && (
            <div
              ref={dropdownRef}
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                minWidth: "280px",
                zIndex: 9999,
                marginTop: "-3px",
              }}
            >
              {spiritualTourDropdown.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSpiritualTourClick(item)}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    background: "transparent",
                    border: "none",
                    textAlign: "left",
                    fontSize: "14px",
                    color: item === "View All Temples" ? "#059669" : "#1f2937",
                    fontWeight: item === "View All Temples" ? "700" : "500",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    borderBottom: item !== spiritualTourDropdown[spiritualTourDropdown.length - 1] ? "1px solid #f3f4f6" : "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                    e.currentTarget.style.color = "#3dba8f";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = item === "View All Temples" ? "#059669" : "#1f2937";
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      </nav>
    </>
  );
}