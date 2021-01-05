import React, { useState, useCallback } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useThreads } from '../contexts/ThreadsProvider'

export default function OpenThread() {

  const [text, setText] = useState('')
  const { sendMessage, selectedThread } = useThreads()
  // this is needed to prevent the page from scrolling every time the user types in a character
  const setRef = useCallback(node => {

    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  function handleSubmit(event){
    event.preventDefault()

    sendMessage(
      selectedThread.recipients.map(recipient => recipient.id),
      text
    )

    // setting the text in the text field to an empty string after submission
    setText('')
  }

  return (
    <div className='d-flex flex-column flex-grow-1'>
      {/* displaying the message thread */}
      <div className='flex-grow-1 overflow-auto'>
        <div className='d-flex flex-column align-items-start justify-content-end px-3'>

          {selectedThread.messages.map((message, index) => {

            const lastMessage = selectedThread.messages.length - 1 === index

            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
              >

                <div className={`text-muted small ${message.fromMe ? 'text-left' : ''}`}>
                  {message.fromMe ? null : message.senderName}
                </div>

                <div className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                  {message.text}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* this form allows users to send messages */}
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
