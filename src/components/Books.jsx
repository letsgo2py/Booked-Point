import React from 'react'
import isbn_list from './isbn.js'
import Book from './Book.jsx'

function Books() {
  return (
    <div className='books-div'>
        {isbn_list.map((is, index) => (
          <Book key = {index} isbn = {is}/>
        ))}
    </div>
  )
}

export default Books