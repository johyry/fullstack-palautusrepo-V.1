
const messageReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'DISPLAYMESSAGE':
      return action.data
    case 'REMOVEMESSAGE':
      return ''
    default:
      return state
  }
}

let nextNotificationId = 0

export const newMessage = ( message, displayTime ) => {
  console.log(message, displayTime)
  const time = displayTime * 1000
  console.log(time)
  const id = nextNotificationId++

  return dispatch => {
    dispatch(displayMessage(message, id))
    setTimeout(() => dispatch(removeMessage(id)), time)
  }
}

export const displayMessage = (message, id) => {
  return {
    type: 'DISPLAYMESSAGE',
    data: message,
    id
  }
}

export const removeMessage = (id) => {
  return {
    type: 'REMOVEMESSAGE',
    id
  }
}

export default messageReducer