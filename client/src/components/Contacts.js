import React from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'

export default function Contacts() {

  const { contacts, deleteContact } = useContacts()
  // will be falsey if we don'ty have any contacts created
  const contactsCount = contacts[0]
  const emptyState = (
    <Card className='p-3 m-3'>Looks like you don't have any contacts created 🤷🏻 Add your first contact to start chatting!</Card>
  )

  // the actual deletion is handled in provider
  function handleDeletion(contact){
    const contactId = contact.id;
    deleteContact(contactId);
  }

  return (
    contactsCount ?
    <ListGroup variant='flush'>
      {contacts.map(contact => (
        <ListGroup.Item
          key={contact.id}
          className="border-bottom d-flex justify-content-between"
        >
          <div>
          <i className="far fa-user-circle pr-2"></i>
          {contact.name}
          </div>

          <i className="far fa-trash-alt" onClick={() => handleDeletion(contact)}></i>
        </ListGroup.Item>
      ))
      }
    </ListGroup>
    :
    emptyState
  )
}
