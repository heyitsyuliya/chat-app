import React from 'react'
import { useThreads } from '../contexts/ThreadsProvider'
import OpenThread from './OpenThread'
import Sidebar from './Sidebar'

export default function Dashboard({ id }) {

  // checking if we have a thread selected
  const { selectedThread } = useThreads()

  return (
    <div className='d-flex' style={{height: '100vh'}}>
      <Sidebar id={id}/>
      {selectedThread && <OpenThread />}
    </div>

  )
}
