import Person from './Person'
import personService from './services/persons'

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      {personsToShow.map((person, i) =>
        <Person key={i} person={person} deletePerson={() => deletePerson(person.name, person.id)} />
      )}
    </div>
  )
}

export default Persons