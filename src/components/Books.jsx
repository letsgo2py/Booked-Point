import React, { useState, useEffect } from 'react';
import Book from './Book-Sections/Book.jsx'
import FrBook from './Book-Sections/FrBook.jsx'
import CBook from './Book-Sections/CBook.jsx'

function Books() {
  const [booksData, setBooksData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);  // Tracks the visible card

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

  const movRightcards = () => {
    const carousel = document.querySelector(".carousel");
    const nextBtn = document.querySelector(".nextBtn");
    const prevBtn = document.querySelector(".prevBtn");

    const cardWidth = 300; // Width of one card (including margins)
    const totalcards = document.querySelectorAll(".card").length;

    if (currentIndex < totalcards - 1) {
      setCurrentIndex(currentIndex+1);
      carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    if(currentIndex >= 1){
      prevBtn.style.display = "flex";
    }

  }

  const movLeftcards = () => {
    const carousel = document.querySelector(".carousel");
    const cardWidth = 300; // Width of one card (including margins)

    if (currentIndex >= 0) {
      setCurrentIndex(currentIndex-1);
      if(currentIndex !== 1) carousel.style.transform = `translateX(-${(currentIndex-2) * cardWidth}px)`;
    }

    if(currentIndex < 3){
      setCurrentIndex(1);
    }

    console.log("current index: ", currentIndex)

  }

  return (
    <>
    <h1>Books to be Read in Future</h1>
    <div className="carousel-container">
      <div className='books-div'>
        {booksData.map((bk, index) => (
          bk.section === 1 && <Book key = {index} isbn = {bk.isbn} book_name = {bk.bookName} author = {bk.author}/>
        ))}
      </div>

      <div onClick={movRightcards} className='nxtBtn movBtn'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
        </svg>
      </div>

      <div onClick={movLeftcards} className='prevBtn movBtn'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
        </svg>
      </div>
    </div>
    
    <h1>Fresh readings</h1>
    <div className='books-div'>
      {booksData.map((bk, index) => (
        bk.section === 2 && <FrBook key = {index} isbn = {bk.isbn} book_name = {bk.bookName} author = {bk.author} />
      ))}
    </div>

    <h1>Already Completed</h1>
    <div className='books-div'>
      {booksData.map((bk, index) => (
        bk.section === 3 && <CBook key = {index} isbn = {bk.isbn} book_name = {bk.bookName} author = {bk.author}/>
      ))}
    </div>
  </>
  )
}

export default Books
