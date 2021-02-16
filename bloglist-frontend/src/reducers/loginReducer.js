import loginService from '../services/login'
import blogService from '../services/blogs'
import { handleErrorMessages } from './notificationReducer'

const loginReducer = (state = '', action) => {

  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'SETUSER':
    return action.data
  case 'LOGOUT':
    return ''
  default:
    return state
  }
}

export const handleLogIn = (credentials) => {
  return async dispatch => {
    try {
      const loggedInUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)
      dispatch ({
        type: 'LOGIN',
        data: loggedInUser
      })
    } catch (exception) {
      handleErrorMessages('Login failed')
    }
  }
}

export const checkForAlreadyLoggedInUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
    const userLog = JSON.parse(loggedUserJSON)
    blogService.setToken(userLog.token)
    return {
      type: 'SETUSER',
      data: userLog
    }
  }
  return { type: 'DO_NOTHING' }
}

export const handleLogOut = () => {
  return {
    type: 'LOGOUT'
  }
}

export default loginReducer