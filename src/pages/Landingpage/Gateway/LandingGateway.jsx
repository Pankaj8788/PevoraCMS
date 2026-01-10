import React from 'react'
import Gateway from './Gateway'
import GatewayHero from './GatewayHero'
import GatewayOverview from './GatewayOverview'
import GatewayFeatures from './GatewayFeatures'
import ComplianceSection from './ComplianceSection'
import OnboardingFlow from './OnboardingFlow'
import IndustryTabs from './IndustryTabs'
import DeveloperDocsCTA from './DeveloperDocsCTA'
import GatewayTestimonials from './GatewayTestimonials'
import GatewayContactCTA from './GatewayContactCTA'

const LandingGateway = () => {
  return (
    <div className="landing-gateway">
      <Gateway />
      {/* <GatewayHero />
      <GatewayOverview />
      <GatewayFeatures />
      <ComplianceSection />
      <OnboardingFlow />
      <IndustryTabs />
      <DeveloperDocsCTA />
      <GatewayTestimonials />
      <GatewayContactCTA /> */}
    </div>
  )
}

export default LandingGateway