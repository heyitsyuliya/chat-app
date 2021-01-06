import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import Login from "./Login"
import Dashboard from './Dashboard'
import { ContactsProvider } from '../contexts/ContactsProvider'
import { ThreadsProvider } from '../contexts/ThreadsProvider'
import { SocketProvider } from '../contexts/SocketProvider'

function App() {

  const [id, setId] = useLocalStorage('userId')

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ThreadsProvider id={id}>
          <Dashboard id={id} />
        </ThreadsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    id ? dashboard : <Login onSubmittedId={setId}/>
  )
}

export default App;
