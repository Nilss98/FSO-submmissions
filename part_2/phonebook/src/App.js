import React, { useEffect, useState } from 'react'
import entryService from './services/entries'
import './index.css'


const Notification = ({ errorMessage, successMessage }) => {
  if (errorMessage === null && successMessage === null) {
    return null
  }
  if (errorMessage !== null) {
    return (
      <div className='error'> {errorMessage} </div>
    )
  }
  if (successMessage !== null) {
    return (
      <div className='success'> {successMessage} </div>
    )
  }

}


const Filter = ({ filtering }) => {
  return (
    <input onChange={filtering}/>

  )
}


const PersonForm = ({ addPerson, newName, newNumber, nameHandler, numberHandler }) => {
  return (
    <form onSubmit={addPerson}>
    <div>
      Name: <input value={newName} onChange={nameHandler} />
    </div>
    <div>
      Number: <input value={newNumber} onChange={numberHandler} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}


const AllPeople = ({ persons, filtered, delPerson }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filtered.toLowerCase()))

  const showPersons = filtered.length === 0 ? persons : filteredPersons

  return (
    <ul>
    {showPersons.map(person => 
    <Person 
      key={person.name} 
      person={person} 
      delThisPerson={() => delPerson(person.id)}
    /> )}
    </ul>
  )
}


const Person = ({ person, delThisPerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={delThisPerson}>delete</button>
    </li>
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filtered, setFiltered] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // in package.json the server port is set to 3003
  useEffect(() => {
    entryService
      .getAll()
      .then(initialEntries => setPersons(initialEntries))
    }, [])

 const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already in the phonebook, 
      replace the old number with a new one?`)) {
      const updateThisPerson = persons.find(person => person.name === newName)
      const updatedPerson = {...updateThisPerson, number: newNumber}
      entryService
        .update(updateThisPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(pers => pers.id !== updateThisPerson.id ? pers : returnedPerson))
          setSuccessMessage(`Changed the number for ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Information of '${updatedPerson.name}' was already deleted from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(pers => pers.id !== updatedPerson.id))
        })
      }
    } else {
      entryService
        .create(newPerson)
        .then(returnedPerson => { 
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFiltered(event.target.value)
  }

  const delPerson = (id) => {
    const maybeDelPerson = persons.find(person => person.id === id)
    if (window.confirm(`do you want to delete ${maybeDelPerson.name}?`)) {
      entryService
        .delEntry(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== id))
          setSuccessMessage(`Successfully deleted ${maybeDelPerson.name} from server`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Information of '${maybeDelPerson.name}' was already deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(pers => pers.id !== maybeDelPerson.id))
      })
    }
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      <h2>Phonebook</h2>
      <Filter filtering={handleFilter}/>
      <h2> Add New</h2>
      <PersonForm addPerson={addPerson} 
      newName={newName} nameHandler={handleNewName}
      newNumber={newNumber} numberHandler={handleNewNumber} />
      <h2>Numbers</h2>
      <AllPeople 
        persons={persons}
        filtered={filtered}
        delPerson={delPerson} 
        />
    </div>
  )
}

export default App;
