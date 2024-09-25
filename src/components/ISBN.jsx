import React from 'react'
import { useNavigate } from 'react-router-dom';

function ISBN(props) {
    const navigate = useNavigate();
    const bName = props.bName;
    const isbn = props.B_isbn;
    const auth = props.Author;

    const handleClick = async(e) => {
        const isbn_Num = e.target.id;
        // isbn_list.push(isbn_Num);

        // Send POST request to the server
        try {
            const response = await fetch('https://book-backend-odmd.onrender.com/api/addBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isbn: isbn_Num,
                    bookName: bName,
                    author: auth,
                }),
            });

            if (response.ok) {
                console.log('Book added successfully');
                navigate('https://bookish-worm-frontend.onrender.com'); // Redirect to home page
            } else {
                console.error('Failed to add the book');
            }
        } catch (error) {
            console.error('Error adding the book:', error);
        }
    }

  return (
    <div>
        <div className='isbn-data'>
            <div>
                <h1>{bName}</h1>
                <p>{isbn}</p>
            </div>
            <div>
                <button id = {isbn} className='isbn-btn' onClick={handleClick}>Add</button>
            </div>
        </div>
    </div>
  )
}

export default ISBN
