import Navbar from '../shared/Navbar'
import HeroSection from '../components/HeroSection'
import ServiceSection from '../components/ServiceSection'
import PopularTrip from '../components/PopularTrip'
import DaysWiseTrips from '../components/DaysWiseTrips'
import WhyChooseUs from '../components/WhyChooseUs'
import Footer from '../shared/Footer'

export default function Home() {
  return (
    <div style={{ width: '100%', margin: 0, padding: 0 }}>
      <HeroSection />
      <ServiceSection />
      <PopularTrip />
      <DaysWiseTrips />
      <WhyChooseUs />
      <Footer />
    </div>
  )
}
