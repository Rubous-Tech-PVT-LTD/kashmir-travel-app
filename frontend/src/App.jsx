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

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
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
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
