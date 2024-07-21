import React from 'react'
import Nav from './components/Nav'
import Books from './components/Books'
import CBook from './components/CBook'
import AddISBN from './components/AddISBN'

function Home() {
  return (
    <>
      <Nav/>
      <AddISBN />
      <div className='main'>
        <h1>Continue Reading</h1>
        <Books />
        <h1>Already Completed  [SORT]</h1>
        <CBook isbn={"9780385533225"}/>
      </div>
    </>
  )
}

export default Home