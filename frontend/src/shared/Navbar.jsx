import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopHeader from "./TopHeader";

const navLinks = ["Kashmir Packages", "Honeymoon", "Services", "Spiritual tour", "Activities", "Blogs"];


const kashimirPackagesDropdown = [
  "Adventure Kashmir Trek",
  "3 Days Tour",
  "4 Days Tour",
  "6 Days Tour",
  "7 Days Tour",
  "Family Tour Package",
  "All Kashmir Trips",
];

const honeymoonDropdown = [
  "Romantic Tour",
  "Couple Special",
  "3 Days Honeymoon",
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

export default function Navbar() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Kashmir Packages");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const routesMap = {
    "Kashmir Packages": {
      data: kashimirPackagesDropdown,
      routes: {
        "Adventure Kashmir Trek": "/alltrips?category=adventure-trek",
        "3 Days Tour": "/all-daywise-trips?days=3",
        "4 Days Tour": "/all-daywise-trips?days=4",
        "6 Days Tour": "/all-daywise-trips?days=6",
        "7 Days Tour": "/all-daywise-trips?days=7",
        "Family Tour Package": "/alltrips?category=family-tour",
        "All Kashmir Trips": "/all-daywise-trips",
      },
    },
    Honeymoon: {
      data: honeymoonDropdown,
      routes: {
        "Romantic Tour": "/alltrips?category=romantic-tour",
        "Couple Special": "/alltrips?category=couple-special",
        "3 Days Honeymoon": "/all-daywise-trips?days=3&theme=honeymoon",
        "View All Honeymoon": "/alltrips?category=honeymoon-packages",
      },
    },
    Activities: {
      data: activitiesDropdown,
      routes: {
        "Shikara Ride": "/activities/shikara-ride",
        "Houseboat Stay": "/activities/houseboat-stay",
        "Gondola Ride": "/activities/gondola-ride",
        "River Rafting": "/activities/river-rafting",
        "Paragliding": "/activities/paragliding",
        "Skiing": "/activities/skiing",
      },
    },
    Services: {
      data: servicesDropdown,
      routes: {
        "Family Tour": "/services/family-tour",
        "Couple Tour": "/services/couple-tour",
        "Group Tour": "/services/group-tour",
        "Hotel Booking": "/services/hotel-booking",
        "Car Rentals": "/services/car-rentals",
      },
    },
    "Spiritual tour": {
      data: spiritualTourDropdown,
      routes: {
        "Vaishno Devi Temple": "/all-daywise-trips?category=spiritual&temple=vaish",
        "Mata Kheer Bhawani Temple": "/all-daywise-trips?category=spiritual&temple=kheer",
        "Shankaracharya Temple": "/all-daywise-trips?category=spiritual&temple=shankaracharya",
        "Amar Nath Cave": "/all-daywise-trips?category=spiritual&temple=amarnath",
        "View All Temples": "/all-daywise-trips?category=spiritual",
      },
    },
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownItemClick = (parent, item) => {
    const route = routesMap[parent].routes[item] || "/";
    
    navigate(route); // ✅ navigate first

    setActiveLink(parent);
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <TopHeader />

      <nav className="bg-slate-800 sticky top-0 z-50">
        <div className="sm:px-8 px-5">

          {/* Desktop */}
          <div className="hidden lg:flex">
            {navLinks.map((link) => (
              <div
                key={link}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button 
                  onClick={() => link === 'Blogs' ? navigate('/blogs') : null}
                  className="flex items-center gap-2 px-5 py-4 text-sm text-slate-300 hover:text-white"
                >
                  {link}
                  {link !== 'Blogs' && <ChevronDown size={12} />}
                </button>

                {openDropdown === link && routesMap[link] && (
                  <div className="absolute bg-slate-800 shadow-lg rounded-md min-w-62.5">
                    {routesMap[link].data.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleDropdownItemClick(link, item)}
                        className="block w-full text-left px-4 py-2 hover:bg-slate-600 text-slate-300 hover:text-white"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex justify-end py-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <div className={`fixed right-0 top-0 h-full w-80 bg-slate-800 z-50 transform transition ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white"
                aria-label="Close navigation menu"
              >
                <X />
              </button>
            </div>
            {navLinks.map((link) => (
              <div key={link}>
                <button
                  onClick={() => link === 'Blogs' ? navigate('/blogs') : setOpenDropdown(openDropdown === link ? null : link)}
                  className="w-full text-left py-3 text-white flex justify-between"
                >
                  {link}
                  {link !== 'Blogs' && <ChevronDown className={`${openDropdown === link ? "rotate-180" : ""}`} />}
                </button>

                {openDropdown === link && routesMap[link] && (
                  <div className="bg-slate-700 rounded">
                    {routesMap[link].data.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleDropdownItemClick(link, item)}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-600"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}