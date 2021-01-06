import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useThreads } from '../contexts/ThreadsProvider'

export default function Threads() {

  const { threads, selectThreadIndex } = useThreads()
  // will be falsey if we don'ty have any contacts created
  const threadsCount = threads[0]
  const emptyState = (
    <div className='empty-state'>Create a thread below to start chatting! <i className="fas fa-comments"></i></div>
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
          <i className="fas fa-comments"></i> {thread.recipients.map(recipient => recipient.name).join(', ')}
        </ListGroup.Item>
      ))
      }
    </ListGroup>
    :
    emptyState
  )
}
