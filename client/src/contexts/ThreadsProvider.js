import React, { useContext, useState, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from '../contexts/ContactsProvider'

const ThreadsContext = React.createContext()

export function useThreads(){
  return useContext(ThreadsContext)
}

export function ThreadsProvider({ id, children }) {
  // setting state
  const [threads, setThreads] = useLocalStorage('threads', [])
  // selecting first conversatuion in the list by default
  const [selectedThreadIndex, setSelectedThreadIndex] = useState(0)
  const { contacts } = useContacts()

  // this function adds a new contact to the list of existing Threads
  function createThread(recipients){
    setThreads(existingThreads => {
      return [...existingThreads, { recipients, messages: [] }]
    })
  }

  // this function adds new message to the existing thread
  const addMessageToThread = useCallback(({ recipients, text, sender }) => {

    setThreads(existingThreads => {

      let madeChange = false
      const newMessage = { sender, text }

      const newThreads = existingThreads.map(thread => {
        // checking if recipients for existing threads are equal to recipients
        if(checkIfArraysEqual(thread.recipients, recipients)){
          madeChange = true
          return {
            ...thread,
            messages: [...thread.messages, newMessage]
          }
        }
        return thread
      })

      // checking whether thread was created or not
      if (madeChange){
        return newThreads
      }

      else {
        // adding new message to the thread
        return [...existingThreads, { recipients, messages: [newMessage]}]
      }
    })
  }, [setThreads])

  function sendMessage(recipients, text){
    addMessageToThread({ recipients, text, sender: id })
  }

  // this function formats the threads to display the names of the people in the thread
  const formattedThreads = threads.map((thread, index) => {

    const recipients = thread.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })

      // get the name of the contact, or id
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })

    // formatting messages to display sender's name
    const messages = thread.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender
      })

      const name = (contact && contact.name) || message.sender

      // messages sent from me
      const fromMe = id === message.sender
      return { ...message, senderName: name, fromMe }
    })

    // checking if the thread was selected
    const selected = index === selectedThreadIndex

    return { ...thread, messages, recipients, selected }
  })

  // what will be returned as formatted thread
  const value = {
    threads: formattedThreads,
    selectedThread: formattedThreads[selectedThreadIndex],
    selectThreadIndex: setSelectedThreadIndex,
    sendMessage,
    createThread
  }

  return (
    <ThreadsContext.Provider value={value}>
      {children}
    </ThreadsContext.Provider>
  )
}

function checkIfArraysEqual(arr1, arr2){
  if (arr1.length !== arr2.length){
    return false
  }

  arr1.sort()
  arr2.sort()

  return arr1.every((element, index) => {
    return element === arr2[index]
  })
}
