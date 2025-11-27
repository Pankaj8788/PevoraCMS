import React from 'react'
import AboutIntro from './AboutIntro'
import MissionSection from './MissionSection'
import VisionSection from './VisionSection'
import CoreValues from './CoreValues'
import LeadershipTeam from './LeadershipTeam'
import TimelineSection from './TimelineSection'
import AboutCTA from './AboutCTA'

const LandingAboutus = () => {
  return (
    <div className="landing-aboutus">
      <AboutIntro />
      <MissionSection />
      <VisionSection />
      <CoreValues />
      <LeadershipTeam />
      <TimelineSection />
      <AboutCTA />
    </div>
  )
}

export default LandingAboutus