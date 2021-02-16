import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { handleLogIn, handleLogOut } from '../reducers/loginReducer'
import Togglable from './Togglable'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(handleLogIn({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        salasana
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  )
}

const LoginPanel = () => {
  return (
    <div>
      <h2>Log In</h2>
      <Togglable buttonLabel='Log in'>
        <LoginForm />
      </Togglable>
    </div>
  )
}

export const UserLoggedInAndLogOut = ({ user }) => {
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(handleLogOut())
  }

  return (
    <>
      <>
        {user.username}
        {' '}
        logged in
      </>
      <button type="button" onClick={logOut}>
        log out
      </button>
    </>
  )
}

export const UsersAndBlogs = () => {
  const usersAndTheirBlogs = useSelector(state => state.users)
  return (
    <div>
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
          {usersAndTheirBlogs.map(user => {
            return (
              <tr key={user.username}>
                <th>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </th>
                <th>{user.blogs.length}</th>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
    </div>
  )
}

export const UserPage = () => {
  const id = useParams().id
  const usersAndTheirBlogs = useSelector(state => state.users)
  const userPage = usersAndTheirBlogs.find(a => a.id === id)

  if (!userPage) return null

  return (
    <div>
      <h3>{userPage.username}</h3>
      <h4>Added blogs:</h4>
      <ul>
        {userPage.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default LoginPanel