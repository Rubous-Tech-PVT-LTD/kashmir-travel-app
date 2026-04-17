import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Alltrip from './components/AllPopularTrip'
import TripDetail from './pages/TripDetail'
import DaysWiseTripDetail from './pages/DaysWiseTripDetail'
import AllDaysWiseTrips from './pages/AllDaysWiseTrips'
import FamilyTour from './pages/FamilyTour'
import CoupleTour from './pages/CoupleTour'
import GroupTour from './pages/GroupTour'
import HotelBooking from './pages/HotelBooking'
import AllHotels from './pages/AllHotels'
import HotelDetail from './pages/HotelDetail'
import CarRentals from './pages/CarRentals'
import ShikaraRide from './pages/ShikaraRide'
import HouseboatStay from './pages/HouseboatStay'
import GondolaRide from './pages/GondolaRide'
import RiverRafting from './pages/RiverRafting'
import ParaGliding from './pages/ParaGliding'
import Skiing from './pages/Skiing'
import AdminLogin from './admin/components/AdminLogin'
import AdminPanel from './admin/components/AdminPanel'
import AdminRoute from './admin/components/AdminRoute'
import OperatorServicesKashmir from './pages/OperatorServicesKashmir'
import PrivacyPolicy from './shared/PrivacyPolicy'
import TermsOfService from './shared/TermsOfService'
import Sitemap from './shared/Sitemap'
import Feedback from './pages/Feedback'
import FounderStory from './pages/FounderStory'

const routeMetadata = {
  '/': {
    title: 'Haba Khatoon Travels | Kashmir Tour Packages',
    description: 'Haba Khatoon Travels offers curated Kashmir tour packages, honeymoon trips, day-wise itineraries, hotels, and local activities with trusted support.'
  },
  '/alltrips': {
    title: 'All Kashmir Trips | Haba Khatoon Travels',
    description: 'Explore all our popular Kashmir tour packages. From budget-friendly trips to luxury experiences across the valley.'
  },
  '/all-daywise-trips': {
    title: 'All Day-wise Trips | Haba Khatoon Travels',
    description: 'Browse our day-wise Kashmir itineraries. Choose from 2 to 7 days plans designed for families, couples, and adventurers.'
  },
  '/services/family-tour': {
    title: 'Family Tour Package | Haba Khatoon Travels',
    description: 'Planned family tours in Kashmir with child-friendly hotels, safe transport, and relaxed pacing for a perfect family holiday.'
  },
  '/services/couple-tour': {
    title: 'Couple Tour Package | Haba Khatoon Travels',
    description: 'Romantic couple tours in Kashmir. Private stays, scenic shikara rides, and intimate experiences in the valley of love.'
  },
  '/services/group-tour': {
    title: 'Group Tour Package | Haba Khatoon Travels',
    description: 'Fun and affordable group tours to Kashmir. Perfect for friends and social groups wanting to explore together.'
  },
  '/services/hotel-booking': {
    title: 'Hotel Booking in Kashmir | Haba Khatoon Travels',
    description: 'Book the best hotels and houseboats in Kashmir. Trusted stays in Srinagar, Gulmarg, Pahalgam, and Sonamarg.'
  },
  '/services/car-rentals': {
    title: 'Car Rentals in Kashmir | Haba Khatoon Travels',
    description: 'Rent reliable cars with professional drivers in Kashmir. SUV, Tempo Travellers, and luxury cars available for local sightseeing.'
  },
  '/operator-services-kashmir': {
    title: 'Operator Services | Haba Khatoon Travels',
    description: 'Professional B2B and B2C operator services in Kashmir. Local logistics, ground handling, and destination management.'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Haba Khatoon Travels',
    description: 'Read our privacy policy to understand how we handle your data and protect your personal information.'
  },
  '/terms-of-service': {
    title: 'Terms of Service | Haba Khatoon Travels',
    description: 'Terms and conditions for booking Kashmir tour services with Haba Khatoon Travels.'
  },
  '/sitemap': {
    title: 'Sitemap | Haba Khatoon Travels',
    description: 'Explore all the pages and services offered by Haba Khatoon Travels in one place.'
  },
  '/founder-story': {
    title: 'Founder Story | Haba Khatoon Travels',
    description: 'Read the journey of the founder of Haba Khatoon Travels and the vision behind authentic Kashmir travel experiences.'
  },
  '/admin/login': {
    title: 'Admin Login | Haba Khatoon Travels',
    description: 'Secure admin portal login for Haba Khatoon Travels management.'
  },
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  useEffect(() => {
    const meta = routeMetadata[pathname] || routeMetadata['/']
    document.title = meta.title

    // Update Meta Description
    const descriptionTag = document.querySelector('meta[name="description"]')
    if (descriptionTag) {
      descriptionTag.setAttribute('content', meta.description)
    }

    // Google Analytics and DataLayer handling
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title,
      })
    }

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: pathname,
        page_title: document.title,
      })
    }
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ margin: 0, padding: 0, width: '100%', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alltrips" element={<Alltrip />} />
          <Route path="/trips/:tripId" element={<TripDetail />} />
          <Route path="/daywise-trip/:tripId" element={<DaysWiseTripDetail />} />
          <Route path="/all-daywise-trips" element={<AllDaysWiseTrips />} />
          <Route path="/services/family-tour" element={<FamilyTour />} />
          <Route path="/services/couple-tour" element={<CoupleTour />} />
          <Route path="/services/group-tour" element={<GroupTour />} />
          <Route path="/services/hotel-booking" element={<HotelBooking />} />
          <Route path="/all-hotels" element={<AllHotels />} />
          <Route path="/hotel/:hotelId" element={<HotelDetail />} />
          <Route path="/services/car-rentals" element={<CarRentals />} />
          <Route path="/activities/shikara-ride" element={<ShikaraRide />} />
          <Route path="/activities/houseboat-stay" element={<HouseboatStay />} />
          <Route path="/activities/gondola-ride" element={<GondolaRide />} />
          <Route path="/activities/river-rafting" element={<RiverRafting />} />
          <Route path="/activities/paragliding" element={<ParaGliding />} />
          <Route path="/activities/skiing" element={<Skiing />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={(
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            )}
          />
          <Route path="/operator-services-kashmir" element={<OperatorServicesKashmir />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/founder-story" element={<FounderStory />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
