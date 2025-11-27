import React from 'react'
import BlogList from './BlogList'
import BlogFilters from './BlogFilters'
import BlogDetails from './BlogDetails'
import RelatedPosts from './RelatedPosts'
import NewsletterSignup from './NewsletterSignup'

const LandingBlog = () => {
  return (
    <div className="landing-blog">
      <BlogFilters />
      <BlogList />
      <BlogDetails />
      <RelatedPosts />
      <NewsletterSignup />
    </div>
  )
}

export default LandingBlog