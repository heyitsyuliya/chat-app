import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import Login from "./Login";
import Dashboard from './Dashboard'

function App() {

  const [id, setId] = useLocalStorage('userId')

  return (
    id ? <Dashboard id={id} /> : <Login onSubmittedId={setId}/>
  );
}

export default App;
