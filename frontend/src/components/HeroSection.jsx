import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { settingsAPI } from "../utils/api";

const defaultHeroImage =
  "https://camo.githubusercontent.com/1b18608c396cc46626637014a8bf370ee07b60dd7602cd58f55bf1a64c6aa23d/68747470733a2f2f696d616765732e756e73706c6173682e636f6d2f70686f746f2d313539353831353737313631342d6164653964363532613635643f69786c69623d72622d342e302e33266175746f3d666f726d6174266669743d63726f7026773d3132303026713d3830";

export default function HeroSection() {
  const [heroImages, setHeroImages] = useState([defaultHeroImage]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsAPI.getSettings();
        if (data.success && data.data.heroImages && data.data.heroImages.length > 0) {
          setHeroImages(data.data.heroImages);
        }
      } catch (err) {
        // Silent fail for hero banner
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
    <div className="m-0 w-full p-0 font-sans">
      {/* Navbar with TopHeader */}
      <Navbar />
      {/* Hero Section */}
      <div className="relative m-0 h-105 w-full overflow-hidden bg-[#1a2b4a] p-0">
        {/* Transparent Images Wrapper for Transitions */}
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            style={{
              backgroundImage: `url(${img})`,
              opacity: idx === currentIndex ? 1 : 0,
              zIndex: idx === currentIndex ? 1 : 0,
            }}
            className="absolute inset-0 bg-cover bg-position-[center_40%] transition-opacity duration-1500 ease-in-out"
          />
        ))}
        {/* Dark overlay on left - Softened for 'Modern & Open' feel */}
        <div className="absolute inset-0 z-2 bg-[linear-gradient(to_right,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.15)_45%,transparent_100%)]" />

        {/* Hero Content */}
        <div className="relative z-3 max-w-125 px-10 py-15">
          <p className="mb-2.5 text-xs font-bold uppercase tracking-[2px] text-[#3dba8f] [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]">
            Your Trusted Kashmir Travel Agent
          </p>
          <h1 className="mb-6 text-[42px] font-normal leading-[1.1] text-white [text-shadow:0_4px_10px_rgba(0,0,0,0.5)]">
            Book the Best <strong className="font-extrabold text-[#3dba8f]">Kashmir Packages</strong>
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/919149680276?text=Hi!%20I%20would%20like%20to%20get%20in%20touch%20regarding%20a%20Kashmir%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-sm border-2 border-white bg-transparent px-7 py-3 text-sm font-medium tracking-[0.5px] text-white transition-all duration-200 hover:bg-white hover:text-[#1a2b4a] no-underline"
            >
              Get in touch
            </a>

            <Link
              to="/founder-story"
              className="inline-block rounded-sm border-2 border-[#3dba8f] bg-[#3dba8f] px-7 py-3 text-sm font-medium tracking-[0.5px] text-white transition-all duration-200 hover:bg-[#2ea27a] hover:border-[#2ea27a] no-underline"
            >
              Founder Story
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
