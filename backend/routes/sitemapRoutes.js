const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');
const Hotel = require('../models/Hotel');

router.get('/', async (req, res) => {
  try {
    const baseUrl = 'https://habakhatoon.com';

    // Static pages
    const staticPages = [
      '',
      '/alltrips',
      '/all-daywise-trips',
      '/services/family-tour',
      '/services/couple-tour',
      '/services/group-tour',
      '/services/hotel-booking',
      '/all-hotels',
      '/services/car-rentals',
      '/activities/shikara-ride',
      '/activities/houseboat-stay',
      '/activities/gondola-ride',
      '/activities/river-rafting',
      '/activities/paragliding',
      '/activities/skiing',
      '/operator-services-kashmir',
      '/privacy-policy',
      '/terms-of-service',
      '/founder-story',
      '/feedback'
    ];

    // Fetch dynamic content
    const itineraries = await Itinerary.find({}, '_id category').lean();
    const hotels = await Hotel.find({}, '_id').lean();

    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    // Add static pages
    staticPages.forEach(page => {
      xml += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    });

    // Add itineraries
    itineraries.forEach(item => {
      const path = item.category === 'popular' ? `/trips/${item._id}` : `/daywise-trip/${item._id}`;
      xml += `
  <url>
    <loc>${baseUrl}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Add hotels
    hotels.forEach(item => {
      xml += `
  <url>
    <loc>${baseUrl}/hotel/${item._id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    xml += '\n</urlset>';

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Sitemap error:', error);
    res.status(500).send('Error generating sitemap');
  }
});

module.exports = router;
