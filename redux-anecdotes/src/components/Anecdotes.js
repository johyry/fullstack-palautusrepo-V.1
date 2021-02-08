import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { newMessage } from '../reducers/messageReducer'


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

const Anecdotes = (props) => {
  const anecdotes = props.anecdotes
  
  const handleVote = (anecdote) => {
    console.log('vote', anecdote.id)
    props.voteAnecdote(anecdote)
    props.newMessage(`Voted '${anecdote.content}'`, 10)
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  const filter = props.filter
  const filteredAnecdotes = sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  return (
    filteredAnecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={handleVote} />)
    
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  newMessage
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
  )(Anecdotes)
export default ConnectedAnecdotes
