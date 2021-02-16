const notificationReducer = (state = '', action) => {

  switch(action.type) {
  case 'DISPLAYNOTIFICATION':
    return action.data
  case 'REMOVENOTIFICATION':
    return action.data
  default:
    return state
  }
}

export const displayNotification = (message, type) => {
  return {
    type: 'DISPLAYNOTIFICATION',
    data: { message, type },
  }
}

export const removeNotification = (type) => {
  return {
    type: 'REMOVENOTIFICATION',
    data: { message: '', type }
  }
}

export const handleErrorMessages = (message) => {
  displayNotification(message, 'error')
  setTimeout(() => {
    removeNotification('error')
  }, 5000)
}

export default notificationReducer