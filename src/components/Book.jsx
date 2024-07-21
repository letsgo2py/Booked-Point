import React from 'react'

function Book({isbn}) {
  return (
    <div>
        <div className='book-div'>
          <div className='cover-img'>
            <img className="book-img" src={"https://covers.openlibrary.org/b/isbn/" + isbn + "-M.jpg"}></img>
          </div>
          <div className='book-info'>
            <h3>Book Name</h3>
            <p>Author: Abhay</p>
          </div>
        </div>
    </div>
  )
}

export default Book