import React, { useState, useEffect } from 'react';
import ISBN from './ISBN.jsx'
import Nav from './Nav'

function AddISBNPage() {
    // const data = [
    //     {
    //         book_name: "Rich Dad Poor Dad",
    //         isbn: "9781612681139",
    //     },
    //     {
    //         book_name: "Harry Potter",
    //         isbn: "9780545010221",
    //     }, 
    //     {
    //         book_name: "Atomic Habits",
    //         isbn: "9780593189641",
    //     },
    //     {
    //         book_name: "To Kill a Mockingbird",
    //         isbn: "9780446310789",
    //     },
    //     {
        //     book_name: "The Great Gatsby",
        //     isbn: "9780743273565",
        // },
        // {
        //     book_name: "One Hundred Years of Solitude",
        //     isbn: "9780061120091",
        // },
        // {
        //     book_name: "War and Peace",
        //     isbn: "9781400079988",
        // },
    // ]

    const isbns = ["9781612681139", "9780545010221", "9780593189641", "9780446310789", "9780743273565", "9780061120091", "9781400079988"]
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Create an array of fetch promises
                const fetchPromises = isbns.map(isbn =>
                    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
                        .then(response => response.json())
                        .then(result => {
                            if (result.items) {
                                return result.items.map(item => ({
                                    isbn: isbn,
                                    bookName: item.volumeInfo.title || 'No Title',
                                    authorName: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author'
                                }));
                            } else {
                                return []; // No books found for this ISBN
                            }
                        })
                );

                // Wait for all promises to resolve
                const booksArrays = await Promise.all(fetchPromises);
                // Flatten the array of arrays and remove duplicates
                const allBooks = booksArrays.flat();
                const uniqueBooks = Array.from(new Map(allBooks.map(book => [book.isbn, book])).values());

                // Update state with unique books
                setData(uniqueBooks);
                
            } catch (error) {
                console.error('Error fetching books:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading books: {error.message}</div>;

  return (
    <div>
        <Nav />
        <div className='isbn-page'>
            {data.map(book => (
                <ISBN key={book.isbn} bName = {book.bookName} B_isbn = {book.isbn} Author = {book.authorName}/>
            ))}
        </div>
    </div>
  )
}

export default AddISBNPage