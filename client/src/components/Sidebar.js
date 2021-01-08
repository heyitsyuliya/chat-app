import React, { useState } from 'react'
import { Tab, Nav, Button, Modal, Card } from 'react-bootstrap'
import Contacts from './Contacts'
import CreateNewContactModal from './CreateNewContactModal'
import CreateNewThreadModal from './CreateNewThreadModal'
import Threads from './Threads'

const THREADS_KEY = 'threads'
const CONTACTS_KEY = 'contacts'
const SETTINGS_KEY = 'settings'

export default function Sidebar({ id }) {

  // setting threads tab to be selected by default
  const [activeKey, setActiveKey] = useState(THREADS_KEY)
  // checking whether we have Threads tab open or not
  const threadsOpen = activeKey === THREADS_KEY
  // modal controls, closed by default
  const [modalOpen, setModalOpen] = useState(false)

  const createNewBtn = (
    <Button className='rounded-0' onClick={() => {setModalOpen(true)}}>
      Create new {threadsOpen ? 'thread' : 'contact'}
    </Button>
  )

  function closeModal(){
    setModalOpen(false)
  }

  return (

    <div style={{ width: '250px', fontSize: '12px'}} className='d-flex flex-column'>

      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>

        <Nav variant='tabs' className='justify-content-center'>
          <Nav.Item>
            <Nav.Link eventKey={THREADS_KEY}>My Threads</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey={SETTINGS_KEY}><i className="fas fa-cog"></i></Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className='border-right overflow-auto flex-grow-1'>
          <Tab.Pane eventKey={THREADS_KEY}>
            <Threads />
          </Tab.Pane>

          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>

          <Tab.Pane eventKey={SETTINGS_KEY} className='d-flex flex-column align-items-center'>
            {/* Section on the bottom of the nav that displays user ID and Create new ...  button */}
            <Card className='p-2 mt-3 small'>
              My user ID: <span className='text-muted'>{id}</span>
            </Card>

            <Card className='p-3 m-3 text-muted'>
              Clicking the button below will erase all data associated with Chat App, including all threads, contacts and user IDs.
            </Card>
            <Button className='rounded btn-warning' onClick={() => {

              try {
                localStorage.clear()
                // I had to... :/
                window.location.reload(true);
              }

              catch (error) {
                console.error(error)
              }
            }}>
              Clear local storage
            </Button>
          </Tab.Pane>
        </Tab.Content>

        {/* clicking Create new ... button will open respective modal, and it will only show up on threads and contacts menu */}
        <>
        {activeKey !== SETTINGS_KEY ? createNewBtn : <></>}
        </>

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
