import React, { useState } from 'react'

const Button = ({ handleClick, name }) => {
  return (
  <button onClick={handleClick}>{name}</button>
  )
}

const Statistics = ({ sGood, sNeutral, sBad }) => {
  const average = ((sGood*1 + sBad*-1)/(sGood + sNeutral + sBad)).toFixed(1)
  const positive = ((sGood / (sGood + sNeutral + sBad))*100).toFixed(1) + "%"

  if ((sGood + sNeutral + sBad) === 0) {
    return (
    <p>No feedback given.</p>
    )
  }
  return (
    <>
    <table>
      <Statistic name='good' value={sGood} />
      <Statistic name='neutral' value={sNeutral} />
      <Statistic name='bad' value={sBad} />
      <Statistic name='average' value={average} />
      <Statistic name='positive' value={positive} />
    </table>
    </>
  )
}

const Statistic = ({ value, name }) => {
  return (
    <tbody>
      <tr>
        <td>{name}:</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral +1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <div>
        <Button handleClick={handleGoodClick} name='good' />
        <Button handleClick={handleNeutralClick} name='neutral' />
        <Button handleClick={handleBadClick} name='bad' />
      </div>
      <div>
        <Statistics sGood={good} sNeutral={neutral} sBad={bad} />
      </div>
    </div>
  )
}

export default App;
