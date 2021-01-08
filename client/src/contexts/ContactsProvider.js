import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function useContacts(){
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  // setting state
  const [contacts, setContacts] = useLocalStorage('contacts', [])

  // this function adds a new contact to the list of existing contacts
  function createContact(id, name){
    setContacts(existingContacts => {
      return [...existingContacts, { id, name }]
    })
  }

  function deleteContact(contactId){
    const updatedContacts = JSON.parse(localStorage.getItem('chat-app-contacts')).filter(contact => contact.id !== contactId)

    setContacts(existingContacts => {
      return [...updatedContacts]
    })
  }

  const value = {
    contacts,
    createContact,
    deleteContact
  }

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  )
}
