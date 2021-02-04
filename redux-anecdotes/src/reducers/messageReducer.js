const messageReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'NEWMESSAGE':
      return action.data
    case 'REMOVEMESSAGE':
      return ''
    default:
      return state
  }
}

export const newMessage = ( message ) => {
  console.log(message)
  return {
    type: 'NEWMESSAGE',
    data: message
  }
}

export const removeMessage = () => {
  return {
    type: 'REMOVEMESSAGE',
  }
}

export default messageReducer