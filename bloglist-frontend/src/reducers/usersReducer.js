import userService from '../services/users'
import { handleErrorMessages } from '../reducers/notificationReducer'

const userReducer = (state = [], action) => {

  switch(action.type) {
  case 'INITIALIZE_USERS':
    return action.data.users
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    try {
      const users = await userService.getAll()
      dispatch ({
        type: 'INITIALIZE_USERS',
        data: {
          users
        }
      })
    } catch (exception) {
      handleErrorMessages('Fetching all users failed')
    }
  }
}

export default userReducer