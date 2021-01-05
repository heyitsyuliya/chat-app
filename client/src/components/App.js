import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import Login from "./Login";

function App() {

  const [id, setId] = useLocalStorage('userId')

  return (
    <>
    {id}
    <Login onSubmittedId={setId}/>
    </>
  );
}

export default App;
