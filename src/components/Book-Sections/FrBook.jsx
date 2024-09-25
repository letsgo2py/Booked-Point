import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { removeBook } from '../../services/removebtn.js';

function CBook({isbn, book_name, author}) {
  const navigate = useNavigate();

  const handleClick = async () => {
    const isStored = await axios.post('https://book-backend-odmd.onrender.com/check', {isbn})
    console.log(isStored.data)
    navigate('/mynote', { state: { isbn } });
  }

  const handleClick1 = async (e) => {
    const isbn = e.target.id;
    // change its section from 2 to 1 in database
    try {
      const response = await fetch(`https://book-backend-odmd.onrender.com/api/booksback/${isbn}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ section: 1 })
      });

      if (!response.ok) {
        throw new Error('Failed to update the book section');
      }

      const result = await response.json();
      window.location.reload();
      console.log('Update result:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleClick2 = async (e) => {
    const isbn = e.target.id;
    // change its section from 2 to 3 in database
    try {
      const response = await fetch(`http://localhost:3000/api/bookscmp/${isbn}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ section: 3 })
      });

      if (!response.ok) {
        throw new Error('Failed to update the book section');
      }

      const result = await response.json();
      window.location.reload();
      console.log('Update result:', result);
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
            <img className="book-img" src={"https://covers.openlibrary.org/b/isbn/" + isbn + "-M.jpg"}></img>
          </div>
          <div className='book-info'>
            <h3>{book_name}</h3>
            <p>{author}</p>
            <div className='btns'>
              <button className='notes-btn' onClick={handleClick}>My Notes</button>
              <div className="fr-three-btns">
                <div>
                    <button id={isbn} onClick={handleClick3} className='remove-btn'>Remove</button>
                </div>
                <div >
                    <button className="fr-two-btns" id={isbn} onClick={handleClick1}>Read later</button>
                    <button className="fr-two-btns" id={isbn} onClick={handleClick2}>Completed</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CBook
