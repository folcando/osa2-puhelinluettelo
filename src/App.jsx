import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const FilterForm = ({nameFilter, onChange}) => {
  return (
    <div>
        filter shown with <input value={nameFilter} onChange={onChange} />
    </div>
  )
}

const NewPersonForm = ({addPerson, newName, setNewName, newNumber, setNewNumber}) => {
  return (
    <form onSubmit={(addPerson)}>
        <div>
          name: <input value={(newName)} onChange={(event) => setNewName(event.target.value)}/>
          number: <input value={(newNumber)} onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Numbers = ({persons, nameFilter}) => {

  const personsFiltered = persons.filter(
    p => p.name.toLowerCase().includes( nameFilter.toLowerCase() )
  )

  return (
    <div>
      <h2>Numbers</h2>
      <ul>
          {personsFiltered.map(p => <li key={(p.name)}>{p.name}: {p.number}</li>)}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(p => p.name.toLowerCase() === newName.toLowerCase()).length === 0) {
      const newPerson = {name: newName, number: newNumber, id: persons.length + 1}
      
     personService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })

    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <FilterForm nameFilter={nameFilter} onChange={(event) => setNameFilter(event.target.value)} />
      <NewPersonForm 
        addPerson={addPerson} 
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
      />

      <Numbers persons={persons} nameFilter={nameFilter}/>
    </div>
  )
}

export default App