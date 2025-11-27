import React from 'react'
import CareersHero from './CareersHero'
import CultureSection from './CultureSection'
import GallerySection from './GallerySection'
import JobOpenings from './JobOpenings'
import JobApplyForm from './JobApplyForm'
import CareersCTA from './CareersCTA'

const LandingCareer = () => {
  return (
    <div className="landing-careers">
      <CareersHero />
      <CultureSection />
      <GallerySection />
      <JobOpenings />
      <JobApplyForm />
      <CareersCTA />
    </div>
  )
}

export default LandingCareer