import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useThreads } from '../contexts/ThreadsProvider'

export default function Threads() {

  const { threads, selectThreadIndex, deleteThread } = useThreads()
  // will be falsey if we don'ty have any contacts created
  const threadsCount = threads[0]
  const emptyState = (
    <div className='empty-state'>Create a thread below to start chatting! <i className="fas fa-comments"></i></div>
  )

  // this function calls provider function that is responsible for delition
  function handleDeletion(thread){
    const threadId = thread.id
    deleteThread(threadId)
  }

  return (
    threadsCount ?
    <ListGroup variant='flush'>
      {threads.map((thread, index) => (
        <ListGroup.Item
        key={index}
        action
        onClick={() => selectThreadIndex(index)}
        active={thread.selected}
        className="border-bottom"
        >
          <i className="fas fa-comments"></i>
          {thread.recipients.map(recipient => recipient.name).join(', ')}
          <i className="far fa-trash-alt" onClick={() => handleDeletion(thread)}></i>
        </ListGroup.Item>
      ))
      }
    </ListGroup>
    :
    emptyState
  )
}
