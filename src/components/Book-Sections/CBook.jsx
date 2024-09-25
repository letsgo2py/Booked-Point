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
              <button id={isbn} onClick = {handleClick3} className='remove-btn'>Remove</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CBook
