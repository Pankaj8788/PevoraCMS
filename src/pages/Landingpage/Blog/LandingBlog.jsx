import React from 'react'
import BlogList from './BlogList'
import BlogFilters from './BlogFilters'
import BlogDetails from './BlogDetails'
import RelatedPosts from './RelatedPosts'
import NewsletterSignup from './NewsletterSignup'

const LandingBlog = () => {
  return (
    <>
      <BlogList />
      <NewsletterSignup />
      {/* <BlogDetails />
      <BlogFilters />
      <RelatedPosts />
       */}
    </>
  )
}

export default LandingBlog