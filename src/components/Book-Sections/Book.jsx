import React from 'react';
import { removeBook } from '../../services/removebtn.js';

function Book({ isbn, book_name, author}) {

  const handleClick = async (e) => {
    const isbn = e.target.id;
    // change its section from 1 to 2 in database
    try {
      const response = await fetch(`http://localhost:3000/api/books/${isbn}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ section: 2 })
      });

      if (!response.ok) {
        throw new Error('Failed to update the book section');
      }

      const result = await response.json();
      console.log('Update result:', result);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleClick3 = async (e) => {
    const isbn = e.target.id;
    try {
      const result = await removeBook(isbn);
      window.location.reload();
      console.log('Book removed:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
        <div className='book-div'>
          <div className='cover-img'>
            <img className="book-img" src={"https://covers.openlibrary.org/b/isbn/" + isbn + "-M.jpg"} alt={book_name}></img>
          </div>
          <div className='book-info'>
            <h3>{book_name}</h3>
            <p>{author}</p>
            <button className="start-reading-btn" id = {isbn} onClick={handleClick}>Start Reading</button>
            <button id={isbn} onClick={handleClick3} className='remove-btn'>Remove</button>
          </div>
        </div>
    </div>
  )
}

export default Book