import React from 'react';


const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old. </p>
    </div>
  )
}

const App = () => {
  // const now = new Date()
  const a = 10
  const b = 20
  const name = "Nils"
  const age = "23"

  return (
  <>
    <p>
      {a} plus {b} = {a + b}
    </p>
    <p>This is pretty cool. See the following worldly greeeting!</p>
    <Hello name ={name} age={age}/>
    <Hello name="Nils"/>
    <Hello />
  </>
  )
}

export default App;
