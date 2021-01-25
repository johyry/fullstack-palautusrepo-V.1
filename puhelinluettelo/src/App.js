import React, { useState, useEffect } from 'react'
import personService from './services/personService'
import './App.css'


const ContactList = ({ persons, filter, handleDelete }) => {
  const newFilter = filter.toLowerCase()
  const newPersons = persons.filter((person) => person.name.toLowerCase().includes(newFilter) )
  return (
    <ul>
      {newPersons.map(person => <Person key={person.id} person={person} handleDelete={handleDelete} />)}
    </ul>
  )
}

const Filter = ({ filterByName, handleFilterByNameChange }) => {
  return (
    <form>
        <div>
          filter by name: 
          <input 
            value={filterByName}
            onChange={handleFilterByNameChange}
          />
          </div>
      </form>
  )
}

const PersonForm = ({ onSubmit, handleNameChange, handleNumberChange, newName, newNumber }) => {
  return (
    <form onSubmit={onSubmit}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
          <br></br>
          number:
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Person = ({ person, handleDelete }) => {
  return (
    <li>
      {person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button>
    </li>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.includes('succes')) {
    return (
      <div className="notification">
        {message}
      </div>
    ) 
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterByName, setFilterByName ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    const found = persons.find(element => element.name === newName)
    if (!found) {

      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNotificationMessage(`Person ${newName} succesfully added to server`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
    } else {
      if (window.confirm(`${newName} is already on list. Replace old number with a new one?`)) {
        updateNumber()
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const updateNumber = () => {
    const personObject = {
      id: persons.find(p => p.name.includes(newName)).id,
      name: newName,
      number: newNumber
    }

    personService
      .update(personObject.id, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
        setNotificationMessage(`Persons ${newName} number succesfully updated to server`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
      })
      .catch(() => {
        setErrorMessage(`Person ${newName} was already deleted from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterByNameChange = (event) => {
    setFilterByName(event.target.value)
  }

  const handleDelete =  person  => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setNotificationMessage(`Person ${person.name} succesfully deleted from server`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
        })
        
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filterByName={filterByName} 
        handleFilterByNameChange={handleFilterByNameChange}
      />
      <h2>Add a new</h2>
      <Notification message={errorMessage} />
      <Notification message={notificationMessage} />
      <PersonForm 
        onSubmit={addContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <ContactList persons={persons} filter={filterByName} handleDelete={handleDelete} />
      ...
    </div>
  )

}

export default App