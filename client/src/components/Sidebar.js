import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Contacts from './Contacts'
import CreateNewContactModal from './CreateNewContactModal'
import CreateNewThreadModal from './CreateNewThreadModal'
import Threads from './Threads'

const THREADS_KEY = 'threads'
const CONTACTS_KEY = 'contacts'

export default function Sidebar({ id }) {

  // setting threads tab to be selected by default
  const [activeKey, setActiveKey] = useState(THREADS_KEY)
  // checking whether we have Threads tab open or not
  const threadsOpen = activeKey === THREADS_KEY
  // modal controls, closed by default
  const [modalOpen, setModalOpen] = useState(false)

  function closeModal(){
    setModalOpen(false)
  }

  return (

    <div style={{ width: '250px'}} className='d-flex flex-column'>

      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>

        <Nav variant='tabs' className='justify-content-center'>
          <Nav.Item>
            <Nav.Link eventKey={THREADS_KEY}>My Threads</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className='border-right overflow-auto flex-grow-1'>
          <Tab.Pane eventKey={THREADS_KEY}>
            <Threads />
          </Tab.Pane>

          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>

        {/* Section on the bottom of the nav that displays user ID and Create new ...  button */}
        <div className='p-2 border-top border-right small'>
          Your user ID is: <span className='text-muted'>{id}</span>
        </div>

        {/* clicking Create new ... button will open respective modal */}
        <Button className='rounded-0' onClick={() => {setModalOpen(true)}}>
          Create new {threadsOpen ? 'thread' : 'contact'}
        </Button>

      </Tab.Container>

      {/* Create new ... modal that will allow the user to create either a new contact or thread */}
      <Modal show={modalOpen} onHide={closeModal}>
        {threadsOpen ?
          <CreateNewThreadModal closeModal={closeModal} />
          :
          <CreateNewContactModal closeModal={closeModal} />
        }
      </Modal>
    </div>
  )
}
