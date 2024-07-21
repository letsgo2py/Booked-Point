import React from 'react'
import ISBN from './ISBN.jsx'
import Nav from './Nav'

function AddISBNPage() {
    const data = [
        {
            book_name: "Rich Dad Poor Dad",
            isbn: "9780446677455",
        },
        {
            book_name: "Rich Dad Poor Dad",
            isbn: "9780446677451",
        }, 
        {
            book_name: "Rich Dad Poor Dad",
            isbn: "9780446677452",
        },
    ]

  return (
    <div>
        <Nav />
        <div className='isbn-page'>
            {data.map(book => (
                <ISBN key={book.isbn} bName = {book.book_name} B_isbn = {book.isbn}/>
            ))}
        </div>
    </div>
  )
}

export default AddISBNPage