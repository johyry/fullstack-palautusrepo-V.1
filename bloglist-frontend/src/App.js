import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then((blogsList) => setBlogs(blogsList))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const userLog = JSON.parse(loggedUserJSON)
      setUser(userLog)
      blogService.setToken(userLog.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLog = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userLog))
      blogService.setToken(userLog.token)
      setUser(userLog)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blogObject) => {
    try {
      await blogService.like(blogObject)
      const blogsCopy = blogs.map(blog => blog.id === blogObject.id ? blogObject : blog)
      setBlogs(blogsCopy)
    } catch (exception) {
      setErrorMessage('adding like unsuccessful')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (blogObject) => {
    try {
      await blogService.remove(blogObject)
      const blogsCopy = blogs.filter(blog => blog.id !== blogObject.id)
      setBlogs(blogsCopy)
    } catch (exception) {
      setErrorMessage('deleting blog unsuccessful')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create(blogObject)
      setBlogs(blogs.concat(blogObject))
    } catch (exception) {
      setErrorMessage('adding blog unsuccessful')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const listBlogs = () => {
    const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
    return (
      sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user} />
      ))
    )
  }

  const loginForm = () => (
    <Togglable buttonLabel='Log in'>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        password={password}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </Togglable>
  )


  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser('')
  }

  return (
    <div>
      <Notification message={errorMessage} />

      <h2>Log In</h2>

      {user === '' ?
        loginForm() : (
          <div>
            <p>
              {user.username}
              {' '}
            logged in
            </p>
            <button type="button" onClick={logOut}>
            log out
            </button>
            {blogForm()}
            <h2>blogs</h2>
            {listBlogs()}
          </div>

        )}


    </div>
  )
}

export default App
