import React , { useState } from 'react';
import { useNavigate } from "react-router-dom";

function SrchBook({ isbn, bookName, author }) {
  const [imgSrc, setImgSrc] = useState(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    const isbn = e.target.id;
    // Put into the database
    try {
      const response = await fetch(`http://localhost:3000/api/addBook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isbn, bookName, author})
      });

      if (!response.ok) {
        throw new Error('Failed to insert the book in the database /SrchBook');
      }

      const result = await response.json();
      console.log('Update result:', result.message);
    //   window.location.reload();
      navigate('/');
      
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleImageError = () => {
    setImgSrc('book.jpg');
  };

  return (
    <div className='card'>
      <div className='book-div'>
        {/* <div className='cover-img'>
          <img className="book-img" src={"https://covers.openlibrary.org/b/isbn/" + isbn + "-M.jpg"} alt={book_name}></img>
        </div> */}
        <div className='cover-img'>
          <img className="book-img" src={imgSrc} alt={bookName} onError={handleImageError}></img>
        </div>
        <div className='book-info'>
          <h3>{bookName}</h3>
          <p>{author}</p>
          <button className="start-reading-btn" id = {isbn} onClick={handleClick}>Start Reading</button>
        </div>
      </div>
    </div>
  )
}

export default SrchBook
