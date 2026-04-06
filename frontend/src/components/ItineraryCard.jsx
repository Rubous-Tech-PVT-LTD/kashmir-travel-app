import React from 'react';

const ItineraryCard = ({ title, price, image, isComingSoon }) => {
    const phoneNumber = "919149680276";
    const baseMessage = isComingSoon 
        ? `Hello, I'm interested in the upcoming trip: ${title}. Please let me know when it's available!` 
        : `Hello, I want to know more about ${title}`;
    const encodedMessage = encodeURIComponent(baseMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return (
        <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group relative">
            {/* Coming Soon Badge */}
            {isComingSoon && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-amber-500 text-slate-900 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg animate-pulse border border-amber-400">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900"></span>
                    </span>
                    Coming Soon
                </div>
            )}

            {/* Image Container */}
            <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                    src={image || 'https://picsum.photos/id/10/1200/800'}
                    alt={title}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isComingSoon ? 'brightness-75 grayscale-[20%]' : ''}`}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content Container */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Title & Price */}
                <div className="flex-grow">
                    <h3 className="text-xl font-bold text-slate-100 mb-2 line-clamp-2">{title}</h3>
                    <p className={`text-2xl font-semibold mb-4 ${isComingSoon ? 'text-slate-400' : 'text-sky-400'}`}>
                        {isComingSoon ? 'Launching Soon' : `₹${price?.toLocaleString('en-IN') || 'Price on request'}`}
                    </p>
                </div>

                {/* WhatsApp Button */}
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-4 flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-white font-medium shadow-md hover:shadow-lg active:scale-95 transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 ${isComingSoon ? 'bg-slate-600 hover:bg-slate-500 focus:ring-slate-400' : 'bg-[#25D366] hover:brightness-110 focus:ring-[#25D366]'}`}
                    aria-label={isComingSoon ? `Enquire about upcoming ${title}` : `Book ${title} via WhatsApp`}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-5 h-5"
                    >
                        <path d="M11.99 0C5.366 0 0 5.366 0 11.99c0 2.126.554 4.134 1.542 5.885l-1.638 5.986 6.124-1.606A11.942 11.942 0 0011.99 24c6.624 0 11.99-5.366 11.99-11.99S18.614 0 11.99 0zm.01 22.008c-1.801 0-3.51-.46-5.068-1.334l-.364-.206-3.763.987 1.004-3.668-.225-.378A9.957 9.957 0 011.99 11.99c0-5.514 4.486-10 10-10 5.514 0 10 4.486 10 10 0 5.514-4.486 10-10 10z"/>
                        <path d="M17.487 14.28c-.275-.137-1.62-.801-1.872-.892-.25-.091-.433-.137-.615.137-.184.274-.707.892-.867 1.074-.16.183-.321.206-.596.069-.275-.137-1.157-.426-2.204-1.358-.813-.726-1.36-1.623-1.52-1.9-.16-.275-.017-.424.12-.562.124-.124.275-.321.413-.48.137-.16.183-.275.275-.458.092-.183.046-.344-.023-.48-.069-.138-.615-1.483-.843-2.03-.222-.533-.448-.46-.615-.469-.16-.007-.344-.007-.527-.007-.183.001-.482.07-.733.344-.251.275-.963.94-.963 2.292s.986 2.659 1.124 2.842c.137.183 1.938 2.956 4.694 4.148.656.284 1.166.452 1.564.58.658.209 1.257.179 1.733.108.532-.078 1.62-.662 1.848-1.303.228-.642.228-1.192.16-1.304-.068-.112-.251-.181-.526-.318z"/>
                    </svg>
                    {isComingSoon ? 'Enquire Now' : 'Book via WhatsApp'}
                </a>
            </div>
        </div>
    );
};

export default ItineraryCard;
