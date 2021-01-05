import React from 'react'
import { useThreads } from '../contexts/ThreadsProvider'
import OpenThread from './OpenThread'
import Sidebar from './Sidebar'

export default function Dashboard({ id }) {

  // checking if we have a thread selected
  const { selectedThread } = useThreads()
  // display empty state message if no threads are selected
  // this is somewhat an edge case-y scenario, but just in case
  const emptyState = (<p>Select a thread to start a chat 💬</p>)

  return (
    <div className='d-flex' style={{height: '100vh'}}>
      <Sidebar id={id}/>
      {selectedThread ? <OpenThread /> : emptyState}
    </div>

  )
}
