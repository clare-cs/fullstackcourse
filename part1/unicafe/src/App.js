import React, { useState } from 'react'

const Title = ({ title }) => <h1>{title}</h1>
const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>
    {name}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  if (good || neutral || bad)
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
          <StatisticLine text="positive" value={good / (good + neutral + bad) * 100 + "%"} />
        </tbody>
      </table>
    )
  return <p>No feedback given</p>

}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const counter = (name) => {
    switch (name) {
      case "good":
        setGood(good + 1)
        break
      case "neutral":
        setNeutral(neutral + 1)
        break
      case "bad":
        setBad(bad + 1)
        break
      default:
        console.log("error")
    }
  }

  return (
    <div>
      <Title title="give feedback" />
      <Button name="good" handleClick={() => counter("good")} />
      <Button name="neutral" handleClick={() => counter("neutral")} />
      <Button name="bad" handleClick={() => counter("bad")} />
      <Title title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
