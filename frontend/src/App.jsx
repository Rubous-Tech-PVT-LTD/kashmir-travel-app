import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Alltrip from './components/AllPopularTrip'
import TripDetail from './pages/TripDetail'
import DaysWiseTripDetail from './pages/DaysWiseTripDetail'
import AllDaysWiseTrips from './pages/AllDaysWiseTrips'

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
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
