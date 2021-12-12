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
          onClick={() => deletePerson(person.name, person.id)}>
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

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (message.includes('already')) {
    return (
      <div style={error}>
        {message}
      </div>
    )
  } else {
    return (
      <div style={success}>
        {message}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

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
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
            .catch(error => {
              setMessage(`${newName} was already deleted`)
              setPersons(persons.filter(item => item.id !== id))
            })
          setNewName('')
          setNewNumber('')
          setMessage(`${newName}'s number changed to ${newNumber}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      }
    }
  }

  const deletePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deleteWithId(id)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          setMessage(`${newName} was already deleted`)
        })
      setPersons(persons.filter(item => item.id !== id))
      setMessage(`Deleted ${name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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