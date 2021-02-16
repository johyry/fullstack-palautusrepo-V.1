import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const [newBlogName, setNewBlogName] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  const addBlog = (event) => {
    event.preventDefault()

    dispatch(createBlog({
      title: newBlogName,
      author: newBlogAuthor,
      url: newBlogUrl
    }))
    setNewBlogName('')
    setNewBlogAuthor('')
    setNewBlogUrl('')

  }

  return (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <div>
        <h3>New blog</h3>
        <form onSubmit={addBlog}>
          <div>
          Name:
            <input
              value={newBlogName}
              onChange={({ target }) => setNewBlogName(target.value)}
            />
          </div>
          <div>
          Author:
            <input
              value={newBlogAuthor}
              onChange={({ target }) => setNewBlogAuthor(target.value)}
            />
          </div>
          <div>
          Url:
            <input
              value={newBlogUrl}
              onChange={({ target }) => setNewBlogUrl(target.value)}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </Togglable>
  )
}

export default BlogForm