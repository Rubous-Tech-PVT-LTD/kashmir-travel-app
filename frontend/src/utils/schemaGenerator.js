export const generateTripSchema = (trip) => {
  if (!trip) return null;

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": trip.title,
    "image": [trip.coverImage, ...(trip.gallery || [])],
    "description": trip.description || `Explore our ${trip.duration} Kashmir tour package.`,
    "brand": {
      "@type": "Brand",
      "name": "Haba Khatoon Travels"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": trip.price || 0,
      "availability": "https://schema.org/InStock",
      "url": `https://habakhatoon.com/trips/${trip._id}`
    }
  };
};

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Haba Khatoon Travels",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Srinagar",
      "addressRegion": "Kashmir",
      "addressCountry": "IN"
    },
    "url": "https://habakhatoon.com",
    "telephone": "+91-9149680276",
    "priceRange": "$$",
    "image": "https://habakhatoon.com/logo.png"
  };
};
