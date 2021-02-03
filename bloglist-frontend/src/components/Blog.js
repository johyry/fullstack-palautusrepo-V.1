import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)

  const VisibilityButton = (text) => <button onClick={() => setVisible(!visible)}>{text}</button>

  const LikeButton = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    return (
      <button onClick={() => handleLike(newBlog)}>like</button>
    )
  }

  const confirmDelete = () => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      handleDelete(blog)
    }
  }

  const deleteButton = () => {

    if (user.username === blog.user.username) {
      return <button onClick={() => confirmDelete()}>delete</button>
    }
    return <></>
  }

  if (visible) {
    return (
      <div>
        <p>
          {blog.title}{VisibilityButton('hide')}
          <br></br>
          {blog.author}
          <br></br>
          {blog.url}
          <br></br>
          {blog.likes}{LikeButton()}
          <br></br>
          {deleteButton()}
        </p>
      </div>
    )
  }

  return (
    <div>
      {blog.title}{VisibilityButton('show')}
    </div>
  )
}

export default Blog
