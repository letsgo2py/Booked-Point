import React, { useState } from 'react';
import axios from 'axios';


function Note({isbn}) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    console.log("Content:", content)
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/submit', { 
        isbn: isbn,
        content: content, 
      });
      console.log(response.data);
      // Clear the form after submission
      // setContent('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h1>Taking Book Notes...</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Note:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Save Note</button>
      </form>
    </div>
  );
}

export default Note;
