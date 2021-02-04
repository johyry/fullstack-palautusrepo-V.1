import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { newMessage, removeMessage } from '../reducers/messageReducer'


const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
    </div>
  )
}

const Anecdotes = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(voteAnecdote(anecdote.id))
    dispatch(newMessage(`Voted '${anecdote.content}'`))
    setTimeout(() => dispatch(removeMessage()), 5000)
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    filteredAnecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={handleVote} />)
    
  )
}

export default Anecdotes
