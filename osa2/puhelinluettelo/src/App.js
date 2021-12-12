import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({name, number}) => {
  return (
    <>
    <li>{name} {number}</li>
    </>
  )
}

const Persons = ({persons, search, deletePerson}) => {
  return (
    <>
      {persons.filter(item => item.name
      .toLowerCase().includes(search)).map(
        person =>
        <ul key={person.id}>
          <Person key={person.name}
          name={person.name}
          number={person.number}
          />
          <button 
          onClick={() => deletePerson(person)}>
            delete
          </button>
        </ul>
      )}
    </>
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
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (!invalidName) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
      setNewName('')
      setNewNumber('')
    } else {
      if (window.confirm(
        `${newName} is already added to phonebook, 
        replace the old number with a new one?`
        )) {
          let id = 0
          persons.forEach(person => {
            if (person.name === newName) {
              id = person.id
            }
          })
          personService
            .update(id, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(
                person => person.id !== id
                ? person : returnedPerson
                ))
            })
          setNewName('')
          setNewNumber('')
      }
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deleteWithId(person.id)
        .then(response => {
          console.log(response)
        })
      setPersons(persons.filter(item => item.name !== person.name))
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
      <Persons persons={persons} search={search} deletePerson={deletePerson}/>
    </div>
  )

}

export default App