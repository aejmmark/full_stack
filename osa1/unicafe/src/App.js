import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({text, value}) => (
  <div>{text}{value}</div>
)

const Statistics = ({good, bad, neutral}) => {
  if (good + bad + neutral === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return(
    <div>
      <Display text="good " value={good} />
      <Display text="neutral " value={neutral} />
      <Display text="bad " value={bad} />
      <Display text="all " value={good + bad + neutral} />
      <Display text="average " value={(good - bad) / (good + bad + neutral)} />
      <Display text="positive " value={good / (good + bad + neutral)} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App