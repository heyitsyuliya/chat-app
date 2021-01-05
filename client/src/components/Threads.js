import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useThreads } from '../contexts/ThreadsProvider'

export default function Threads() {

  const { threads, selectThreadIndex } = useThreads()
  // will be falsey if we don'ty have any contacts created
  const threadsCount = threads[1]
  const emptyState = (
    <p>Looks like you don't have any threads created 🤷🏻</p>
  )

  return (
    threadsCount ?
    <ListGroup variant='flush'>
      {threads.map((thread, index) => (
        <ListGroup.Item
        key={index}
        action
        onClick={() => selectThreadIndex(index)}
        active={thread.selected}
        >
          {thread.recipients.map(recipient => recipient.name).join(', ')}
        </ListGroup.Item>
      ))
      }
    </ListGroup>
    :
    emptyState
  )
}
