import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CBook({isbn}) {
  const navigate = useNavigate();

  const handleClick = async () => {
    const isStored = await axios.post('http://localhost:3000/check', {isbn})
    console.log(isStored.data)
    navigate('/mynote', { state: { isbn } });
  }

  return (
    <div>
        <div className='book-div'>
          <div className='cover-img'>
            <img className="book-img" src={"https://covers.openlibrary.org/b/isbn/9780446677455-M.jpg"}></img>
          </div>
          <div className='book-info'>
            <h3>Book Name</h3>
            <p>Author: Abhay</p>
            <div className='btns'>
              <button className='notes-btn' onClick={handleClick}>My Notes</button>
              <button className='remove-btn'>Remove</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CBook