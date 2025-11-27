import React from 'react'
import HeroBanner from './HeroBanner'
import AboutPreview from './AboutPreview'
import ProductHighlight from './ProductHighlight'
import CoreServices from './CoreServices'
import WhyChooseUs from './WhyChooseUs'
import Testimonials from './Testimonials'
import PartnerLogos from './PartnerLogos'
import FinalCTA from './FinalCTA'


const LandingHome = () => {
  return (
    <div className="landing-home">
       
      <HeroBanner />
      <AboutPreview />
      <ProductHighlight />
      <CoreServices />
      <WhyChooseUs />
      <Testimonials />
      <PartnerLogos />
      <FinalCTA />
    </div>
  )
}

export default LandingHome