import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'

const Blog = ({ user }) => {
  const dispatch = useDispatch()

  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(a => a.id === id)

  if (!blog) return null

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = () => {
    dispatch(deleteBlog(blog))
  }

  const LikeButton = () => {
    return (
      <button onClick={() => handleLike()}>like</button>
    )
  }

  const confirmDelete = () => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      handleDelete()
    }
  }

  const deleteButton = () => {
    if (user.username === blog.user.username) {
      return <button onClick={() => confirmDelete()}>delete</button>
    }
    return <></>
  }

  return (
    <div>
      <br></br>
      {blog.title}
      <br></br>
      {blog.author}
      <br></br>
      {blog.url}
      <br></br>
      {blog.likes}{LikeButton()}
      <br></br>
      <h4>Comments: </h4>
      <NewComment blog={blog} />
      <Comments comments={blog.comments} />
      {deleteButton()}
    </div>
  )

}

const NewComment = ({ blog }) => {
  const dispatch = useDispatch()
  const [newComment, setNewComment] = useState('')

  const addNewComment = (e) => {
    e.preventDefault()
    dispatch(addComment(blog, newComment))
    setNewComment('')
  }

  return (
    <form onSubmit={addNewComment}>
      <div>
        Name:
        <input
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

const Comments = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <>
        No comments yet
        <br></br>
        <br></br>
      </>
    )
  }
  let id = 0
  return (
    <div>
      <ul>
        {comments.map(comment => <li key={id++}>{comment}</li>)}
      </ul>
      <br></br>
    </div>
  )
}

export default Blog
