// import React, {useState} from 'react'
// import axios from 'axios';

// function Add() {
//     const [bookCover, setBookCover] = useState(null);

//     const handleButtonClick = async () => {
//         try {
//             const response = await axios.get('https://covers.openlibrary.org/b/isbn/0385472579-M.jpg', {
//               responseType: 'arraybuffer'  // Ensure response is treated as binary
//             });
      
//             const base64String = Buffer.from(response.data, 'binary').toString('base64');
//             const imageUrl = `data:image/jpeg;base64,${base64String}`;
            
//             setBookCover(imageUrl);
//             console.log(imageUrl)
//         } catch (error) {
//             console.error('Error fetching book cover:', error);
//         }
//     };

//   return (
//     <>
//       <button className='add-btn' onClick={handleButtonClick}>+</button>
//     </>
//   )
// }

// export default Add

import React, { useState } from 'react';
import axios from 'axios';

function Add() {
    const [bookCover, setBookCover] = useState(null);

    const handleButtonClick = async () => {
        try {
            const response = await axios.get('https://covers.openlibrary.org/b/isbn/0385472579-M.jpg', {
              responseType: 'arraybuffer'
            });
            
            const base64String = arrayBufferToBase64(response.data);
            const imageUrl = `data:image/jpeg;base64,${base64String}`;
            
            setBookCover(imageUrl);
            console.log(imageUrl);
        } catch (error) {
            console.error('Error fetching book cover:', error);
        }
    };

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    return (
        <>
            <button className='add-btn' onClick={handleButtonClick}>+</button>
            {bookCover && <img src={bookCover} alt="Book Cover" />}
        </>
    );
}

export default Add;
