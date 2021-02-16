import { useSelector } from 'react-redux'
import {
  Link
} from 'react-router-dom'
import React from 'react'

const BlogsList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
  return (
    <div>
      <h2>Blogs: </h2>
      {sortedBlogs.map((blog) => (
        <p key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </p>
      ))}
    </div>
  )
}




export default BlogsList