import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleName = (e) => setNewName(e.target.value)
  const handleNumber = (e) => setNewNumber(e.target.value)
  const handleFilter = (e) => setFilter(e.target.value)

  const addContact = (e) => {
    e.preventDefault()
    const found = persons.find(person => person.name === newName)
    if (found) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }

  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm name={newName} handleName={handleName} number={newNumber} handleNumber={handleNumber} submit={addContact} />
      <h2>Numbers</h2>
      <Person personsToShow={personsToShow} />
    </div>
  )
}

export default App