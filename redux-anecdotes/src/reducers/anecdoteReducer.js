import anecdoteService from '../services/Anecdote'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INITIALIZE':
      return action.data.anecdotes
    case 'VOTE':
      const anecdote = action.data.anecdoteToSave
      return state.map(a => a.id !== anecdote.id ? a : anecdote)
    case 'CREATE':
      return [...state, action.data.anecdote]
    default:
      return state
  }

}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const anecdoteToSave = await anecdoteService.vote(changedAnecdote)
    dispatch ({
      type: 'VOTE',
      data: {
        anecdoteToSave
      }
    })
  }
}

export const createAnecdote = (content) => {
    return async dispatch => {
      const anecdoteObject = asObject(content)
      console.log(anecdoteObject)
      const anecdote = await anecdoteService.create(anecdoteObject)
      console.log(anecdote)
      dispatch({
        type: 'CREATE',
        data: {
          anecdote
        }
      })
    }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: {
      anecdotes
      }
    })
  }
}

export default anecdoteReducer