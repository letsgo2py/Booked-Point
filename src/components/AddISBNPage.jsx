import React, { useState, useEffect } from 'react';
import ISBN from './ISBN.jsx'
import Book from './Book-Sections/SrchBook.jsx'
import NavWithHome from './NavWithHome'
import './addBooks.css'
import { useNavigate } from 'react-router-dom';
import '../styles/addisbnpage.css'

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

    const navigate = useNavigate();
    const isbns = ["9781612681139", "9780545010221", "9780593189641", "9780446310789", "9780743273565", "9780061120091", "9781400079988"]
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [bookName, setBookName] = useState('');
    const [authorName, setAuthorName] = useState('');

    const [gotBooks, setGotBooks] = useState(false);    // tells if i got any book result after submitting the form
    const [bookInfo, setBookInfo] = useState([]);   // has the searched books data

    const [error1, setError1] = useState('');
    // const [searchedBooks, setSearchedBooks] = useState([]);
    
    // Just fetching the books info from the isbns numbers which i know, that is from the isbns array, using google books api
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBookInfo([]);
        setError1('');


        console.log("Clicked")

        if (!bookName.trim()) {
            setError1("Book Name is required");
            return;
        }

        try {
            let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookName.trim())}`;
            if (authorName.trim()) {
                url += `+inauthor:${encodeURIComponent(authorName.trim())}`;
            }
            url += '&maxResults=3';

            const response = await fetch(url);
        
            if (!response.ok) {
                throw new Error('Failed to fetch book information');
            }

            const result = await response.json();

            if (result.items) {
                const newBooks = result.items.map(item => {
                const book = item.volumeInfo;
                const isbn = book.industryIdentifiers
                    ? book.industryIdentifiers.find(id => id.type === 'ISBN_13' || id.type === 'ISBN_10')
                    : null;

                return {
                    title: book.title,
                    authors: book.authors ? book.authors.join(', ') : 'Unknown',
                    isbn: isbn ? isbn.identifier : 'Not available',
                }});

                setBookInfo(newBooks);
                setGotBooks(true);
                console.log(newBooks);       /// Printing new books
            } else {
                setError1('No books found for the provided search.');
            }
        } catch (error) {
            setError1('An error occurred while fetching book information.');
            console.error('Error:', error);
        }

        setBookName('');
        setAuthorName('');
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading books: {error.message}</div>;

  return (
    <div>
        <NavWithHome />

        <div className='book-adding-div'>
            <h1 className="playwrite-de-grund-book-title">Add your Book</h1>
            <form className="book-form" onSubmit={handleSubmit}>
                <div className='in-form'>
                    <label htmlFor="bname">Book Name</label><br></br>
                    <input type="text" id="bname" name="bname" value={bookName} onChange={(e) => setBookName(e.target.value)}></input><br></br>
                </div>
                <div className='in-form'>
                    <label htmlFor="athname">Author Name (Optional)</label><br></br>
                    <input type="text" id="athname" name="athname" value={authorName} onChange={(e) => setAuthorName(e.target.value)}></input><br></br>
                </div>
                <input type="submit" value="Submit"></input>
            </form>
        </div>

        <div className="get-books">
            {
                gotBooks && (
                    <>
                        <h3 className='search-text'>Searched Results :</h3>
                        <div className='searched-books'>
                            {bookInfo.map(book => (
                                <Book key={book.isbn} isbn={book.isbn} bookName={book.title} author={book.authors} />
                            ))}
                        </div>
                    </>
                )
                
            }
        </div>

        <div className='books-list'>
            {data.map(book => (
                <ISBN key={book.isbn} bName = {book.bookName} B_isbn = {book.isbn} Author = {book.authorName}/>
            ))}
        </div>
    </div>
  )
}

export default AddISBNPage