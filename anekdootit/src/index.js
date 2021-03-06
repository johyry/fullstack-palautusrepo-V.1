import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Title = ({ text }) => <h3>{text}</h3>

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

let mostVotes = 0

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))


  const selectRandom = () => {
    let number = Math.floor(Math.random() * anecdotes.length)
    setSelected(number)
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    debugger
    if (copy[selected] > copy[mostVotes]) {
      mostVotes = selected
    }
    setPoints(copy)
  }

  return (
    <div>
      <Title text={'Anecdote of the day'} />
      <Anecdote text={anecdotes[selected]} votes={points[selected]} />
      <Button onClick={selectRandom} text={'select random'} />
      <Button onClick={voteAnecdote} text={'vote'} />

      <Title text={'Anecdote with most votes'} />
      <Anecdote text={anecdotes[mostVotes]} votes={points[mostVotes]} />

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// const points = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0);

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)