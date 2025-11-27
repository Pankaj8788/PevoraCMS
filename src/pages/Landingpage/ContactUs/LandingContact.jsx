import React from 'react'
import Contact from './Contact'
import ContactIntro from './ContactIntro'
import ContactForm from './ContactForm'
import OfficeInfo from './OfficeInfo'
import MapSection from './MapSection'
import SupportInfo from './SupportInfo'
import SocialLinks from './SocialLinks'

const LandingContact = () => {
  return (
    <div className="landing-contact">
      <Contact />
      <ContactIntro />
      <ContactForm />
      <OfficeInfo />
      <MapSection />
      <SupportInfo />
      <SocialLinks />
    </div>
  )
}

export default LandingContact