import SEO from '../components/SEO'
import Navbar from '../shared/Navbar'
import HeroSection from '../components/HeroSection'
import ServiceSection from '../components/ServiceSection'
import PopularTrip from '../components/PopularTrip'
import DaysWiseTrips from '../components/DaysWiseTrips'
import WhyChooseUs from '../components/WhyChooseUs'
import Footer from '../shared/Footer'
import PopUp_Form from './PopUp_Form'

import { generateOrganizationSchema } from '../utils/schemaGenerator'

export default function Home() {
  const orgSchema = generateOrganizationSchema();

  return (
    <div style={{ width: '100%', margin: 0, padding: 0 }}>
      <SEO 
        title="Best Kashmir Travel Agent & Tour Packages"
        description="Explore with the best travel agency for your Kashmir tour. As a trusted Kashmir travel agent, we offer cheap travel agency rates for Kashmir packages and Kashmir tour and travels."
        url="https://habakhatoon.com/"
        schema={orgSchema}
      />
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
