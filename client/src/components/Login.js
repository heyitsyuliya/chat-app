import React, { useRef } from 'react'
import { Button, Container, Form, InputGroup, Popover, OverlayTrigger } from 'react-bootstrap'
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

  const popover = (
    <Popover>
      <Popover.Title as='h3'>Whoa, that's a title!</Popover.Title>

      <Popover.Content>
        Click this button, <strong>quick</strong>!
      </Popover.Content>
    </Popover>
  )

  return (
    <Container className='align-items-center d-flex' style={{height: '100vh'}}>

      <Form onSubmit={handleSubmit} className='w-100'>

        <Form.Group>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>👾</InputGroup.Text>
            </InputGroup.Prepend>

            <Form.Control
              type='text'
              placeholder="Enter your user ID"
              ref={idRef}
              required
              >
            </Form.Control>

          </InputGroup>
        </Form.Group>

        <Button type='submit' className='mr-2'>Log In</Button>

        <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
          <Button onClick={createNewUserId} variant='success'>Sign Up</Button>
        </OverlayTrigger>
      </Form>
    </Container>
  )
}
