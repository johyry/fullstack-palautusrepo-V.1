import React, { useEffect } from 'react'
import {
  Switch, Route, Link
} from 'react-router-dom'
import Notification from './components/Notification'
import LoginPanel, { UserLoggedInAndLogOut, UserPage, UsersAndBlogs } from './components/UserComponents'
import BlogForm from './components/BlogForm'
import BlogsList from './components/BlogsList'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { checkForAlreadyLoggedInUser } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(checkForAlreadyLoggedInUser())
  }, [])

  const user = useSelector(state => state.login)

  const padding = { padding: 5 }

  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user === '' ?
          <LoginPanel /> : (
            <UserLoggedInAndLogOut user={user} />
          )}
      </div>

      <Notification />

      <Switch>
        <Route path="/blogs/:id">
          <Blog user={user} />
        </Route>
        <Route path="/blogs">
          <BlogForm />
          <BlogsList user={user} />
        </Route>
        <Route path="/users/:id" >
          <UserPage />
        </Route>
        <Route path="/users" >
          <UsersAndBlogs />
        </Route>
        <Route path="/">
          <BlogForm />
          <BlogsList user={user} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
