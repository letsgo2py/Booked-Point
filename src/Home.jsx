import React from 'react'
import Nav from './components/Nav'
import Books from './components/Books'
import AddISBN from './components/AddISBN'

function Home() {
  return (
    <>
      <Nav/>
      <AddISBN />
      <div className='main'>
        <Books />
      </div>
    </>
  )
}

export default Home