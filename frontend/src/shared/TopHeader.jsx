import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const PhoneIcon = () => (
  <Phone width={18} height={18} className="text-emerald-500" strokeWidth={2} />
);

const WhatsAppIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="text-green-500">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488" />
  </svg>
);

export default function TopHeader() {
  return (
    <>
      {/* Beta Banner */}
      <div className="w-full bg-amber-400 text-gray-900 text-center py-2 px-4 text-sm font-medium tracking-wide">
        🚧 This website is currently in Beta version. Some features may still be under development.
      </div>

      <div className="flex items-center justify-between py-1.5 px-5 sm:px-8 border-b border-gray-200 bg-white w-full">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 md:gap-3 no-underline cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="Haba Khatoon Travels Logo"
            className="sm:h-22.5 h-17.5 lg:h-17.5 object-contain"
          />
          <span className="font-['Cinzel'] text-lg md:text-[28px] font-semibold text-slate-800 tracking-wide hidden lg:block">
            Haba Khatoon Travels
          </span>
        </Link>

        {/* Center Info - Hidden on mobile */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <PhoneIcon />
            <span>+91-9149680276</span>
          </div>
        </div>

        {/* Desktop CTA Button */}
        <a
          href="https://wa.me/919149680276?text=Hi!%20I%20would%20like%20to%20get%20a%20free%20quote%20for%20a%20trip."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded text-sm font-semibold cursor-pointer tracking-wide transition-colors duration-200 no-underline"
        >
          Get a Free Quote
        </a>

        {/* Mobile WhatsApp Icon */}
        <a
          href="https://wa.me/919149680276?text=Hi!%20I%20would%20like%20to%20get%20a%20free%20quote%20for%20a%20trip."
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          aria-label="Contact us on WhatsApp"
        >
          <WhatsAppIcon />
        </a>
      </div>
    </>
  );
}
