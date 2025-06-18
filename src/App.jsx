import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

import Message from './components/Message'

const NumbersEntry = ({name, number, id, persons, setPersons, setMessage}) => {
  const deleteEntry = () => {
    if (window.confirm('remove person?')) {
      personService.remove(id)
        .then(response => {
          setPersons(persons.filter( p => p.id !== id ))
          setMessage({text:`deleted ${name}`, success:true })
          setTimeout(() => {
            setMessage({text: '', success: undefined})
          }, 5000)
        } )
    }
  }

  return (
    <li>
      {name}: {number} <button onClick={deleteEntry}>delete</button>
    </li>
  )
}

const Numbers = ({persons, nameFilter, setPersons, setMessage}) => {
  const personsFiltered = persons.filter(
    p => p.name.toLowerCase().includes( nameFilter.toLowerCase() )
  )

  return (
    <div>
      <h2>Numbers</h2>
      <ul>
          {personsFiltered.map(p => 
            <NumbersEntry 
              key={p.name} 
              name={p.name} number={p.number} id={p.id} 
              persons={persons}
              setPersons={setPersons} 
              setMessage={setMessage} />
          )}
      </ul>
    </div>
  )
}

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

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  
  const [message, setMessage] = useState({text:'', success: undefined})

  useEffect(() => {
    personService.getAll()
      .then((response) => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const foundPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if (foundPerson === undefined) {
      const newPerson = {name: newName, number: newNumber, id: (persons.length + 1).toString()}
      personService.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })

        setMessage({text: `Added ${newName} (${newNumber})`, success: true})
        setTimeout(() => {
          setMessage({text: '', success: undefined})
        }, 5000)

      return
    } 

    if (window.confirm(`${newName} is already added to phonebook, replace their number?`)) {
      const newPerson = {...foundPerson, number: newNumber}

     personService.update(foundPerson.id, newPerson)
     .then(returnedPerson => {
      setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))

      setMessage({text: 'replaced old number', success: true})
      setTimeout(() => {
        setMessage({text: '', success: undefined})
      }, 5000)
     })
     .catch(error => {
      setMessage({text: `Information of ${newName} has already been removed from server`, success: false})
      setPersons(persons.filter(p => p.id !== foundPerson.id))
     })

      const updatedPersons = persons.map(p => {
        if (p.id !== foundPerson.id) {
            return p
          } else {
            return newPerson
          }
      })
      setPersons(persons.filter(p => p.id != foundPerson.id)) 
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Message message={message.text} success={message.success} />

      <FilterForm nameFilter={nameFilter} onChange={(event) => setNameFilter(event.target.value)} />
      <NewPersonForm 
        addPerson={addPerson} 
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
      />

      <Numbers persons={persons} nameFilter={nameFilter} setPersons={setPersons} setMessage={setMessage}/>
    </div>
  )
}

export default App