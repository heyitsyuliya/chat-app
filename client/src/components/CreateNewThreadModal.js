import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useThreads } from '../contexts/ThreadsProvider'

export default function CreateNewThreadModal({ closeModal }) {

  // some state for our contacts
  const [selectedContactIds, setSelectedContactIds] = useState([])
  const { contacts } = useContacts()
  const { createThread } = useThreads()

  function handleSubmit(event){
    event.preventDefault()

    createThread(selectedContactIds)
    closeModal()
  }

  function handleCheckboxChange(contactId){
    setSelectedContactIds(existingSelectedContactIds => {
      if (existingSelectedContactIds.includes(contactId)){
        return existingSelectedContactIds.filter(existingId => {
          return contactId !== existingId
        })
      }

      else {
        return [...existingSelectedContactIds, contactId]
      }
    })
  }

  return (
    <>
      <Modal.Header closeButton>Create new thread</Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          {contacts.map(contact => (
            <Form.Group contactId={contact.id} key={contact.id}>
              <Form.Check
                type='checkbox'
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}

          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}
