import React, { useState, useEffect } from 'react';
import Book from './Book-Sections/Book.jsx'
import FrBook from './Book-Sections/FrBook.jsx'
import CBook from './Book-Sections/CBook.jsx'

function Books() {
  const [booksData, setBooksData] = useState([]);

  // get the books from the mongodb database
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://book-backend-odmd.onrender.com/api/books');
        if (response.ok) {
          const data = await response.json();
          setBooksData(data); // Update state with the fetched books
        } else {
          console.error('Error fetching books');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBooks(); // Call the function to fetch books
  }, []); // Empty dependency array ensures it runs only once, on component mount

  return (
    <>
    <h1>Books to be Read in Future</h1>
    <div className='books-div'>
      {booksData.map((bk, index) => (
        bk.section === 1 && <Book key = {index} isbn = {bk.isbn} book_name = {bk.bookName} author = {bk.author}/>
      ))}
    </div>
    <h1>Fresh readings</h1>
    <div className='books-div'>
      {booksData.map((bk, index) => (
        bk.section === 2 && <FrBook key = {index} isbn = {bk.isbn} book_name = {bk.bookName} author = {bk.author} />
      ))}
    </div>
    <h1>Already Completed  [SORT]</h1>
    <div className='books-div'>
      {booksData.map((bk, index) => (
        bk.section === 3 && <CBook key = {index} isbn = {bk.isbn} book_name = {bk.bookName} author = {bk.author}/>
      ))}
    </div>
  </>
  )
}

export default Books
