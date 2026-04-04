import Navbar from '../shared/Navbar'
import HeroSection from '../components/HeroSection'
import ServiceSection from '../components/ServiceSection'
import PopularTrip from '../components/PopularTrip'
import DaysWiseTrips from '../components/DaysWiseTrips'
import WhyChooseUs from '../components/WhyChooseUs'
import Footer from '../shared/Footer'
import PopUp_Form from './PopUp_Form'

export default function Home() {
  return (
    <div style={{ width: '100%', margin: 0, padding: 0 }}>
      <HeroSection />
      <PopUp_Form />
      <ServiceSection />
      <PopularTrip />
      <DaysWiseTrips />
      <WhyChooseUs />
      <Footer />
    </div>
  )
}
