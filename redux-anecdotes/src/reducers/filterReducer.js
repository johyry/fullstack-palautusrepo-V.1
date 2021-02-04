const filterReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'NEWFILTER':
      return action.data
    default:
      return state
  }
}

export const newFilter = ( filter ) => {
  console.log(filter)
  return {
    type: 'NEWFILTER',
    data: filter
  }
}

export default filterReducer