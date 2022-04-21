import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './components/services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => setPersons(initialPerson))
    // axios
    //   .get("http://localhost:3001/persons")
    //   .then(response => {
    //     setPersons(response.data)
    //   })
  }, [])

  const handleName = (e) => setNewName(e.target.value)
  const handleNumber = (e) => setNewNumber(e.target.value)
  const handleFilter = (e) => setFilter(e.target.value)

  const addContact = (e) => {
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }
    const found = persons.find(person => person.name === newName)
    if (found) {
      // window.alert(`${newName} is already added to phonebook`)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(found.id, newPerson)
          .then(returnPerson => {
            setPersons(persons.map(person => person.id !== found.id ? person : returnPerson))
            setNewName('')
            setNewNumber('')
            setMessageType('success')
            setMessage(`Updated ${found.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessageType('error')
            setMessage(`Information of ${found.name} has already been removed from server.`)
            setPersons(persons.filter(person => person.id !== found.id))
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessageType('success')
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      // axios
      //   .post("http://localhost:3001/persons", newPerson)
      //   .then(response => {
      //     setPersons(persons.concat(response.data))
      //     setNewName('')
      //     setNewNumber('')
      //   })
      // setPersons(persons.concat({ name: newName, number: newNumber }))
    }

  }

  const deletePersonOf = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
    }
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm name={newName} handleName={handleName} number={newNumber} handleNumber={handleNumber} submit={addContact} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePersonOf} />
    </div>
  )
}

export default App