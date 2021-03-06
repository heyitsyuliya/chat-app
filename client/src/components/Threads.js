import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { useThreads } from '../contexts/ThreadsProvider'

export default function Threads() {

  const { threads, selectThreadIndex, deleteThread } = useThreads()
  // will be falsey if we don'ty have any contacts created
  const threadsCount = threads[0]
  const emptyState = (
    <Card className='empty-state p-3 m-3'>Create a thread below to start chatting! 💬</Card>
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
        className="border-bottom d-flex justify-content-between"
        >
          <div>
            <i className="fas fa-comments pr-2"></i>
            {thread.recipients.map(recipient => recipient.name).join(', ')}
          </div>

          <i className="far fa-trash-alt" onClick={() => handleDeletion(thread)}></i>
        </ListGroup.Item>
      ))
      }
    </ListGroup>
    :
    emptyState
  )
}
