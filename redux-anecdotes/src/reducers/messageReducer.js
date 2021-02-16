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

export const newMessage = ( message, displayTime ) => {
  console.log(message, displayTime)
  const time = displayTime * 1000
  console.log(time)

  return dispatch => {
    dispatch(displayMessage(message))
    setTimeout(() => dispatch(removeMessage()), time)
  }
}

export const displayMessage = (message) => {
  return {
    type: 'DISPLAYMESSAGE',
    data: message
  }
}

export const removeMessage = () => {
  return {
    type: 'REMOVEMESSAGE',
  }
}

export default messageReducer