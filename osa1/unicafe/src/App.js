import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return (
      <tr>
      <td>{text}</td>
      <td>{value}</td>
      </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  if (good + bad + neutral === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return(
    <div>
      <table>
        <tbody>
          <StatisticLine text="good " value={good} />
          <StatisticLine text="neutral " value={neutral} />
          <StatisticLine text="bad " value={bad} />
          <StatisticLine text="all " value={good + bad + neutral} />
          <StatisticLine text="average " value={(good - bad) / (good + bad + neutral)} />
          <StatisticLine text="positive " value={good / (good + bad + neutral)} />
          </tbody>
      </table>
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