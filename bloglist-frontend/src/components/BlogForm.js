import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogName, setNewBlogName] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogName,
      author: newBlogAuthor,
      url: newBlogUrl,
    })

    setNewBlogName('')
    setNewBlogAuthor('')
    setNewBlogUrl('')

  }

  return (
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
  )
}

export default BlogForm