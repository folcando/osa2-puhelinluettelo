import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {name: newName}
    setPersons(persons.concat(newPerson))
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={(addPerson)}>

        <div>
          name: <input value={(newName)} onChange={(event) => setNewName(event.target.value)}/>
        </div>

        <div>
          <button type="submit">add</button>
        </div>

      </form>

      <h2>Numbers</h2>
      ...
    </div>
  )

}

export default App