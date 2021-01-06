import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'

export default function Contacts() {

  const { contacts } = useContacts()
  // will be falsey if we don'ty have any contacts created
  const contactsCount = contacts[0];
  const emptyState = (
    <p>Looks like you don't have any contacts created 🤷🏻</p>
  )

  return (
    contactsCount ?
    <ListGroup variant='flush'>
      {contacts.map(contact => (
        <ListGroup.Item key={contact.id}><i className="far fa-user-circle"></i> {contact.name}</ListGroup.Item>
      ))
      }
    </ListGroup>
    :
    emptyState
  )
}
