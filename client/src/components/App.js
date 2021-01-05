import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import Login from "./Login";
import Dashboard from './Dashboard'
import { ContactsProvider } from '../contexts/ContactsProvider'
import { ThreadsProvider } from '../contexts/ThreadsProvider';

function App() {

  const [id, setId] = useLocalStorage('userId')

  const dashboard = (
    <ContactsProvider>
      <ThreadsProvider>
        <Dashboard id={id} />
      </ThreadsProvider>
    </ContactsProvider>
  )

  return (
    id ? dashboard : <Login onSubmittedId={setId}/>
  );
}

export default App;
