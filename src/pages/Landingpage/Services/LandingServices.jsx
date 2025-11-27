import React from 'react'
import ServicesIntro from './ServicesIntro'
import ServiceCards from './ServiceCards'
import GatewayPromo from './GatewayPromo'
import FAQSection from './FAQSection'

const LandingServices = () => {
  return (
    <div className="landing-services">
      <ServicesIntro />
      <ServiceCards />
      <GatewayPromo />
      <FAQSection />
    </div>
  )
}

export default LandingServices