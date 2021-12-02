import React, { useState } from 'react'

const Person = ({name, number}) => {
  return (
    <>
    <li>{name} {number}</li>
    </>
  )
}

const Persons = ({persons, search}) => {
  return (
    <ul>
      {persons.filter(item => item.name
      .toLowerCase().includes(search)).map(
        person =>
        <Person key={person.name}
        name={person.name}
        number={person.number}
        />
      )}
    </ul>
  )
}

const Filter = ({search, handleSearch}) => {
  return (
    <div>
      name: <input
      value={search}
      onChange={handleSearch}
      />
    </div>
  )
}

const PersonForm = ({
  addPerson, newName, handleNameChange, newNumber, handleNumberChange
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: &nbsp; &nbsp; <input
        value={newName}
        onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input
        value={newNumber}
        onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">
          add
        </button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '123456789'
   }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  const addPerson = (event) => {
    event.preventDefault()
    let invalidName = false
    persons.forEach(
      (item) => {
        invalidName = invalidName ? invalidName : item.name === newName
    })
    if (!invalidName) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>Add new</h2>
      <PersonForm
      addPerson={addPerson}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search}/>
    </div>
  )

}

export default App