import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useThreads } from '../contexts/ThreadsProvider'

export default function OpenThread() {

  const [text, setText] = useState('')
  const { sendMessage, selectedThread } = useThreads()

  function handleSubmit(event){
    event.preventDefault()

    sendMessage(
      selectedThread.recipients.map(recipient => recipient.id),
      text
    )

    setText('')
  }

  return (
    <div className='d-flex flex-column flex-grow-1'>
      <div className='flex-grow-1 overflow-auto'>

      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className='m-2'>
          <InputGroup>
            <Form.Control
              as='textarea'
              required
              value={text}
              onChange={event => setText(event.target.value)}
              style={{height: '75px', resize: 'none'}}
            />
            <InputGroup.Append>
              <Button type='submit'><i className="fas fa-paper-plane"></i></Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}
