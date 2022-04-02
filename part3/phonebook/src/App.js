import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleName = (e) => setNewName(e.target.value)
  const handleNumber = (e) => setNewNumber(e.target.value)
  const addContact = (e) => {
    e.preventDefault()
    const found = persons.find(person => person.name === newName)
    if (found) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}


    </div>
  )
}

export default App