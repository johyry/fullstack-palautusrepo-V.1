const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INITIALIZE':
      return action.data.anecdotes
    case 'VOTE':
      const anecdoteToChange = state.find(n => n.id === action.data.id)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      return state.map(a => a.id !== changedAnecdote.id ? a : changedAnecdote)
    case 'CREATE':
      return [...state, action.data.anecdote]
    default:
      return state
  }

}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE',
    data: {
      anecdote
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  console.log(anecdotes)
  return {
    type: 'INITIALIZE',
    data: {
      anecdotes
    }
  }
}

export default anecdoteReducer