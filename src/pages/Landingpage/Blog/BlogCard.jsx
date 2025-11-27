import React from 'react'

const BlogCard = ({ title = 'Post Title', excerpt = 'Short excerpt...', author = 'Author', date = 'Date' }) => {
  return (
    <article className="blog-card">
      <h3>{title}</h3>
      <p className="excerpt">{excerpt}</p>
      <div className="meta">{author} • {date}</div>
    </article>
  )
}

export default BlogCard
