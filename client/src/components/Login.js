import React, { useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'

export default function Login({ onSubmittedId }) {

  const idRef = useRef()

  function handleSubmit(event){
    event.preventDefault()
    onSubmittedId(idRef.current.value)
  }

  // generates new user ID if the user doesn't have any
  function createNewUserId(){
    onSubmittedId(uuidV4())
  }

  return (
    <Container className='align-items-center d-flex' style={{height: '100vh'}}>
      <Form onSubmit={handleSubmit} className='w-100'>
        <Form.Group>
          <Form.Label>Enter your user ID</Form.Label>
          <Form.Control type='text' ref={idRef} required></Form.Control>
        </Form.Group>
        <Button type='submit' className='mr-2'>Log In</Button>
        <Button onClick={createNewUserId} variant='secondary'>Sign Up</Button>
      </Form>
    </Container>
  )
}
