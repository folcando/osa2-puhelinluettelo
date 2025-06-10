import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: '040-1231244'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.filter(p => p.name === newName).length === 0) {
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={(addPerson)}>

        <div>
          name: <input value={(newName)} onChange={(event) => setNewName(event.target.value)}/>
          number: <input value={(newNumber)} onChange={(event) => setNewNumber(event.target.value)} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>

      </form>

      <h2>Numbers</h2>
      
      <ul>
        {persons.map(p => <li key={(p.name)}>{p.name}: {p.number}</li>)}
      </ul>
      
    </div>
  )

}

export default App