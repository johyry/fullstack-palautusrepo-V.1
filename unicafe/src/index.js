import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Title = ({ title }) => <h3>{title}</h3>

const StatisticsLine = ({ text, value }) => {
    return (
      <tr>
        <th>{text}</th>
        <th>{value}</th>
      </tr>
    )
  }
const Statistics = ({ good, bad, neutral }) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  const total = good + bad + neutral
  const average = total/3
  const positive = good/total*100

  return (
    <table>
      <tbody>
        <StatisticsLine text={'good'} value={good} />
        <StatisticsLine text={'neutral'} value={neutral} />
        <StatisticsLine text={'bad'} value={bad} />
        <StatisticsLine text={'all'} value={total} />
        <StatisticsLine text={'average'} value={average} />
        <StatisticsLine text={'positive'} value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good+1)
  }

  const addNeutral = () => {
    setNeutral(neutral+1)
  }

  const addBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <Title title={'give feedback'} />
      <Button onClick={addGood} text="good" />
      <Button onClick={addNeutral} text="neutral" />
      <Button onClick={addBad} text="bad" />
      <Title title={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)