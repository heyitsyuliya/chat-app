import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from '../contexts/ContactsProvider'

const ThreadsContext = React.createContext()

export function useThreads(){
  return useContext(ThreadsContext)
}

export function ThreadsProvider({ children }) {
  // setting state
  const [threads, setThreads] = useLocalStorage('threads', [])
  const { contacts } = useContacts()
  // selecting first conversatuion in the list by default
  const [selectedThreadIndex, setSelectedThreadIndex] = useState(0)

  // this function adds a new contact to the list of existing Threads
  function createThread(recipients){
    setThreads(existingThreads => {
      return [...existingThreads, { recipients, messages: [] }]
    })
  }

  const formattedThreads = threads.map((thread, index) => {
    const recipients = thread.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })

      // get the name of the contact, or id
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })

    // checking if the thread was selected
    const selected = index === selectedThreadIndex

    return { ...thread, recipients, selected }
  })

  // what will be returned as formatted thread
  const value = {
    threads: formattedThreads,
    selectedThread: formattedThreads[selectedThreadIndex],
    selectThreadIndex: setSelectedThreadIndex,
    createThread
  }

  return (
    <ThreadsContext.Provider value={value}>
      {children}
    </ThreadsContext.Provider>
  )
}
